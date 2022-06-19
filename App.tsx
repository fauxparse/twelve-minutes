/* eslint-disable @typescript-eslint/no-var-requires */
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Audio } from 'expo-av';
import * as Font from 'expo-font';
import { useKeepAwake } from 'expo-keep-awake';
import Timer, { TimerSounds } from './components/Timer';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const [sounds, setSounds] = useState<TimerSounds | null>(null);

  useKeepAwake();

  useEffect(() => {
    Font.loadAsync({
      Rubik: require('./assets/fonts/Rubik.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  useEffect(() => {
    if (!sounds) {
      Promise.all([
        Audio.Sound.createAsync(require('./assets/sounds/ding.mp3')),
        Audio.Sound.createAsync(require('./assets/sounds/dingding.mp3')),
      ]).then(([{ sound: ding }, { sound: dingding }]) =>
        setSounds({ ding, dingding })
      );
    }

    return () => {
      if (sounds) {
        sounds.ding.unloadAsync();
        sounds.dingding.unloadAsync();
      }
    };
  }, [sounds]);

  if (!fontsLoaded || !sounds) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Timer sounds={sounds} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
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
