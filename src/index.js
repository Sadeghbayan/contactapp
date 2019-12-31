import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './store/reducers/rootReducer';
import rootSaga from './store/sagas/rootSaga';
import "antd/dist/antd.css";
import '../src/scss/style.scss';
import ContactsContainer from './Components/Contact/Container/ContactsContainer';
import * as serviceWorker from './serviceWorker';


const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(rootSaga)

ReactDOM.render(
    <Provider store={store}>
        <ContactsContainer />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
