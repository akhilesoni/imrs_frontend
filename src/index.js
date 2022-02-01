import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './redux/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux';
import { positions, Provider as AlertProvider } from "react-alert";
import AlertMUITemplate from "react-alert-template-mui";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const options = {
  position: positions.MIDDLE
};

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertMUITemplate} {...options}>
      <Provider store={store}>
        <App />
      </Provider>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
