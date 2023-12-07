import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const LoginScreen = ({navigation}: any) => {
  return (
    <View style={styles.main}>
      <Text style={styles.welcome}>Welcome!</Text>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.loginText}>Twitter Sign-in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  main: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  welcome: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 1,
    margin: 10,
  },
  loginBtn: {padding: 10, backgroundColor: 'skyblue', borderRadius: 10},
  loginText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '700',
  },
});
