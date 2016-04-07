import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import ReactDOM                 from 'react-dom';
import BoardSearchBar           from 'core/BoardSearchBar';
import BoardListView            from 'core/BoardListView';

export default class BoardViewer extends Component  {

    constructor( props ) {
        super( props );
        this.state = {
            filterText: ''
        };
    }

    handleUserInput(filterText){
        this.setState({
            filterText:filterText
        });
    }

    render(){

        return(
            <div>
                <BoardSearchBar
                    filterText={this.state.filterText}
                    onUserInput={this.handleUserInput.bind(this)}
                />
                <BoardListView
                    boards={this.props.boards}
                    filterText={this.state.filterText}
                />
            </div>
    );

    }


}
