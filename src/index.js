import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import reducers from './redux/reducers'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = JSON.parse(localStorage.getItem("calendar-state"))
const store = createStore(
    reducers, 
    (initialState)? initialState:{},
    composeWithDevTools(applyMiddleware(reduxThunk)),
)

const historial = []
store.subscribe(()=> {
    historial.push(store.getState())
    localStorage.setItem("calendar-state", JSON.stringify(store.getState()))
})

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
