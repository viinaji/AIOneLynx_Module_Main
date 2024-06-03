import {readArgs as lsReadArgs, runWebUI as lsGetRunCommands, saveArgs as lsSaveArgs} from './Lshqqytiger/MainMethods';
import {CardMainMethods} from './types';

type MainModules = {
    /** The ID of the card that using these methods */
    id: string;

    /** These methods will be called in the main process
     * @description This methods will be used when user interaction (Like run, config, etc.)
     */
    methods: CardMainMethods;
};

const mainModules: MainModules[] = [
    {
        id: 'LSHQQYTIGER_SD',
        methods: {getRunCommands: lsGetRunCommands, readArgs: lsReadArgs, saveArgs: lsSaveArgs},
    },
];

export default mainModules;
