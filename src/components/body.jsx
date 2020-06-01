import React, { Component } from 'react';
import Header from "./Header"
import Main from "./main"
class Body extends Component {
    state = {  }
    render() { 
        return ( <div>
            <Header user={this.props.user}/>
            <Main user={this.props.user}/>
        </div> );
    }
}
 
export default Body;