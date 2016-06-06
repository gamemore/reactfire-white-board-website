import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import {FormattedMessage}       from 'react-intl';
import translations             from '../i18n/messages/messages'
import NotificationSystem       from 'react-notification-system';
import * as NotifsActions       from './NotifsActions'

/**
 * Wrapper of NotificationSystem to magage translations
 */
export default class Notification extends Component  {

    static contextTypes = {
        intl : PropTypes.object
    };

    constructor( props ) {
        super( props );
        this.state = {
            _notificationSystem     : null
        };

        NotifsActions.pushNotif.listen ( this._pushNotif.bind( this ) );
    }

    /**
     * expect a notif with at least
     * titleKey and messageKey to translate messages
     * There might be untranslated notifs so we check if the key is There
     * if not we use the props message and title instead of the key
     */
    _pushNotif( notif ){
        let newNotif = notif;
        notif.titleKey   ? newNotif.title   = this.context.intl.formatMessage( translations[notif.titleKey] ) : null;
        notif.messageKey ? newNotif.message = this.context.intl.formatMessage( translations[notif.messageKey] ) + notif.message : null;


        this._notificationSystem.addNotification( newNotif );
    }

    componentDidMount(){
        this._notificationSystem = this.refs.notificationSystem;
    }

    render(){

        const styleNotif = {
          NotificationItem: { // Override the notification item
            DefaultStyle: { // Applied to every notification, regardless of the notification level
              fontFamily : 'Roboto'
            }
          }
        }
        return(
            <NotificationSystem ref="notificationSystem" style = { styleNotif }/>
        )
    }

}
