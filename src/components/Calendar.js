import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import './calendar.css';


export default class Calendar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dateContext: moment(),
      today: moment(),
      showMonthPopup:false,
      showYearPopup: false,
      todayDate: moment().get("date"),
      todayMonth: moment().get("month") + 1,
      todayYear: moment().get("year")
    }
  }



  weekdays = moment.weekdays(); //[Sunday,Monday...]
  weekdaysShort = moment.weekdaysShort(); //[Sun, Mon...]
  months = moment.months();

  year = () => {
    return this.state.dateContext.format("Y");
  }
  month = () => {
    return this.state.dateContext.format("MMMM");
  }
  daysInMonth = () =>{
    return this.state.dateContext.daysInMonth();
  }
  currentDate = () => {
    return this.state.dateContext.get("date");
  }
  currentDay = () => {
    return this.state.dateContext.format("D");
  }
  firstDayOfMonth = () => {
    let dateContext = this.state.dateContext;
    let firstDay = moment(dateContext).startOf('month').format('d');
    return firstDay;
  }

// Month Navigation
  setMonth = (month) => {
    let monthNow = this.months.indexOf(month);
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).set("month", monthNow);
    this.setState({
      dateContext: dateContext
    });
  }
  resetMonth = (month) => {
    let monthNow = this.months.indexOf(month);
    let dateContext = Object.assign({}, this.state.todayMonth);
    dateContext = moment(dateContext).set("month", monthNow);
  }
  nextMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).add(1,"month");
    this.setState({
      dateContext:dateContext
    });
    this.props.onNextMonth && this.props.onNextMonth();
  }
  prevMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).subtract(1,"month");
    this.setState({
      dateContext:dateContext
    });
    this.props.onPrevMonth && this.props.onPrevMonth();
  }
monthNav = () => {
    return (
      <span className="label-month">
        {this.month()}
      </span>
    );
  }

//Year change
showYearEditor = () => {
  this.setState({
    showYearNav: true
  });
}

setYear = (year) => {
  let dateContext = Object.assign({}, this.state.dateContext);
  dateContext = moment(dateContext).set("year", year);
  this.setState({
    dateContext: dateContext
  })
}
resetYear = (year) => {
  let dateContext = Object.assign({}, this.state.todayYear);
  dateContext = moment(dateContext).set("year", year);
  this.setState({
    dateContext: dateContext
  })
}
onYearChange = (e) => {
  this.setYear(e.target.value);
  this.props.onYearChange && this.props.onYearChange(e, e.target.value);
}
onKeyUpYear = (e) => {
  if (e.which === 13 || e.which === 27) {
    this.setYear(e.target.value);
    this.setState({
      showYearNav: false
    })
  }
}
yearNav = () => {
  return(
    this.state.showYearNav ?
    <input
        defaultValue= {this.year()}
        className="editor-year"
        ref={(yearInput) => {this.yearInput = yearInput}}
        onKeyUp={(e)=> this.onKeyUpYear(e)}
        onChange = {(e) => this.onYearChange(e)}
        type="number"
        placeholder ="year" />
        :
    <span className="label-year"
     onDoubleClick={(e)=> {this.showYearEditor()}}>
      {this.year()}
      {this.state.showYearPopup &&
      <this.selectList data={this.year} />}
    </span>
  );
}

// Click functions
onDayClick = (e, day) => {
  this.props.onDayClick && this.props.onDayClick(e, day);
}
jumpToday = (e) => {
  this.resetYear(this.state.todayYear)
  this.resetMonth(this.state.todayMonth)
}

  render(){
    let weekdays = this.weekdaysShort.map((day)=>{
      return (
        <td key={day} className="week-day">{day}</td>
      )
    });

    // Blank spaces at the begining of the months
    let blanks = [];
    for (let i = 0; i< this.firstDayOfMonth(); i++){
      blanks.push (<td key={i*50} className="emptySlot">
        {""}
        </td>
      );
    }
    console.log("blanks: ", blanks)

    let daysInMonth =[];
    let dayClass
      for (let d = 1; d <= this.daysInMonth(); d++) {
        if ((this.state.todayYear == this.year())&&(this.state.todayMonth == this.state.dateContext.format("M")) && (d == this.currentDay())){
          dayClass = "current-day"
        } else{
          dayClass = "day"//(d == this.currentDay() ? "current-day": "day");
        }
        daysInMonth.push(
          <td key={d} className={dayClass} onClick={(e) => {this.onDayClick(e)}} >
            <span>{d}</span>
          </td>
        );
      }

    console.log("days: ", daysInMonth)
    console.log("year: ", this.state.todayYear)
    console.log("month: ", this.month())

    var totalSlots = [...blanks,...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row,i) =>{
      if ((i % 7) !== 0) {
        cells.push(row);
      } else {
        let insertRow = cells.slice();
        rows.push(insertRow);
        cells = [];
        cells.push(row);
      }
      if (i == totalSlots.length - 1) {
        let insertRow = cells.slice();
        rows.push(insertRow);
      }
    });


    let trElements = rows.map((d,i)=> {
      return(
        <tr key={i*100}>
          {d}
        </tr>
      );
    });

    return (
      <div className="calendar-container" >
        <table>
          <thead>
              <tr className="calendar-header">
                <td colSpan="2" className="today">
                  <button onClick={(e)=>{this.jumpToday()}} className="todayBtn">Today</button>
                </td>
                <td colSpan="2" className="nav-month">
                  <FontAwesomeIcon icon={faChevronLeft}
                    onClick={(e)=> {this.prevMonth()}} />
                  <FontAwesomeIcon icon={faChevronRight}
                    onClick={(e)=> {this.nextMonth()}} />
                </td>
                <td colSpan="3" className="display-month">
                  <this.monthNav />
                  {" "}
                  <this.yearNav />
                </td>
            </tr>
          </thead>
          <tbody className="calendar">
            <tr>
              {weekdays}
            </tr>
            {trElements}
          </tbody>
        </table>

      </div>
    );
  }
}
