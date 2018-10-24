import React, {Component} from 'react';
import AppStackNavigator from './AppStackNavigator';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import reducers from './src/reducers';
import thunk from 'redux-thunk';

const createStoreWithMiddleWare=applyMiddleware(thunk)(createStore);

export default class App extends Component {
  render() {
    return(
      <Provider store={createStoreWithMiddleWare(reducers)}>
        <AppStackNavigator/>
      </Provider>
    );
  }
}
