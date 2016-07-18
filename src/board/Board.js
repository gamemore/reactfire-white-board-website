import { Required, MinLength }      from 'react-forms-validation';
import BoardTypes                   from '../config/boardType';

   export default class Board {

    @Required @MinLength( 3 )
    name : string;

    @Required @MinLength( 3 )
    description : string;

    @Required
    type : string = BoardTypes[0].type;

}
