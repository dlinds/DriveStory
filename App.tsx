import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import {Home} from './src/UI/Home';

const App = (): JSX.Element => {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Home />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
