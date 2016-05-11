import { Store }        from 'airflux';
import Firebase         from 'firebase';
import $                from 'jquery';
import { firebaseUrl, clientId }  from '../config/AppConfig';

import * as ErrorActions from '../error/ErrorActions';
import * as AuthActions  from 'core/AuthActions';

import GoogleLogin      from 'react-google-login';
import { browserHistory } from 'react-router';

class AuthStore extends Store {

    constructor() {
        super();
        this.state = {
            currentUser : {}
        };
        this.baseRef = new Firebase( firebaseUrl );
        this.baseRef.onAuth( authData => this.onAuth( authData ) );
        AuthActions.logWithGoogle.listen( this._logWithGoogle.bind( this ) );
        AuthActions.logout.listen( this._logout.bind( this ) );
}
    get currentUser() { return this.state.currentUser || {}; }

    destroy() {
        if ( this.baseRef ) {
            this.baseRef.off();
        }
    }

    onAuth( authData ) {
        if ( authData ) {
            this.onAuthSuccess( authData );
        } else {
            this.onAuthFailure();
        }
    }

    /**
     * manage oauth
     * redirect to the main page after loggin
     * @param  authData callback sent by the provider (here google)
     */
    onAuthSuccess( authData ) {
        this.state.currentUser = {
            uid             : authData.uid,
            displayName     : authData.auth.name || 'Guest',
            profileImageURL : authData.auth.profileImageURL || 'img/default_profile.png', // TODO : A DEFAULT picture image
            locale          : authData.auth.locale ? authData.auth.locale : 'en',
            hd              : authData.auth.hd
        };

        this.publishState();
        browserHistory.push('/');

    }

    loadGoogleScript( cb ){
        (function(d, s, id, cb) {
            const element = d.getElementsByTagName(s)[0];
            const fjs = element;
            let js = element;
            js = d.createElement(s);
            js.id = id;
            js.src = '//apis.google.com/js/platform.js';
            fjs.parentNode.insertBefore(js, fjs);
            js.onload = cb;
            }(document, 'script', 'google-login', () => {
                const params = {
                    client_id: clientId,
                    cookiepolicy: 'single_host_origin',
                    scope: 'profile email'
                };
                window.gapi.load('auth2', () => {
                    window.gapi.auth2.init(params);
                    this.auth2 = window.gapi.auth2;
                    cb();
                });
            })
        );
    }

    _logWithGoogle(){
        console.log('this.auth2', this.auth2);
        if( !this.auth2 ){
            this.loadGoogleScript(this._logWithGoogle.bind( this ));
        } else {
             this.auth2.getAuthInstance().signIn()
            .then((response) => {
             this.callbackGoogle(response);
            });
        }
    }

    /*
        Send a request to the authentication proxy
        get a custom JWT to authenticate in Firebase
        TODO proxy in config
     */
    callbackGoogle( authData ){
        var self = this;
        $.ajax('https://test-proxy-whiteboard.herokuapp.com', {
            method: 'GET',
            data: {
            id_token: authData.getAuthResponse().id_token
        },
        success: function(data) {
            if(data.valid){
                self.baseRef.authWithCustomToken(data.token, function(error, authData) {
                    if (error) {
                        //TODO error
                        console.log("Login Failed!", error);
                    } else {
                        console.log("Login Succeeded!", authData);
                        self.onAuthSuccess(authData);
                    }
                });
            } else {
                //TODO error
                //Proxy actually check for hd aswell
                console.log('Not a member of sfeir')
            }
        },
        });
    }

    onAuthFailure() {
        // FIXME
        // TODO : propose other ways to authenticate : twitter, github and facebook (maybe anonymous too)
        //Nothing to do here anymore the router will redirect to /login
    }

    isCurrentUser( user ) {
        const { currentUser } = this.state;
        if ( !user || !currentUser ) {
            return false;
        }
        return currentUser.uid === user.uid;
    }

    _logout() {
        if( !this.auth2 ){
            this.loadGoogleScript(this._logout.bind( this ));
        } else {
            var self = this;
            //SetTimeout because we also need to wait for the token Manager to be loaded
            setTimeout( () => {
                self.auth2.getAuthInstance().signOut().then(function () {
                    browserHistory.push('/login');
                    self.baseRef.unauth();
                    self.state.currentUser = {};
                    self.publishState();
                });
            }, 500);
        }
    }
}

export default new AuthStore();
