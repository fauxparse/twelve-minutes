import { useMemo } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { range } from 'lodash-es';
import Numeral from './Numeral';
import SizingContext from './SizingContext';

type CounterProps = {
  remaining: number;
};

const Counter = ({ remaining }: CounterProps) => {
  const { width, height } = useWindowDimensions();

  const vmin = useMemo(
    () => Math.min(width / 100, height / 50),
    [width, height]
  );

  const digits = useMemo(
    () =>
      range(2)
        .map((i) => Math.floor(((remaining / 1000) % 60 ** (i + 1)) / 60 ** i))
        .flatMap((digit) => [digit % 10, Math.floor(digit / 10)]),
    [remaining]
  );

  return (
    <SizingContext.Provider value={{ vmin }}>
      <View style={styles.container}>
        <Numeral>{digits[3]}</Numeral>
        <Numeral>{digits[2]}</Numeral>
        <Text
          style={[
            styles.colon,
            {
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
    </SizingContext.Provider>
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
    color: '#f1f3f5',
    textAlign: 'center',
  },
});

export default Counter;
