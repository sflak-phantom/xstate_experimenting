import { Machine, assign, spawn, sendParent } from 'xstate';

interface itemStateSchema {
  states: {
    idle: {};
    commit: {};
  };
}

type itemEvent = { type: 'UPDATE'; value: string } | { type: 'DELETE ' };

interface itemContext {
  value: string;
  id: number;
}

const itemMachine = Machine<itemContext, itemStateSchema, itemEvent>({
  id: 'item',
  context: {
    value: '',
    id: 0,
  },
  initial: 'idle',
  states: {
    idle: {
      entry: assign(ctx => {
        const { value, id } = ctx;
        return { value, id };
      }),
      on: {
        UPDATE: {
          target: 'commit',
          actions: assign({
            value: (ctx, event) => {
              console.log('event: ', event);
              return event.value;
            },
          }),
        },
      },
    },
    commit:{
      entry: sendParent((context) => ({
        type: 'ITEM.UPDATE',
        value: context.value,
        id: context.id,
      })),
      on: {
        "": 'idle'
      }
    }
  },
});

interface listEvent {
  id: number;
  value: string;
}

export const listMachine = Machine({
  id: 'list',
  context: {
    items: [],
  },
  initial: 'initializing',
  states: {
    initializing: {
      entry: assign({
        items: (ctx: any) => {
          return ctx.items.map(item => ({
            ...item,
            ref: spawn(itemMachine.withContext(item)),
          }));
        },
      }),
      on: {
        '': 'idle',
      },
    },
    idle: {},
  },
  on: {
    'ITEM.NEW': {
      actions: [
        assign({
          items: (ctx: any, e: { value: string; id: number }) => {
            console.log('hallo');
            const newItem = { value: e.value, id: e.id };
            return ctx.items.concat({
              ...newItem,
              ref: spawn(itemMachine.withContext(newItem)),
            });
          },
        }),
      ],
    },
    'ITEM.UPDATE': {
      actions: [
        assign({
          items: (ctx: any, e: listEvent) =>
            ctx.items.map(item => {
              console.log(
                '%c 🍎 item: ',
                'font-size:12px;background-color: #465975;color:#fff;',
                item
              );
              console.log(
                '%c 🍯 e: ',
                'font-size:12px;background-color: #6EC1C2;color:#fff;',
                e
              );
              const { value } = e;
              return item.id === e.id ? { ...item, value, ref: item.ref } : item;
            }),
        }),
      ],
    },
  },
});

export default listMachine;
