import React, { useState, useContext, useEffect } from 'react';
import { render } from 'react-dom';
import { MachineContext} from '../state';
import Child from './Child'

export const Parent: React.FunctionComponent = () => {
  const [listMachState, sendToListMach] = useContext(MachineContext);
  const [nextId, setNextId] = useState(1);

  interface Iitem {
    id: number,
    value: string,
    ref: unknown
  }
  

  const addNewItem = () => {
    sendToListMach("ITEM.NEW", { value: "Im alive", id: nextId });
    setNextId(nextId + 1);
  }

  const renderChild = (itemId) => {
    const { items } = listMachState.context;
    render(<Child itemMachRef={items[itemId].ref} />, document.getElementById(`item-${itemId}`))
  }

  useEffect(() => {
    const prevId = nextId - 1;
    if(listMachState.context.items && listMachState.context.items[prevId]) {
      renderChild(nextId - 1)
    }
  }, [nextId])

  return (
    <div className="Item_container">
      <button className='Item_addButton' onClick={() => addNewItem()}>Add list item</button>
      <div className="Item_container--items">
        <p className="Item_container--title">Item Machine States</p>
        {/* @ts-ignore because */}
        <div>{Object.values(listMachState.context.items).map((item: Iitem) => <div id={`item-${item.id}`}></div>)}</div>
      </div>
      <div className="Item_container--list">
        <p className="Item_container--title">List Machine State</p>
          {Object.values(listMachState.context.items).map(item => {
            return (
              <div className="Item_info">
                {/* @ts-ignore because */}
                <p className="Item_info--text">id: {item.id}</p>
                {/* @ts-ignore because */}
                <p className="Item_info--text">id: {item.value}</p>
              </div>
              )
          })}
      </div>
    </div>

  )
};
