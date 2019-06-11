import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import Pencil from 'react-material-icon-svg/dist/Pencil'
import DeleteIcon from 'react-material-icon-svg/dist/DeleteForever'

const ReminderContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: flex-start;
    border-radius: 12%;
    background: ${props => props.color};
    margin: 5px;
    padding: 10px 5px 5px 5px;
    width: 90%;

    @media (max-width: 860px) {
        padding-top: 25px;
    }
`

const EditReminder = styled.div`
    position: absolute;
    top: 5px;
    right: 30px;
`

const DeleteReminder = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
`

const Reminder = (props)=>{
    const dateObject = moment(props.reminder.date)
    return (
        <ReminderContainer color={props.reminder.color}>
            <span><b>{`${dateObject.format('HH')}:${dateObject.format('mm')}h`}</b></span>
            <p>{props.reminder.text}</p>
            <span><b>City:</b> {props.reminder.city}</span>
            <span><b>Weather:</b> {props.reminder.weather}</span>
            <EditReminder><Pencil onClick={()=>props.onEdit(props.reminder)}/></EditReminder>
            <DeleteReminder><DeleteIcon onClick={()=>props.onDelete(props.reminder)}/></DeleteReminder>
        </ReminderContainer>
    ) 
}

export default Reminder