import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import Counter from './components/Counter';
import { useEffect, useState } from 'react';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      Rubik: require('./assets/fonts/Rubik.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Counter remaining={720000} />
      <StatusBar style="auto" />
    </View>
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
