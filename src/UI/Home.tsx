import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Body} from './Body';
import {Header} from './Header';

export const Home = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Body />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
