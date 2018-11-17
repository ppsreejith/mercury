import { createStackNavigator } from 'react-navigation';
import Home from './screens/Home';
import About from './screens/About';
import Locate from './screens/Locate';

export default createStackNavigator(
  {
    Home,
    About,
    Locate
  },
  {
    initialRouteName: 'Home'
  }
);
