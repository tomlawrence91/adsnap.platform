import { AsyncStorage } from 'react-native'
import { applyMiddleware, createStore, compose } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist-immutable';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './middleware/loggerMiddleware'
import mainReducer from './reducer';

const store = createStore(
  mainReducer,
  null,
  compose(
    autoRehydrate(),
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  )
)

persistStore(store, {storage: AsyncStorage})

export default store;
