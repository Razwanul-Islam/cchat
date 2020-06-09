import React, { Component } from "react";
import fire from "../../db/firedb";


const fstore = fire.database().ref("profile")

class Profile extends Component {
  state = {
    photoFile:{},
    plink:"",
    name: "",
    dob: "",
    gender: "",
    city: "",
    country: "",
    institution: "",
    religion: "",
    ename: ["","d-none"],
    edob: ["","d-none"],
    egender: ["","d-none"],
    ecity: ["","d-none"],
    ecountry: ["","d-none"],
    einstitution: ["","d-none"],
    ereligion: ["","d-none"],
  };
  
  
   profile = fstore.child(this.props.user)
   profilePhoto = fire.storage().ref().child("images/profile/"+this.props.user+".png");

   getData=()=>{
     return ({
      uid:this.props.user,
      plink:this.state.plink,
      name:this.state.name,
      dob:this.state.dob,
      city:this.state.city ,
      country:this.state.country,
      gender:this.state.gender,
      institution:this.state.institution,
      religion:this.state.religion
     })
   }

  onEdit1 = (e) => {
    // fstore.collection("profile").do
    this.state.ename[1]==="d-none"?
    this.setState({
      ename: ["d-none",""],
    }) :this.setState({
      ename: ["","d-none"],
    },()=>{this.profile.set(
      {
        uid:this.props.user,
      plink:this.state.plink,
      name:this.state.name,
      dob:this.state.dob,
      city:this.state.city ,
      country:this.state.country,
      gender:this.state.gender,
      institution:this.state.institution,
      religion:this.state.religion}
     
    ).catch=(e)=>{console.log(e)}}) }

  onEdit2 = (e) => {
    // fstore.collection("profile").do
    this.state.edob[1]==="d-none"?
    this.setState({
      edob: ["d-none",""],
    }) :this.setState({edob:["","d-none"]}
    ,()=>{this.profile.set(
      {
        uid:this.props.user,
      plink:this.state.plink,
      name:this.state.name,
      dob:this.state.dob,
      city:this.state.city ,
      country:this.state.country,
      gender:this.state.gender,
      institution:this.state.institution,
      religion:this.state.religion}
     
    )});
  };
  onEdit3 = (e) => {
    // fstore.collection("profile").do
    this.state.ecity[1]==="d-none"?
    this.setState({
      ecity: ["d-none",""],
    }) :this.setState({
      ecity: ["","d-none"],
    },()=>{this.profile.set(
      {
        uid:this.props.user,
      plink:this.state.plink,
      name:this.state.name,
      dob:this.state.dob,
      city:this.state.city ,
      country:this.state.country,
      gender:this.state.gender,
      institution:this.state.institution,
      religion:this.state.religion}
     
    )});
  };
  onEdit4 = (e) => {
    // fstore.collection("profile").do
    this.state.ecountry[1]==="d-none"?
    this.setState({
      ecountry: ["d-none",""],
    }) :this.setState({
      ecountry:["","d-none"],
    },()=>{this.profile.set(
      {
        uid:this.props.user,
      plink:this.state.plink,
      name:this.state.name,
      dob:this.state.dob,
      city:this.state.city ,
      country:this.state.country,
      gender:this.state.gender,
      institution:this.state.institution,
      religion:this.state.religion}
     
    )});
  };
  onEdit5 = (e) => {
    // fstore.collection("profile").do
    this.state.egender[1]==="d-none"?
    this.setState({
      egender: ["d-none",""],
    }) :this.setState({
      egender:["","d-none"],
    },()=>{this.profile.set(
      {
        uid:this.props.user,
        plink:this.state.plink,
      name:this.state.name,
      dob:this.state.dob,
      city:this.state.city ,
      country:this.state.country,
      gender:this.state.gender,
      institution:this.state.institution,
      religion:this.state.religion}
     
    )});
  };
  onEdit6 = (e) => {
    // fstore.collection("profile").do
    this.state.einstitution[1]==="d-none"?
    this.setState({
      einstitution: ["d-none",""],
    }) :this.setState({
      einstitution:["","d-none"],
    },()=>{this.profile.set(
      {
      uid:this.props.user,
      plink:this.state.plink,
      name:this.state.name,
      dob:this.state.dob,
      city:this.state.city ,
      country:this.state.country,
      gender:this.state.gender,
      institution:this.state.institution,
      religion:this.state.religion}
     
    )});
  };
  onEdit7 = (e) => {
    // fstore.collection("profile").do
    this.state.ereligion[1]==="d-none"?
    this.setState({
      ereligion: ["d-none",""],
    }) :this.setState({
      ereligion:["","d-none"],
    },()=>{console.log(this.state.religion);this.profile.set(
      {
      uid:this.props.user,
      plink:this.state.plink,
      name:this.state.name,
      dob:this.state.dob,
      city:this.state.city ,
      country:this.state.country,
      gender:this.state.gender,
      institution:this.state.institution,
      religion:this.state.religion}
     
    )});
  };


  onFileChange=(e)=>{
    
    this.setState({photoFile:e.target.files[0]})
  }

