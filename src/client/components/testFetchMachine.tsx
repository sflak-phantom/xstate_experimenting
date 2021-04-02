import React from 'react';
import { useMachine } from '@xstate/react';
import fetchMachine, { fetchDataTemplate } from '../utils/machines/fetchMachine';

export const TestFetchMachine: React.FunctionComponent = () => {
  const [fetchState, sendToFetchMach] = useMachine(fetchMachine, {
    actions: {
      fetchData: (ctx, event) => {
        fetchDataTemplate('/api/cat', sendToFetchMach)
      },
    },
  });
  return (
    <div>
      <button onClick={() => sendToFetchMach({ type: 'FETCH' })}></button>
      {fetchState.matches('pending')  && <span>loading...</span>}
      {fetchState.matches('successful') && <div>{`data: ${fetchState.context.results}`}</div>}
    </div>
  );
};
