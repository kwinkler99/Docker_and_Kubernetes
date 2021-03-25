import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import { createStore, applyMiddleware } from 'redux'
import reducer from './Reducers/reducers'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createMiddleware } from 'redux-api-middleware';


const store = createStore(reducer, applyMiddleware(thunk, createMiddleware()));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
      <Main />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);