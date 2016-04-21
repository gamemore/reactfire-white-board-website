import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import BoardSearchBar           from 'board/BoardSearchBar';

import Toolbar                  from 'material-ui/lib/toolbar/toolbar';
import ToolbarTitle             from 'material-ui/lib/toolbar/toolbar-title';
import ToolbarGroup             from 'material-ui/lib/toolbar/toolbar-group';
import MenuItem                 from 'material-ui/lib/menus/menu-item';
import DropDownMenu             from 'material-ui/lib/DropDownMenu';
import RaisedButton             from 'material-ui/lib/raised-button';
import IconMenu                 from 'material-ui/lib/menus/icon-menu';
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import IconButton               from 'material-ui/lib/icon-button';
import ToolbarSeparator         from 'material-ui/lib/toolbar/toolbar-separator';
import ContentAdd               from 'material-ui/lib/svg-icons/content/add';

import {FormattedMessage}       from 'react-intl';
import translations             from 'i18n/messages/messages';

import {Link}                   from 'react-router';

import * as Actions            from 'board/BoardManagerActions';

export default class HeaderApp  extends Component  {

    constructor( props ) {
        super( props );
        this.state = {};
    }

    onClickAdd(){
        Actions.showAddForm();
    }

    handleChange(event, value){
        this.props.onLanguageChange(value);
    }

    render(){
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true} float="left">
                    <FormattedMessage {...translations.HeaderAppTitle}>
                    {titleApp => (
                        <ToolbarTitle text={titleApp} />
                    )}
                    </FormattedMessage>
                </ToolbarGroup>
                <ToolbarGroup float="right">
                    <FormattedMessage {...translations.HeaderAppLabelButton}>
                        {labelButton => (
                            <RaisedButton label={labelButton} labelPosition= "before" primary={true} icon={<ContentAdd/>} onClick={this.onClickAdd}/>
                        )}
                    </FormattedMessage>
                    <ToolbarSeparator style={{
                    float           : 'none',
                    marginRight     : '18px',
                    marginLeft      : '18px'
                }}/>
                    <BoardSearchBar/>
                    <IconMenu onChange={this.handleChange.bind(this)} iconButtonElement={
                        <IconButton touch={true}>
                            <NavigationExpandMoreIcon />
                        </IconButton>}>
                        <MenuItem value= 'en' primaryText= {<FormattedMessage {...translations.MenuItemEnglish}/>} />
                        <MenuItem value= 'fr' primaryText= {<FormattedMessage {...translations.MenuItemFrench}/>} />
                    </IconMenu>
                    <Link to={'/about'}>about</Link>
            </ToolbarGroup>
            </Toolbar>
        )
    }

}
