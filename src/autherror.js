import React, {Component} from 'react';
import {Spinner} from 'reactstrap';

class Error extends Component{
render(){
    return(
        <div><Spinner color="primary" /></div>
        
    )
}
}

export default Error;