/**
 * Created by brillard.t on 15/07/2016.
 */

import { Elements } from 'reactfire-white-board';

const umlTypes = [ 'TextWidget', 'TodoListWidget' ];
const umlElements = Elements.filter( e =>  umlTypes.indexOf( e.type ) > -1 );

const projectTypes = [ 'TextWidget', 'TodoListWidget', 'JiraWidget', 'IdeaWidget' ];
const projectElements = Elements.filter(e => projectTypes.indexOf( e.type ) > -1);

const types = [
    {'free' : Elements },
    {'UML ' : umlElements},
    {'Project' : projectElements}
]

export default types;
