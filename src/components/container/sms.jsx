import React, { Component } from "react";
import fire from "../../db/firedb";
import Scroll from "react-scroll";
import $ from "jquery";
var Link = Scroll.Link;
var DirectLink = Scroll.DirectLink;
var Element = Scroll.Element;
var Events = Scroll.Events;
var scroll = Scroll.animateScroll;
var scrollSpy = Scroll.scrollSpy;
class SMS extends Component {
  state = { name: "", sms: [], typed: "", isFirstTime: true };
  componentDidMount() {
    // Events.scrollEvent.register('begin', function () {
    //   console.log("begin", arguments);
    // });

    // Events.scrollEvent.register('end', function () {
    //   console.log("end", arguments);
    // });

    // scrollSpy.update();

    this.setState({ name: this.props.friendname });
    // this.setState({sms:[]})
    fire
      .database()
      .ref("sms")
      .child(this.props.smsdata.chatid)
      .on("value", (snap) => {
        snap.forEach((csnap) => {
          let key = csnap.key;
          if (this.state.sms.findIndex((x) => x.key === key) === -1) {
            let text = csnap.val().text;
            let style = "sms sms-my ";
            if (csnap.val().uid != this.props.user) {
              style = style + "sms-frnd";
            }
            // console.log("data is coming");
            this.setState({
              sms: [...this.state.sms, { text: text, key: key, style: style }],
            });
          } //end of condition
        });
      });

    $(".sms-body").scrollTop($(".sms-body")[0].scrollHeight);
  }

  componentDidUpdate() {
    if (!this.props.isFirst) {
      if (this.state.isFirstTime) {
        fire
          .database()
          .ref("sms")
          .child(this.props.smsdata.chatid)
          .on("value", (snap) => {
            snap.forEach((csnap) => {
              let key = csnap.key;
              if (this.state.sms.findIndex((x) => x.key === key) === -1) {
                let text = csnap.val().text;
                let style = "sms sms-my ";
                if (csnap.val().uid != this.props.user) {
                  style = style + "sms-frnd";
                }
                this.setState({
                  sms: [
                    { text: text, key: key, style: style },
                    ...this.state.sms,
                  ],
                });
              } //end of condition
            });
          });
      } else {
        this.setState({ isFirstTime: false });
      }
    } else {
      this.props.isFE();
    }
    $(".sms-body").scrollTop($(".sms-body")[0].scrollHeight);
  }

  sendSMS = () => {
    fire
      .database()
      .ref("sms")
      .child(this.props.smsdata.chatid)
      .push()
      .set({ text: this.state.typed, uid: this.props.user });
  };
  render() {
    return (
      <div className="content-box shadow-sm p-0" id="sms">
        <div className="title">
          Messages
          <a
            className="btn btn-outline float-right"
            onClick={this.props.disappear}
          >
            X
          </a>
        </div>
        <div className="body p-0">
          <div className="sms-box">
            <div className="sms-title d-flex">
              <img src="" alt="" className="img" />
              <h5>{this.props.friendname}</h5>
            </div>
            <hr />
            <div className="sms-body p-0">
              {this.state.sms.map((data, index) => (
                <div key={data.key} className={data.style}>
                  {data.text}
                </div>
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
