import React, { Component } from 'react';
import Profile from "./container/profile"
import Friends from "./container/friends"
import PostBox from "./container/post-box";
import Post from "./container/post"
import Notification from "./container/notification";
import Chat from "./container/chat"

class Main extends Component {
    state = { 
        p:[1,2,3,4,5,6,7,8,9]
     }
    render() { 
        return ( <div className="container-fluid bg-light">
            <div className="row">
                <div className="col-3 side-bar">
                    
                <Profile user={this.props.user.split(".").join("")} />
                {/* <br/> */}
                <Friends user={this.props.user.split(".").join("")}/>
                </div>
                
                <div className="col-6 side-bar">
                    <PostBox user={this.props.user}/>
                    <div className="side-bar">{this.state.p.map(data=><Post user={this.props.user.split(".").join("")}/>)}</div>
                    
                </div>

                <div className="col-3 side-bar">
                    <Notification user={this.props.user.split(".").join("")}/>
                    <Chat user={this.props.user.split(".").join("")} />
                   
                </div>
            </div>
            
        </div> );
    }
}
 
export default Main;