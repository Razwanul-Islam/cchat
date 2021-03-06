import React, { Component } from 'react';
import fire from "../../db/firedb"
import SMS from "./sms"

class Chat extends Component {
    state = { available:[],
        smsdata:{name:"",chatid:'',time:""},
        smsAppear:false,isFirst:true
     }

     componentDidMount(){
        fire.database().ref("chat")
        .child(this.props.user).on("value",(snap)=>{
            snap.forEach(csnap=>{
                this.setState({available:[...this.state.available,csnap.val()]})
            })//end of for each
        })//end of on 
     }

     isFirstExchane=()=>{
         this.setState({isFirst:false})
     }
     //method for disappear the sms window
     smsDisappear=()=>{
         this.setState({smsAppear:false})
     }

     //appear sms window
     goToSms=(data)=>{
        this.setState({smsdata:data},this.setState({smsAppear:true}))
     }
    render() { 
        return ( 
        <div className="content-box shadow-sm" id="chat">
          <div className="title">Chat</div>
          <div className="body">

              {this.state.available.map((data,index)=> (<div href='#sms' key={index} className="chat-box" onClick={()=>{this.goToSms(data)}}>
                <a href='#sms'>  <img className="img" src={data.plink}/>
        <span className="friend-name">{data.name}</span>
        </a>
              </div>))}
              
          </div>
          {this.state.smsAppear &&  <SMS isFirst={this.state.isFirst} isFE={this.isFirstExchane} user={this.props.user.split(".").join("")} smsdata={this.state.smsdata} friendname={this.state.smsdata.name} disappear={this.smsDisappear}/>}
         
        </div>
       );
    }
}
 
export default Chat;