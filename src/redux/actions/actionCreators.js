
import { EXAMPLE } from './types'
//import axios from 'axios'

export const setExample  = () => async dispatch => {
    //const res = await axios.post('http://www.mocky.io/v2/5bb111412e00008300927103',formData)
    console.log('Setting Exmaple')
    dispatch({  
        type:EXAMPLE,
        payload:"EXAMPLE PAYLOAD"
    })
}