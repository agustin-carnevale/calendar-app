import React, {Component} from 'react';
import styled from 'styled-components'
import moment from 'moment'


const Container = styled.div`
  display: flex;
  border-radius: 7px;
  box-shadow: 2px 2px 15px 0 rgba(0, 0, 0, 0.11);
  flex-flow: column nowrap;
  min-width: 1100px;
  min-height: 70vh;
`

const Header = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  color: white;
  font-size: 18px;
  min-height: 20px;
  width: 100%;
  background-color: #4682B4;

  & > p {
    margin: 0;
    flex: 1 0 140px;
  }
`


const Content = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    flex-direction: column;
`

const Box = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 160px;
    height:160px;
    border: 0.75px solid gray;
    position:relative;
`

const DayNumber = styled.div`
    position:absolute;
    left: 8px;
    top: 8px;
    font-weight: bold;
`
const Row = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: row;
    width: 100%;
`

const Reminders = styled.div`
    margin-top: 25px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 90%;
`

const Reminder = styled.p`
    margin: 5px;
`

class Presentation extends Component {

    state={
        dateObject: moment(),
    }

    firstDayOfMonth = () => {
        let dateObject = this.state.dateObject;
        let firstDay = moment(dateObject)
                     .startOf("month")
                     .format("d")
       return firstDay;
    }

    lastDayOfMonth = () =>{
        let dateObject = this.state.dateObject
        let lastDay = moment(dateObject)
                     .daysInMonth("month")
       return lastDay;
    }

    renderLastMonthDays=()=>{
        let blanks = []
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
          blanks.push(
            <Box className="calendar-day empty" key={`empty-${i}`} />
          )
        }
        return blanks
    }

    renderFirstWeek=()=>{
        let firstWeek = []
        for (let d = 1; d <= 7-this.firstDayOfMonth(); d++) {
            firstWeek.push(
                (<Box key={d} className="calendar-day">
                    <DayNumber>{d}</DayNumber>
                    <Reminders>{this.getReminders(d)}</Reminders>
                </Box>) 
            )
        }
        return firstWeek
    }

    renderWeek=(week,firstDay)=>{
        let boxes = []
        let count = (week-1)*7 + (7-firstDay)
        for (let d = 1; d <= 7; d++) {
            boxes.push(
                (d+count) <= this.lastDayOfMonth() ? (<Box key={d+count} className="calendar-day">
                    <DayNumber>{d+count}</DayNumber>
                    <Reminders>{this.getReminders(d+count)}</Reminders>
                </Box>):
                 <Box className="calendar-day empty" key={`empty-${d+count}`}>{""}</Box>
            )
        }
        return boxes
    }

    getReminders = (d)=>{
        return [
            <Reminder>Reminder1</Reminder>,
            <Reminder>Reminder2</Reminder>,
            <Reminder>Reminder3</Reminder>,
        ]
    }


    render(){

        return <div>
        <Container>
            <Header>
                <p>Sunday</p>
                <p>Monday</p>
                <p>Tuesday</p>
                <p>Wednesday</p>
                <p>Thursday</p>
                <p>Friday</p>
                <p>Saturday</p>
            </Header>
            <Content>
                <Row>
                    {this.renderLastMonthDays()}
                    {this.renderFirstWeek()}
                </Row>
                <Row>
                    {this.renderWeek(2,this.firstDayOfMonth())}
                </Row>
                <Row>
                    {this.renderWeek(3,this.firstDayOfMonth())}
                </Row>
                <Row>
                    {this.renderWeek(4,this.firstDayOfMonth())}
                </Row>
                <Row>
                    {this.renderWeek(5,this.firstDayOfMonth())}
                </Row>

            </Content>
        </Container>
        </div>
    }


}

export default Presentation