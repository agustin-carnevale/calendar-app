import uuidv1 from 'uuid/v1'
import { SAVE_REMINDER , DELETE_REMINDER, RESET_CALENDAR} from "../actions/types";

const reducer = (state = new Array(31), action) => {
  switch (action.type) {
    case SAVE_REMINDER:
        const month = [...state]
        const reminder = action.payload.reminder
        reminder['id']= uuidv1()

        if(!month[action.payload.day]){
          month[action.payload.day]= [reminder]
        }else{
          month[action.payload.day].push(reminder)
        }
        return month
    case DELETE_REMINDER:
        const monthCopy = [...state]
        const day= action.payload.day
        
        const dayReminders = monthCopy[day]
        monthCopy[day] = dayReminders.filter(r=> r.id !== action.payload.id)
        return monthCopy
    case RESET_CALENDAR:
        return new Array(31)
    default:
      return state
  }
}

export default reducer