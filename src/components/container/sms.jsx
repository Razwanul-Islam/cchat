import React, { Component } from "react";
import fire from "../../db/firedb";
class SMS extends Component {
  state = { name: "", sms: [], typed: "" };
  componentDidMount() {
    this.setState({ name: this.props.friendname });
    fire
      .database()
      .ref("sms")
      .child(this.props.smsdata.chatid)
      .on("value", (snap) => {
        snap.forEach((csnap) => {
          this.setState({ sms: [...this.state.sms, csnap.val()] });
        });
      });
  }

  sendSMS = () => {
    fire
      .database()
      .ref("sms")
      .child(this.props.smsdata.chatid)
      .push()
      .set({ text: this.state.typed });
  };
  render() {
    return (
      <div className="content-box fixed-bottom w-25 shadow-sm ">
        <div className="title">
          Messages
          <a
            className="btn btn-outline float-right"
            onClick={this.props.disappear}
          >
            X
          </a>
        </div>
        <div className="body">
          <div className="sms-box">
            <div className="sms-title d-flex">
              <img src="" alt="" className="img" />
              <h5>{this.props.friendname}</h5>
            </div>
            <hr />
            <div className="sms-body">
              {this.state.sms.map((data, index) => (
                <div className="sms sms-my">{data.text}</div>
              ))}
            </div>
              <hr />
              <div className="sms-footer d-flex">
                <textarea
                  name=""
                  col="1"
                  rows="2"
                  className="form-control"
                  onChange={(e) => this.setState({ typed: e.target.value })}
                ></textarea>
                <button className="btn btn-primary m-1" onClick={this.sendSMS}>
                  Send
                </button>
              </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default SMS;
