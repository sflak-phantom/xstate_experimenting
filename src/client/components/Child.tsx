import React from 'react';
import { useActor } from '@xstate/react';

export const Child = ({ itemMachRef }) => {
  console.log('%c 🦐 itemMachRef: ', 'font-size:12px;background-color: #7F2B82;color:#fff;', itemMachRef);
  const [ state, send ] = useActor(itemMachRef);
  {/* @ts-expect-error cause */}
  console.log('%c 🍩 state: ', 'font-size:12px;background-color: #FCA650;color:#fff;', state.context);

  return(
    <>
      {/* @ts-expect-error cause */}
      <div className="Item_box" onClick={() => send({ type: "UPDATE", value: 'new' })}>
        {/* @ts-expect-error cause */}
        <p>id: {state.context.id}</p>        
        {/* @ts-expect-error cause */}
        <p>{state.context.value}</p>
      </div>
    </>
  )
}

export default Child;