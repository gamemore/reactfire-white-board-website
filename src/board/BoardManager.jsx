import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';

import * as actions             from './BoardManagerActions';
import BoardListView            from './BoardListView';
import AddBoard                 from './AddBoard';
import BoardManagerStore        from './BoardManagerStore';
import * as Actions             from './BoardManagerActions';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group';

import example                  from './BoardManager.scss';

export default class BoardManager extends Component  {

    constructor( props ) {
        super( props );
        this.state = {};
    }

    /**
     * Emit an event 'addBoard' to the boardManagerStore
     * @param  {[board]} board
     */
    handleBoardSubmit(board){
        Actions.addBoard(board);
    }

    /**
     * render the form to add a board and the list of boards
     * @return AddBoard and BoardViewer
     */
    render(){
        return(
            <div>
                <ReactCSSTransitionGroup transitionAppear={true} transitionAppearTimeout={500} transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    {this.props.addForm === true ? <AddBoard key={'hi'} onBoardSubmit={this.handleBoardSubmit.bind(this)}/> : null}
                </ReactCSSTransitionGroup>
                <BoardListView boards={this.props.boards} />
            </div>
        )

    }


}
