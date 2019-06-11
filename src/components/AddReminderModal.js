import React, {Component} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import moment from 'moment'
import Modal from '../ui/Modal'
import * as actions from '../redux/actions/actionCreators';

const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    min-height: 50vh;
`

const InputBox = styled.div`
    margin: 20px;
    color: blue;
    width: 400px;
`


class ReminderForm extends Component {
    state={
        date:"",
        city:"",
        text:"",
        color:"#ff0000",
    }

    componentDidMount(){
        if(this.props.reminderToEdit){
            const dateObject = moment(this.props.reminderToEdit.date)
            const date = `${dateObject.format('YYYY')}-${dateObject.format('MM')}-${dateObject.format('DD')}T${dateObject.format('HH')}:${dateObject.format('mm')}`
            this.setState({
                date,
                city: this.props.reminderToEdit.city,
                text: this.props.reminderToEdit.text,
                color: this.props.reminderToEdit.color,
            })
        }
    }

    onDateChange=(event)=>{
        this.setState({date:event.target.value})
    }
    onCityChange=(event)=>{
        this.setState({city:event.target.value})
    }
    onReminderTextChange=(event)=>{
        this.setState({text:event.target.value})
    }
    onColorChange=(event)=>{
        this.setState({color:event.target.value})
    }

    handleSubmit= async (event)=>{
        event.preventDefault()
        const date = new Date(this.state.date)
        if(!this.props.reminderToEdit){
            this.props.saveReminder(date.getDate()-1,
                {
                    date: date.toUTCString(),
                    city: this.state.city,
                    text: this.state.text,
                    color: this.state.color,
                }   
            )
        }else{
            await this.props.deleteReminder(this.props.reminderToEdit)
            this.props.saveReminder(date.getDate()-1,
                {
                    date: date.toUTCString(),
                    city: this.state.city,
                    text: this.state.text,
                    color: this.state.color,
                }   
            )
        }
        this.props.onClose()
    }

    render(){
        return (
        <Container>
            <form onSubmit={this.handleSubmit}>
                <InputBox>  
                    <label>Date: </label><br/><br/>
                    <input
                        type="datetime-local" name="date"
                        onChange={this.onDateChange}
                        value={this.state.date}
                        min={`${this.props.dateObject.format('YYYY')}-${this.props.dateObject.format('MM')}-01T00:00`} 
                        max={`${this.props.dateObject.format('YYYY')}-${this.props.dateObject.format('MM')}-${this.props.dateObject.daysInMonth("month")}T00:00`} 
                        required
                    />
                </InputBox>
                <InputBox>
                    <label>City: </label>
                    <input type="text" name="city" value={this.state.city} 
                        onChange={this.onCityChange} required/>
                </InputBox>
                <InputBox>
                    <label>Reminder: </label>
                    <input type="text" name="text" maxLength="30" value={this.state.text} 
                        onChange={this.onReminderTextChange} required/>
                </InputBox>
                <InputBox>
                    <label>Choose a Color: </label>
                    <input type="color" name="color" value={this.state.color} 
                        onChange={this.onColorChange} required/>
                </InputBox>
                <button className="btn waves-effect waves-light right" type="submit">Save</button>
            </form>
        </Container>)
    }
}


const Presentation = (props) =>(
    <Modal 
        content={<ReminderForm {...props} />}
        onClose={props.onClose}
    />
)


export default connect(null,actions)(Presentation)