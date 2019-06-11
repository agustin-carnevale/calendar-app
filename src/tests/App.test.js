import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import reducers from '../redux/reducers'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

it('renders without crashing', () => {
  const initialState = JSON.parse(localStorage.getItem("calendar-state"))
  const store = createStore(
      reducers, 
      initialState ? initialState:{},
      composeWithDevTools(applyMiddleware(reduxThunk)),
  )

  const historial = []
  store.subscribe(()=> {
      historial.push(store.getState())
      localStorage.setItem("calendar-state", JSON.stringify(store.getState()))
  })

  const div = document.createElement('div')
  ReactDOM.render(    
    <Provider store={store}>
      <App />
    </Provider>, div)

  ReactDOM.unmountComponentAtNode(div)
})
