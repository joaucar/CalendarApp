import React from 'react';
import './Schedules.css';

export default class Schedules extends React.Component{
  render(){
    let times
    if (this.props.time){
      times = this.props.time.map((num,i) => {
        return(
          <h4 key={i}>{num}</h4>
        )
      })
    }
    return(
      <div onClick={this.props.onClick}>
        <div className="schedule-blocks">
          <div className="member">
            <div className="mems" id={this.props.member}>
            </div>
          </div>
          <div className="times">
            {times}
          </div>
        </div>
      </div>
    );
  }



}
