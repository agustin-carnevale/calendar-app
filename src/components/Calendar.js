import React, {Component} from 'react';
import styled from 'styled-components'
import moment from 'moment'
import { connect } from 'react-redux'
import * as actions from '../redux/actions/actionCreators';
import AddReminderModal from './AddReminderModal'
import Reminder from './Reminder'

const DAYS_OF_THE_WEEK = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

const Page = styled.div`
    position: relative;
`

const Container = styled.div`
    display: flex;
    border-radius: 7px;
    box-shadow: 2px 2px 15px 0 rgba(0, 0, 0, 0.11);
    flex-flow: column nowrap;
    width: 100vw;
    min-height: 70vh;
    @media (max-width: 620px) {
        width: 80vw;
    }
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
        width: 15%;
    }

    @media (max-width: 620px) {
        display:none;
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
    width: 15%;
    height: 400px;
    border: 0.75px solid gray;
    position:relative;

    &.calendar-day-empty{
        background-color: #CDACD2;
        @media (max-width: 620px) {
            display:none;
        }
    }

    @media (max-width: 620px) {
        width: 100%;
    }
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

    @media (max-width: 620px) {
        flex-direction: column;
    }
`

const Reminders = styled.div`
    margin-top: 25px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
`

const DeleteAllButton = styled.div`
    margin-left: 30px;
`
const AddReminderButton = styled.div`
    margin-left: 30px;
    margin-right: 15px;
`

const Nav = styled.nav`
    margin-bottom: 5px;
`

const byTime = (a,b)=>{
    let aDate= new Date(a.date)
    let bDate= new Date(b.date)
    if(aDate.getTime()>bDate.getTime()){ 
        return 1
    }
    return -1
}

const ActionsBar = (props)=>{
    return(<Nav>
        <div className="nav-wrapper">
            <ul id="nav-mobile" className="right">
                <li>
                    <DeleteAllButton>
                        <button className="btn waves-effect waves-light"
                            onClick={props.onDeleteAll}>CLEAR ALL</button>
                    </DeleteAllButton>
                </li>
                <li>
                    <AddReminderButton>
                        <button className="btn-floating btn-large waves-effect waves-light red"
                            onClick={props.onAddNewReminder}>
                            <i className="material-icons">add</i></button>
                    </AddReminderButton>
                </li>
            </ul>
        </div>
    </Nav>)
}


class Presentation extends Component {

    state={
        dateObject: moment(),
        showAddReminderModal: false,
        reminderToEdit:null,
    }

    handleAddReminder = ()=>{
        this.setState({showAddReminderModal:true})
    }
    handleDeleteAll = ()=>{
        this.props.resetCalendar()
    }
    handleCloseModal = ()=>{
        this.setState({reminderToEdit:null,showAddReminderModal:false})
    }
    onEditReminder= (r)=>{
        this.setState({reminderToEdit:r,showAddReminderModal:true })
    }

    firstDayOfMonth = () => this.state.dateObject.startOf("month").format("d")
    lastDayOfMonth = () => this.state.dateObject.daysInMonth("month")

    renderLastMonthDays=()=>{
        let blanks = []
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
          blanks.push(
            <Box className="calendar-day-empty" key={`empty-${i}`} />
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

    renderRestOfTheWeeks=()=>[2,3,4,5,6].map(week=>(
        <Row key={week}>{this.renderWeek(week,this.firstDayOfMonth())}</Row>))

    renderWeek=(week,firstDay)=>{
        let boxes = []
        let count = (week-2)*7 + (7-firstDay)
        for (let d = 1; d <= 7; d++) {
            boxes.push(
                (d+count) <= this.lastDayOfMonth() 
                ? (<Box key={d+count} className="calendar-day">
                    <DayNumber>{d+count}</DayNumber>
                    <Reminders>{this.getReminders(d+count)}</Reminders>
                    </Box>)
                : <Box className="calendar-day-empty" key={`empty-${d+count}`}>{""}</Box>
            )
        }
        return boxes
    }

    getReminders = (d)=>{
        const sortedReminders = this.props.month[d-1] ? this.props.month[d-1].sort(byTime) : []
        return sortedReminders.map(r => 
            <Reminder key={`key-${r.id[0]}${r.id[1]}`} reminder={r} onEdit={this.onEditReminder} 
                onDelete={this.props.deleteReminder}/>)
    }

    render(){
        return (
        <Page>                  
            <ActionsBar onDeleteAll={this.handleDeleteAll} onAddNewReminder={this.handleAddReminder}/>
            <Container>
                <Header>
                    {DAYS_OF_THE_WEEK.map(day=><p key={day}>{day}</p>)}
                </Header>
                <Content>
                    <Row>
                        {this.renderLastMonthDays()}
                        {this.renderFirstWeek()}
                    </Row>
                    {this.renderRestOfTheWeeks()}
                </Content>
            </Container>
            {this.state.showAddReminderModal 
            ?   <AddReminderModal
                    dateObject= {this.state.dateObject}
                    onClose={this.handleCloseModal}
                    reminderToEdit={this.state.reminderToEdit}
                /> 
            : null}
        </Page>)
    }
}

const mapState = (state) =>({
    month: state.month,
})

export default connect(mapState,actions)(Presentation)