  onUpload=()=>{
    console.log(this.state.photoFile)
    this.profilePhoto.put(this.state.photoFile)
    .on('state_changed',(snapshot)=>{}
    ,(err)=>{console.log(err);},
    ()=>{
      this.profilePhoto.getDownloadURL().then((url)=>{this.setState({plink:url})})
      console.log("successfully Uploaded ");
    })
  }
  ///on start

  componentDidMount(){
    this.profile.on("value",(data)=>{this.setState(data.val(),()=>{
      this.profilePhoto.getDownloadURL().then((url)=>{this.setState({plink:url.split("%2F").join("/")})})
    })},(err)=>{console.log(err)});
    
  }
  render() {
    return (
      <div className="content-box shadow-sm " id="profile">
        <div className="title">Profile</div>
        <div className="body">
          <div className="profile items-align-center">
            <img className="img m-3" src={this.state.plink}/>
            <div className="d-flex mb-4" style={{width:"90%"}}>
            <input type="file" name="" id="" className="form-control" placeholder="" style={{border:0}} onChange={this.onFileChange}/>
            <button className="btn btn-info btn-sm" onClick={this.onUpload}>Upload</button>
            </div>
            
            <table className="table table-hover text-left">
              <tr>
                <th>Name</th>
                <td className={this.state.ename[0]}>{this.state.name}</td>
                <td className={this.state.ename[1]}>
                  <input
                    type="text"
                    name="name"
                    className="form-control px-0 w-10"
                    value={this.state.name}
                    onChange={(e) =>
                      this.setState({ [e.target.name]: e.target.value })
                    }
                  />
                </td>
                <td>
                  <a
                    name="ename"
                    className="btn btn-outline"
                    onClick={this.onEdit1}
                  >
                    <img src="./write.png" />
                  </a>
                </td>
              </tr>

              <tr>
                <th>Date Of Birth</th>
                <td className={this.state.edob[0]}>{this.state.dob}</td>
                <td className={this.state.edob[1]}>
                  <input
                    type="text"
                    name="dob"
                    className="form-control px-0 w-10"
                    value={this.state.dob}
                    onChange={(e) =>
                      this.setState({ [e.target.name]: e.target.value })
                    }
                  />
                </td>
                <td>
                  <a
                    name="edob"
                    className="btn btn-outline"
                    onClick={this.onEdit2}
                  >
                    <img src="./write.png" />
                  </a>
                </td>
              </tr>

              <tr>
                <th>City</th>
                <td className={this.state.ecity[0]}>{this.state.city}</td>
                <td className={this.state.ecity[1]}>
                  <input
                    type="text"
                    name="city"
                    className="form-control px-0 w-10"
                    value={this.state.city}
                    onChange={(e) =>
                      this.setState({ [e.target.name]: e.target.value })
                    }
                  />
                </td>
                <td>
                  <a
                    name="ecity"
                    className="btn btn-outline"
                    onClick={this.onEdit3}
                  >
                    <img src="./write.png" />
                  </a>
                </td>
              </tr>

              <tr>
                <th>Country</th>
                <td className={this.state.ecountry[0]}>{this.state.country}</td>
                <td className={this.state.ecountry[1]}>
                  <input
                    type="text"
                    name="country"
                    className="form-control px-0 w-10"
                    value={this.state.country}
                    onChange={(e) =>
                      this.setState({ [e.target.name]: e.target.value })
                    }
                  />
                </td>
                <td>
                  <a
                    name="ecountry"
                    className="btn btn-outline"
                    onClick={this.onEdit4}
                  >
                    <img src="./write.png" />
                  </a>
                </td>
              </tr>
              <tr>
                <th>Gender</th>
                <td className={this.state.egender[0]}>{this.state.gender}</td>
                <td className={this.state.egender[1]}>
                  <input
                    type="text"
                    name="gender"
                    className="form-control px-0 w-10"
                    value={this.state.gender}
                    onChange={(e) =>
                      this.setState({ [e.target.name]: e.target.value })
                    }
                  />
                </td>
                <td>
                  <a
                    name="egender"
                    className="btn btn-outline"
                    onClick={this.onEdit5}
                  >
                    <img src="./write.png" />
                  </a>
                </td>
              </tr>

              <tr>
                <th>Institution</th>
                <td className={this.state.einstitution[0]}>{this.state.institution}</td>
                <td className={this.state.einstitution[1]}>
                  <input
                    type="text"
                    name="institution"
                    className="form-control px-0 w-10"
                    value={this.state.institution}
                    onChange={(e) =>
                      this.setState({ [e.target.name]: e.target.value })
                    }
                  />
                </td>
                <td>
                  <a
                    name="einstitution"
                    className="btn btn-outline"
                    onClick={this.onEdit6}
                  >
                    <img src="./write.png" />
                  </a>
                </td>
              </tr>

              <tr>
                <th>Religion</th>
                <td className={this.state.ereligion[0]}>{this.state.religion}</td>
                <td className={this.state.ereligion[1]}>
                  <input
                    type="text"
                    name="religion"
                    className="form-control px-0 w-10"
                    value={this.state.religion}
                    onChange={(e) =>
                      this.setState({ [e.target.name]: e.target.value })
                    }
                  />
                </td>
                <td>
                  <a
                    name="ereligion"
                    className="btn btn-outline"
                    onClick={this.onEdit7}
                  >
                    <img src="./write.png" />
                  </a>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
