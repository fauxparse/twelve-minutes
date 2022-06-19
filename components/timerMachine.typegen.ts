// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    reset: '' | 'RESET' | 'START';
    start: 'START';
    pause: 'PAUSE';
    tick: 'TICK';
  };
  internalEvents: {
    '': { type: '' };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | 'loaded'
    | 'paused'
    | 'running'
    | 'running.green'
    | 'running.orange'
    | 'running.red'
    | 'complete'
    | { running?: 'green' | 'orange' | 'red' };
  tags: never;
}
