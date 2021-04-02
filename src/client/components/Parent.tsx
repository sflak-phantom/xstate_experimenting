import React, { useState } from 'react';
import { useMachine } from '@xstate/react';
import listMachine from '../utils/machines/listMachine';

import Child from './Child'

export const Parent: React.FunctionComponent = () => {
  const [listMachState, sendToListMach] = useMachine(listMachine);
  const [nextId, setNextId] = useState(1);
  console.log('%c 🍼️ listMachState: ', 'font-size:12px;background-color: #3F7CFF;color:#fff;', listMachState.context);

  const addNewItem = () => {
    console.log('%c 🥧 nextId: ', 'font-size:12px;background-color: #EA7E5C;color:#fff;', nextId);
    sendToListMach("ITEM.NEW", { value: "Im alive", id: nextId });
    setNextId(nextId + 1);
  }
  return (
    <div className="Item_container">
      <div className="Item_container--items">
        <button onClick={() => addNewItem()}>Add list item</button>
        <p className="Item_container--title">Item Machine States</p>
        <div>{listMachState.context.items.map(item => <Child key={item.id} itemMachRef={item.ref} />)}</div>
      </div>
      <div className="Item_container--list">
        <p className="Item_container--title">List Machine State</p>
          {listMachState.context.items.map(item => {
            return (
              <div className="Item_info">
                <p className="Item_info--text">id: {item.id}</p>
                <p className="Item_info--text">id: {item.value}</p>
              </div>
              )
          })}
      </div>
    </div>

  )
};
