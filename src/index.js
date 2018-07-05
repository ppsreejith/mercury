import { createStackNavigator } from 'react-navigation';
import Home from './screens/Home';

export default createStackNavigator(
  {
    Home,
  },
  {
    initialRouteName: 'Home',
  }
);
