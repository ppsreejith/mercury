import { createStackNavigator } from 'react-navigation';
import Home from './screens/Home';
import About from './screens/About';

export default createStackNavigator(
  {
    Home,
    About
  },
  {
    initialRouteName: 'Home'
  }
);
