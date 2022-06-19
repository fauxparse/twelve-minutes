import { createMachine, assign } from 'xstate';

const TWELVE_MINUTES = 720000;
const TWO_MINUTES = 120000;
const THIRTY_SECONDS = 30000;

export type TimerMachineContext = {
  duration: number;
  startedAt: number;
  remaining: number;
  current: number;
};

export type TimerMachineEvent =
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESET' }
  | { type: 'TICK' };

export type TimerMachineState = {
  value: 'paused' | { running: 'green' | 'orange' | 'red' } | 'complete';
  context: TimerMachineContext;
};

export default /** @xstate-layout N4IgpgJg5mDOIC5QBcCWBbMAnAdAGwHsBDCSAYkVAAcDZU0CA7SkAD0QFoAmARgBYcATl4AGEVwDMIiRIBsAVh4SANCACenLl3k55g2RJ4ieXWSPkiA7PIC+N1Wky4qRAK6xyAZQAqAQQBK3iw0dAzMSGycghI4InxK8rImVnqyqhoI3Nq6+hJcfCIAHAo8CnYOGNg4WK6MjKiMUDhQWGBgjGQAIgCSAHIA4sG09KhMLOwIPPIx1paWpVyC8nx50umcJjqpMrKChYZKgnzlII5VNXUNTQRYRI1gXX2DESEjYxETcgJ68lyFYmJtDx+OtMpscgY5HsDhJ9CczrgLvVGmQAAq+ACqngAokNQqNwqAJhxBJYcLw8oZBOJlolBKD+DhLIVCnwWYVhBJ9jJjvZTpVEbVkVAyNjep08W9CZEEFIYjtprJLLJdr8DAzFEzLEs1UpYVwrPCBdUhVcyD4APKoyVhcaIXY4Ap8SRmPiWSTQjWFWJHJJGYqFHjKo1OE2XFHeboAYQA0jaCXaEC7yYttJYpCIFIs0upNDxBBCYbT5u6Q1UAMYEdBUPBgZAPfzYnFBF7DW0fTTOnBct1-ZZmNa5pOZx3prjMvbAqZKux8xgEUjwCII-DEUgQePvImaCQCLn55YSZkiQQgofcZk4IO7OL-RKSQpl5xuDwb1v4rcy7hyK9U-vGPh5BZFRzyMHRqVJDlpFhE8nzDYVmladpN2lT4uCZYQplmRRTGKUEOCUdCTwMYFxyPeZZC4OCkSuHAbjuGAUMTD1YmZQo-iPSjzGVfDCJ9AxJGmfRtW0ajTUaapICYjsEGdb19n0f4+BVSRtXkXi8n4g4yLmBYxPDKBpO3BBvRErD5GsExZEKID8O0WQtJ4YoZEMSiJDgytq1resjJlLsFjidMnPmFk+FBXgCzdPJhDMBQpHyJ9fOJUwHJ7d0bOUsQQIyDgJE1a9T3zazTy5WcbCAA */
createMachine(
  {
    context: {
      duration: TWELVE_MINUTES,
      startedAt: 0,
      remaining: 0,
      current: 0,
    },
    tsTypes: {} as import('./timerMachine.typegen').Typegen0,
    schema: {
      context: {} as TimerMachineContext,
      events: {} as TimerMachineEvent,
    },
    initial: 'loaded',
    states: {
      loaded: {
        always: {
          actions: 'reset',
          target: 'paused',
        },
      },
      paused: {
        on: {
          START: {
            actions: 'start',
            target: 'running',
          },
          RESET: {
            actions: 'reset',
            target: 'paused',
          },
        },
      },
      running: {
        initial: 'green',
        invoke: {
          src: () => (callback) => {
            const interval = setInterval(() => callback('TICK'), 100);
            return () => clearInterval(interval);
          },
        },
        states: {
          green: {
            always: {
              target: 'orange',
              cond: ({ current }) => current <= TWO_MINUTES,
            },
          },
          orange: {
            always: {
              target: 'red',
              cond: ({ current }) => current <= THIRTY_SECONDS,
            },
          },
          red: {},
        },
        always: {
          target: 'complete',
          cond: ({ current }) => current <= 0,
        },
        on: {
          PAUSE: {
            actions: 'pause',
            target: 'paused',
          },
          RESET: {
            actions: 'reset',
            target: 'paused',
          },
          TICK: {
            actions: 'tick',
          },
        },
      },
      complete: {
        on: {
          RESET: {
            actions: 'reset',
            target: 'paused',
          },
          START: {
            actions: 'reset',
            target: 'running',
          },
        },
      },
    },
    id: 'timer',
  },
  {
    actions: {
      reset: assign(({ duration }) => ({
        startedAt: Date.now(),
        remaining: duration,
        current: duration,
      })),
      start: assign(({ remaining }) => ({
        startedAt: Date.now(),
        current: remaining,
      })),
      pause: assign(({ remaining, startedAt }) => ({
        remaining: remaining - (Date.now() - startedAt),
      })),
      tick: assign(({ remaining, startedAt }) => ({
        current: Math.max(0, remaining - (Date.now() - startedAt)),
      })),
    },
  }
);
