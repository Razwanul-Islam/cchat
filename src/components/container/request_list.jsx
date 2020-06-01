import React, { Component } from "react";
import fire from "../../db/firedb";

const requestRef = fire.database().ref("friends");
const date=new Date();
const m=date.getMonth();
const y=date.getFullYear();
const d=date.getDate();
class Requests extends Component {
  state = { friends: [] };
  requestChild = requestRef.child("requests/"+this.props.user);
  userprofile={}
  componentDidMount() {
    this.requestChild.on("value", (snap) => {

        if(snap.val()!=null){

            snap.forEach(
                (csnap)=>{
                    this.setState({friends:[...this.state.friends,[csnap.key,csnap.val()]]})
                }
            );
    //         let dat = snap.toJSON();

    //   this.setState({ friends: Object.values(dat) });
        }
      
    
    
    
    });
    fire.database().ref("profile").child(this.props.user).on("value",(snap)=>{let dat=snap.val();this.userprofile= dat})
    
}

  onAccept = (friend_data,index) => {
    fire
      .database()
      .ref("freiends")
      .child("friends_list/"+this.props.user)
      .push().set(friend_data[1]);
      
      
      
      fire
      .database()
      .ref("freiends")
      .child("friends_list/"+friend_data[1].uid)
      .push().set(this.userprofile);

      fire
      .database()
      .ref("notifications")
      .child(friend_data[1].uid)
      .push()
      .set({title:"Request Accepted !",details:this.userprofile.name+" Accepted your friend request.",time:d+"/"+m+"/"+y})

      //database for chat holder chat.jsx
      fire
      .database()
      .ref("chat")
      .child(friend_data[1].uid)
      .push().set(
          {name:this.userprofile.name,chatid:this.userprofile.uid+"+"+friend_data[1].uid,time:"",plink:this.userprofile.plink}
      )

      fire
      .database()
      .ref("chat")
      .child(this.userprofile.uid)
      .push().set(
          {name:friend_data[1].name,chatid:this.userprofile.uid+"+"+friend_data[1].uid,time:"",plink:friend_data[1].plink}
      )


      requestRef.child("requests/"+this.props.user+"/"+friend_data[0]).remove();

      this.setState(this.state.friends.splice(index,1))
      
  };


  render() {
    return (
      <div className="body">
        {this.state.friends.map((data,index) => (
          <div key={data[1].uid} className="chat-box">
            <img className="img" src={data[1].plink} />
            <div className="chat-title">
              <span>{data[1].name}</span> <br />
              <button
                className="btn btn-primary btn-sm mr-2"
                onClick={() => this.onAccept(data,index)}
              >
                Accept
              </button>
            </div>
          </div>
        ))}
        
      </div>
    );
  }
}

export default Requests;
