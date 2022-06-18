import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SizingContext from './SizingContext';

type NumeralProps = {
  children: number;
};

const Numeral = ({ children }: NumeralProps) => {
  const { vmin } = useContext(SizingContext);
  return (
    <View style={[styles.container, { width: 20 * vmin, height: 30 * vmin }]}>
      <Text style={[styles.digit, { fontSize: 28 * vmin }]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  digit: {
    fontFamily: 'Rubik',
    color: '#f1f3f5',
  },
});

export default Numeral;
