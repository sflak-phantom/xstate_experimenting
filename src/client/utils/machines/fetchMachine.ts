import { Machine, assign } from 'xstate';

interface FetchStates {
  states: {
    idle: {};
    pending: {};
    successful: {};
    failed: {};
  };
}

type FetchMachineEvents =
  | { type: 'FETCH' }
  | { type: 'RESOLVE'; results: any[] }
  | { type: 'REJECT'; message: string };

interface FetchContext {
  results: any[];
  message: string;
}

export const fetchMachine = Machine<
  FetchContext,
  FetchStates,
  FetchMachineEvents
>(
  {
    id: 'fetchMachine',
    initial: 'idle',
    context: {
      results: [],
      message: '',
    },
    states: {
      idle: {
        on: {
          FETCH: 'pending',
        },
      },
      pending: {
        entry: ['fetchData'],
        on: {
          RESOLVE: { target: 'successful', actions: ['setResults'] },
          REJECT: { target: 'failed', actions: ['setMessage'] },
        },
      },
      failed: {
        on: {
          FETCH: 'pending',
        },
      },
      successful: {
        on: {
          FETCH: 'pending',
        },
      },
    },
  },
  {
    actions: {
      setResults: assign((ctx, event: any) => ({
        results: event.results,
      })),
      setMessage: assign((ctx, event: any) => ({
        message: event.message,
      })),
      fetchData: () => {
        console.log('override me!');
      },
    },
  }
);

export default fetchMachine;


// Use this to easily override fetchData in your component
export const fetchDataTemplate = (
  url: string,
  sendToFetchMach: (FetchMachineEvents) => {}
) => {
  fetch(url)
    .then(r => r.json())
    .then(
      res => {
        console.log(res);
        sendToFetchMach({ type: 'RESOLVE', results: res.result });
      },
      message => {
        sendToFetchMach({ type: 'REJECT', message });
      }
    );
};
