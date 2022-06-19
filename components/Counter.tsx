import { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { range } from 'lodash-es';
import COLORS from './colors';
import Numeral from './Numeral';
import CounterContext from './CounterContext';

export type CounterProps = {
  remaining: number;
  state: 'paused' | 'green' | 'orange' | 'red' | 'complete';
  onPress: () => void;
  onLongPress: () => void;
};

const COUNTER_COLORS = {
  ...COLORS,
  paused: COLORS.white,
  green: COLORS.white,
  complete: COLORS.red,
};

const Counter = ({ remaining, state, onPress, onLongPress }: CounterProps) => {
  const { width, height } = useWindowDimensions();

  const color = COUNTER_COLORS[state];

  const vmin = useMemo(
    () => Math.min(width / 100, height / 50),
    [width, height]
  );

  const digits = useMemo(
    () =>
      range(2)
        .map((i) =>
          Math.floor((Math.ceil(remaining / 1000) % 60 ** (i + 1)) / 60 ** i)
        )
        .flatMap((digit) => [digit % 10, Math.floor(digit / 10)]),
    [remaining]
  );

  return (
    <CounterContext.Provider value={{ vmin, color }}>
      <TouchableWithoutFeedback onPress={onPress} onLongPress={onLongPress}>
        <View>
          <View style={styles.container}>
            <Numeral>{digits[3]}</Numeral>
            <Numeral>{digits[2]}</Numeral>
            <Text
              style={[
                styles.colon,
                {
                  color,
                  fontSize: 28 * vmin,
                  width: 10 * vmin,
                  transform: [{ translateY: vmin * -2 }],
                },
              ]}
            >
              :
            </Text>
            <Numeral>{digits[1]}</Numeral>
            <Numeral>{digits[0]}</Numeral>
          </View>
          <Text
            style={{
              fontFamily: 'Rubik',
              color: COLORS.orange,
              fontSize: 8 * vmin,
              textAlign: 'center',
              opacity: state === 'paused' ? 1 : 0,
            }}
          >
            PAUSED
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </CounterContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colon: {
    fontFamily: 'Rubik',
    textAlign: 'center',
  },
});

export default Counter;
