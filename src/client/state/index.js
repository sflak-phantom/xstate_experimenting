import { createContext } from 'react';
import { machine } from '@xstate/react';
import listMachine from '../utils/machines/listMachine';

export const MachineContext = createContext()