import React, { Component }     from 'react';
import { FluxComponent }        from 'airflux';

import BoardManager             from 'core/BoardManager';
import AuthStore                from 'core/AuthStore';
import BoardManagerStore        from 'core/BoardManagerStore';
import HeaderApp                from 'core/HeaderApp';
import AppLoader                from 'core/AppLoader';
import AccessDenied             from 'core/AccessDenied';


@FluxComponent
export default class App extends Component {

    constructor( props ) {
        super( props );
        this.state = {};

        this.connectStore( AuthStore,               'authStore' );
        this.connectStore( BoardManagerStore,       'boardManagerStore' );
    }


    render() {

        const { currentUser } = this.state.authStore;
        const { boards } = this.state.boardManagerStore;

        //Render AppLoader screen until data are loaded or user is not logged in
        if ( !currentUser ) {
            return (<AppLoader/>);
        }

        if(currentUser.denied){
            return (<AccessDenied/>);
        }

        return (
            <div>
                <HeaderApp />
                <BoardManager boards = {boards} />
            </div>
        );
    }
}
