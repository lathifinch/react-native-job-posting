import React from 'react'
import { Text, View } from 'react-native'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

// redux
import store from './redux/store'
import {Provider} from 'react-redux'

import MainScreen from './screens/MainScreen'
import LoginScreen from './screens/LoginScreen'
// import ListScreen1 from './screens/ListScreen1'
// import ListScreen2 from './screens/ListScreen2'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

const StackNavigation = createStackNavigator({
  LoginScreen,
  MainScreen,
  // ListScreen1,
  // ListScreen2,
},{
  defaultNavigationOptions: {
    header: null
  },
})

const AppContainer = createAppContainer(StackNavigation)
