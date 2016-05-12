import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import * as Actions             from './BoardManagerActions';

import Card                     from 'material-ui/lib/card/card';
import CardActions              from 'material-ui/lib/card/card-actions';
import CardHeader               from 'material-ui/lib/card/card-header';
import CardMedia                from 'material-ui/lib/card/card-media';
import CardTitle                from 'material-ui/lib/card/card-title';
import IconButton               from 'material-ui/lib/icon-button';
import CardText                 from 'material-ui/lib/card/card-text';
import FontIcon                 from 'material-ui/lib/font-icon';
import ActionDelete             from 'material-ui/lib/svg-icons/action/delete';
import ActionAspectRatio        from 'material-ui/lib/svg-icons/action/aspect-ratio';

import defaultBG                from 'images/defaultBackgroundImage.jpg';

import {Link}                   from 'react-router';

export default class BoardPreview  extends Component  {

    constructor( props ) {
        super( props );
        this.state = {};
    }


    handleChangeDelete(){
        if(confirm('are you sure?')){
            Actions.deleteBoard(this.props.board.key);
        }
    }

    handleChangeGoTo(){
        Actions.showBoard(this.props.board.key);
    }

    render(){

        const board = this.props.board.val;

        let cardStyle = {
            marginLeft : '25%',
            width : '50%',
        }

        let cardHeader = {
            fontSize: '200%'
        }

        return(
            <Card style={cardStyle}>
                <CardHeader title={board.name}  titleStyle={cardHeader}/>
                <CardMedia overlay={<CardTitle title={board.name} subtitle={board.description} />}>
                    <img src={board.backgroundImage? board.backgroundImage : defaultBG}  />
                </CardMedia>
                <CardActions>
                    <IconButton onClick={this.handleChangeDelete.bind(this)}>
                        <ActionDelete />
                    </IconButton>
                    <Link to={`/boards/${this.props.board.key}`}>
                        <IconButton onClick={this.handleChangeGoTo.bind(this)}>
                            <ActionAspectRatio />
                        </IconButton>
                    </Link>
                </CardActions>
           </Card>
        )
    }
}
