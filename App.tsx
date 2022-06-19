import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import { useKeepAwake } from 'expo-keep-awake';
import Timer from './components/Timer';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useKeepAwake();

  useEffect(() => {
    Font.loadAsync({
      Rubik: require('./assets/fonts/Rubik.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Timer />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212529',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#f1f3f5',
    fontFamily: 'Rubik',
    textTransform: 'uppercase',
    fontSize: 50,
  },
});
