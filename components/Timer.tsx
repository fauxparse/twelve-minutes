import { useCallback } from 'react';
import { useInterpret, useSelector } from '@xstate/react';
import { last } from 'lodash-es';
import { Audio } from 'expo-av';
import machine from './timerMachine';
import Counter, { CounterProps } from './Counter';

export type TimerSounds = {
  ding: Audio.Sound;
  dingding: Audio.Sound;
};

const Timer: React.FC<{ sounds: TimerSounds }> = ({ sounds }) => {
  const timer = useInterpret(machine, {
    actions: {
      ding: () => {
        sounds.ding.playAsync();
      },
      dingding: () => {
        sounds.dingding.playAsync();
      },
    },
  });

  const { send } = timer;

  const counterState = useSelector(
    timer,
    (state) =>
      last(last(state.toStrings())?.split('.')) as CounterProps['state']
  );

  const pressed = useCallback(() => {
    if (timer.state.matches('paused')) {
      send('START');
    } else if (timer.state.matches('running')) {
      send('PAUSE');
    } else if (timer.state.matches('complete')) {
      send('START');
    }
  }, [timer, send]);

  const reset = useCallback(() => {
    send('RESET');
  }, [send]);

  const current = useSelector(timer, (state) => state.context.current);

  return (
    <Counter
      remaining={current}
      state={counterState}
      onPress={pressed}
      onLongPress={reset}
    />
  );
};

export default Timer;
