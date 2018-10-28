import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Calendar from './components/Calendar.js';
import Meetings from './components/Meetings.js';
import Schedules from './components/Schedules.js';
import Modal2 from 'react-modal';
import './App.css';

class App extends Component {
  constructor(){
  super();

  this.state ={
    barM: true,
    barW: false,
    barD: false,
    members1: ["mem1", "mem2"],
    members2: ["mem3","mem1","mem-plus"],
    times1: ["8:00 AM - 11:00 AM", "1:00 PM - 5:00 PM"],
    times2: ["1:00 PM - 5:00 PM"],
    times3: ["3:00 PM - 5:00 PM"],
    key: 2,
    newTime: "",
    newTitle: "",
    newMember: "",
    modalIsOpen: false
  }
}

/* Clickable block functions */
  onDayClick = (e, day) => {
    prompt("Add event on this day?");
  }
  onAddClick = (e) => {
    this.setState({
      modalIsOpen:true
    });
    e.preventDefault();
  }
  onMemberClick = () => {
    alert('Filter by member?');
  }

  /* Nav bar underline */
  onMClick = (e) => {
    this.setState({
      barM: true,
      barW: false,
      barD: false
    })
  }
  onWClick = (e) => {
    this.setState({
      barM: false,
      barW: true,
      barD: false
    })
  }
  onDClick = (e) => {
    this.setState({
      barM: false,
      barW: false,
      barD: true
    })
  }

/* Modal functions */
  openModal = () =>{
    this.setState({modalIsOpen: true});
  }
  afterOpenModal = () =>{
    this.subtitle.style.color = 'blue';
  }
  closeModal = () => {
    this.setState({modalIsOpen: false});
  }


  render() {
    let barM = this.state.barM ? "blue" : "not-blue";
    let barW = this.state.barW ? "blue" : "not-blue";
    let barD = this.state.barD ? "blue" : "not-blue";

    return (
      <div className="App">
        <header className="App-header">
          <div className="nav">
            <div className="Month" onClick={(e)=> this.onMClick(e)}>
              <h4>Month</h4>
              <div className={barM}></div>
            </div>
            <div className="Week" onClick={(e)=> this.onWClick(e)}>
              <h4>Week</h4>
              <div className={barW}></div>
            </div>
            <div className="Day" onClick={(e)=> this.onDClick(e)}>
              <h4>Day</h4>
              <div className={barD}></div>
            </div>
          </div>
          <div clasName="Calendar">
            <Calendar onDayClick={(e, day)=> this.onDayClick(e, day)}/>
          </div>
          <div className="buttons">
            <div className="add-button" onClick={(e)=>this.onAddClick(e)}>
              <FontAwesomeIcon icon={faPlus} />
              </div>
            <div className="member-button" onClick={()=>this.onMemberClick()}>
              <FontAwesomeIcon icon={faBars} />
              <p id="text"> All Members </p>
            </div>
          </div>
          <div className="Meetings">
            <h1>Meetings</h1>
            <Meetings key={1}
              title="Marketing Department"
              time="9:00 AM - 9:30 AM"
              mem={this.state.members1}
              onClick={this.openModal} />
            <Meetings key={2}
              title="C-Safe Meeting"
              time="9:15 AM -10:00 AM"
              mem={this.state.members2}
              onClick={this.openModal} />
          </div>
          <div className="Schedule">
            <h1>Work Schedules</h1>
            <Schedules member="mem1" time={this.state.times1} onClick={this.openModal} />
            <Schedules member="mem2" time={this.state.times2} onClick={this.openModal} />
            <Schedules member="mem3" time={this.state.times3} onClick={this.openModal} />
          </div>

          <div>
            <button onClick={this.openModal} className="hide">Open Modal</button>
            <Modal2
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              className="modal-block">
              <div className="header">
                <h2 ref={subtitle => this.subtitle = subtitle}>Add Event</h2>
                <button id="close" onClick={this.closeModal}>Close</button>
              </div>
              <form className="form">
                <input placeholder="Title"/>
                <input placeholder="Time"/>
                <input placeholder="Members"/>
                <button id="submit">Submit</button>
              </form>
            </Modal2>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
