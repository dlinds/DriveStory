import React from "react";
import { StyleSheet, View, Text } from "react-native";

export const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerIcon}>
        <Text style={styles.headerText}>Home</Text>
      </View>
      <View style={styles.headerIcon}>
        <Text style={styles.headerText}>Saved</Text>
      </View>
      <View style={styles.headerIcon}>
        <Text style={styles.headerText}>Settings</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#22222",
  },
  headerIcon: {
    padding: 15,
    flex: 1,
    borderWidth: 1,
    borderColor: "darkgray",
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
  },
  headerText: {
    color: "#222222",
  },
});
