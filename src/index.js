import { createStackNavigator } from 'react-navigation';
import Home from './screens/Home';
import About from './screens/About';
import Locate from './screens/Locate';
import Comfort from './screens/Comfort';

export default createStackNavigator(
  {
    Home,
    About,
    Locate,
    Comfort
  },
  {
    initialRouteName: 'Home'
  }
);
