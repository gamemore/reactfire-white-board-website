import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';

import {FormattedMessage}       from 'react-intl';
import translations             from 'i18n/messages/messages';

import classNames               from 'classnames';
import { clientId }             from 'config/AppConfig';

import * as AuthActions         from 'core/AuthActions';
import HeaderApp                from 'core/HeaderApp';
import AuthStore                from 'core/AuthStore';

import Styles                   from './Login.scss';


export default class Login  extends Component  {

    constructor(props) {
        super(props);
    }

    onBtnClick() {
        AuthActions.logWithGoogle();
    }

    render(){
        return (
            <div>
                <div className = { Styles.centerize }>
                <h2 className={ Styles.title }> <FormattedMessage {...translations.MemberLogin}/> </h2>
                    <button className={ Styles.googleButton }
                        onClick={ this.onBtnClick.bind( this ) }>
                        <FormattedMessage {...translations.ButtonLogin}/>
                    </button>
                </div>
            </div>
        );
    }
}
