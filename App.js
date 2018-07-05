import React from 'react';

import App from './src';
import Navigation from './src/utils/Navigation';

export default class extends React.Component {
  render() {
    return (
      <App
          ref={ref => {
              Navigation.setTopLevelNavigator(ref);
            } }
      />
    )
  }
};
