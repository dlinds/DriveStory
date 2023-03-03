import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Header} from './Header';

export const Home = () => {
  return (
    <View
      style={{...styles.container, height: Dimensions.get('screen').height}}>
      <Header />
      <View style={styles.body}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    backgroundColor: '#222222',
  },
});
