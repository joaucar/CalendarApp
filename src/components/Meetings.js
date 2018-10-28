import React from 'react';
import './Meetings.css';

export default class Meetings extends React.Component {

render(){
  let short = this.props.mem.length -2;
  let addMembers
  if(this.props.mem.length > 2){
    addMembers = this.props.mem.slice(0,2).map((num,i) => {
      return(
          <div className="mem" id={num} key={i}></div>
      );
    });
    addMembers.push(
      <div className="mem" id="mem-plus" key={10000}><p>+{short}</p></div>
    );
  }  else if(this.props.mem){
    addMembers = this.props.mem.map((num,i) => {
      return(
        <div className="mem" id={num} key={i*30}></div>
      )
    })
  }

  return(
  <div onClick={this.props.onClick}>
    <div className="meeting-block">
      <div className="details">
          <div className="title">
              <h3>{this.props.title}</h3>
          </div>
          <div className="time">
              <h5>{this.props.time}</h5>
          </div>
      </div>
      <div className="members">
        {addMembers}
      </div>
    </div>
  </div>
  );
}
}
