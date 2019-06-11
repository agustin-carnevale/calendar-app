import { SAVE_REMINDER, DELETE_REMINDER , RESET_CALENDAR} from './types'

export const saveReminder  = (day,reminder) => async dispatch => {
    const today = new Date().getDate()-1

    //Free subscription to OpenWeatherMap API only allows next 5 days forecast
    //So for the purposes of this app I will be able to show the weather for only those days
    if(day > today && day < today+6){
        try {
            const city = encodeURIComponent(reminder.city.trim())
            const api=`http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=93f786ab49ad64b13e57d8a7f99a50cc`
            const response = await fetch(api)
            const json = await response.json()
            reminder['weather']= json.list[(day-today-1)*8+4].weather[0].description
        } catch (error) {
            reminder['weather']= "-API failed-"
            console.log(error)
        }
    }else{
        reminder['weather']= "not available"
    }

    dispatch({  
        type:SAVE_REMINDER,
        payload:{
            day,
            reminder,
        }
    })
}

export const deleteReminder  = (reminder) => async dispatch => {
    const day = new Date(reminder.date).getDate()-1
    dispatch({  
        type:DELETE_REMINDER,
        payload:{
            day,
            id: reminder.id,
        }
    })
}

export const resetCalendar  = () => async dispatch => {
    dispatch({  
        type:RESET_CALENDAR,
        payload:{}
    })
}