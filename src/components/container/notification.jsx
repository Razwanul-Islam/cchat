import React, { Component } from 'react';
import fire from '../../db/firedb';


class Notification extends Component {
    state = { 
        notifications:[]
     }

     componentDidMount(){
         fire.database().ref("notifications").child(this.props.user)
         .on("value",(snap)=>{
             snap.forEach(csnap=>{
                this.state.notifications.findIndex(x=> x.details==csnap.val().details)==-1 && (this.setState({
                    notifications:[csnap.val(),...this.state.notifications]
                })) 
                
             })//end of for each
         })//end of on method
     }
    render() { 
        return ( 
        <div className="content-box shadow-sm" id="notification">
          <div className="title">Notification</div>
          <div className="body">
              {this.state.notifications.map((data,index)=>(
                  <div className="noti-box" key={index}>
                  <span className="noti-title">
                      {data.title}
                  </span>
                    <br/>
                  <span className="detail">
                      {data.details}
                  </span>
                  <br/>
                  <span className="text-muted">
                      {data.time}
                  </span>
              </div>
              ))}
              
          </div>
        </div>
       );
    }
}
 
export default Notification;