import React,
       { Component, PropTypes } from 'react';
import FlatButton               from 'material-ui/FlatButton';
import TextField                from 'material-ui/TextField';
import FloatingActionButton     from 'material-ui/FloatingActionButton';
import ContentAdd               from 'material-ui/svg-icons/content/add';
import Dialog                   from 'material-ui/Dialog';
import Form, {
    FormField, Input,
    Textarea
}                               from 'react-forms-validation';

import MessageError             from 'core/MessageError';
import Board                    from './Board';
import translations             from '../i18n/messages/messages';
import * as Actions             from 'board/BoardManagerActions';



/**
 * Form to add a new board
 */
export default class AddBoard extends Component  {

    static contextTypes = {
        intl : PropTypes.object
    };

    constructor( props ) {
        super( props );
        this.state = {
            board : new Board(),
            validity : null,
            showAddForm : false
        };
    }

    openDialog = () => {
        window.addEventListener( 'keypress', this.handleEnterPress );
        this.setState( { showAddForm : !this.state.showAddForm } );
    };

    /**
     * called when submiting a new board
     * validations check only if the length of inputs are > 3
     * refresh the form and send the data to BoardManager.jsx
     * @param  {Event} e
     */
    handleSubmit = (e) => {
        console.log(e)
        //e? e.preventDefault() : null;
        e.preventDefault();
        Actions.addBoard( this.state.board );

        this.setState({
            board : new Board(),
            showAddForm : false
        });
    };

    handleClose = () => {
        this.setState({showAddForm: false});
    };

    handleChange = ( board, validity ) => {
        this.setState( { board, validity } )
    };

    shouldShowError( fieldValidity ) {
        return fieldValidity.invalid && this.state.validity && this.state.validity.dirty;
    }

    renderName = ( prop, value, onChange, fieldValidity ) => {
        console.log('renderName',  this.context.intl.locale)
        return (
            <TextField autoFocus={true} name={ this.context.intl.formatMessage( translations.boardForm.name.label ) }
                       placeholder={this.context.intl.formatMessage( translations.formNameInputPlaceholder )}
                       value={value || ''}
                       fullWidth={true}
                       errorText={ this.shouldShowError( fieldValidity ) ? <MessageError prop={ prop } validity={ fieldValidity } /> : null }
                       onChange={ e => onChange( e.target.value ) }/>
        );
    };

    renderDescription = ( prop, value, onChange, fieldValidity ) => {
        return (
            <TextField name={ this.context.intl.formatMessage( translations.boardForm.description.label ) }
                       placeholder={this.context.intl.formatMessage( translations.formDescriptionInputPlaceholder)}
                       value={value || ''}
                       errorText={ this.shouldShowError( fieldValidity ) ? <MessageError prop={ prop } validity={ fieldValidity } /> : null }
                       fullWidth={true}
                       multiLine={true}
                       onChange={e => onChange( e.target.value )}/>
        );
    };

    renderForm(){
        console.log('renderForm',  this.context.intl.locale)
        const valid = this.state.validity && this.state.validity.valid;

        const actions = [
            <FlatButton label={this.context.intl.formatMessage( translations.Cancel )} primary={true} onTouchTap={this.handleClose}/>,
            <FlatButton disabled={!valid} label={this.context.intl.formatMessage( translations.Create )} primary={true} keyboardFocused={true} onTouchTap={this.handleSubmit}/>
        ];

        //TODO show input in red if validation not Ok
        return(
            <Dialog title={this.context.intl.formatMessage( translations.AddNewBoard )}
                actions={actions}
                modal={false}
                open={this.state.showAddForm}
                onRequestClose={this.handleClose}
                contentStyle={{maxWidth : '500px'}}>

                <Form value={ this.state.board } onChange={ this.handleChange } onSubmit={this.handleSubmit}>
                    <FormField prop="name" render={ this.renderName }/>
                    <br/>
                    <FormField prop="description" render={ this.renderDescription }/>
                </Form>
            </Dialog>
        );
    }

    render(){

        const positionBottomRight = {
            position    : 'fixed',
            bottom      : '100px',
            right       : '100px',
            zIndex      : 200
        };

        return(
            <div>
                <FloatingActionButton backgroundColor='orange' style={ positionBottomRight } onClick={ this.openDialog }>
                    <ContentAdd />
                </FloatingActionButton>
                { this.renderForm() }
            </div>
        );
    }

}
