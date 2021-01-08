import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';
import Main from './components/MainComponent';

const store=ConfigureStore();

export default function App() {
  return (
   
    <NavigationContainer>
       <Provider store={store}>
       <Main />
       </Provider>
     </NavigationContainer>
    
  );
}


