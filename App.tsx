import React from 'react';
import {Dimensions, SafeAreaView, ScrollView} from 'react-native';

import {Home} from './src/ui/Home/screens/Home';

const App = (): JSX.Element => {
  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{height: Dimensions.get('screen').height}}>
        <Home />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
