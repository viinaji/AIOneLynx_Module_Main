import path from 'node:path';

import os from 'os';
import {ChosenArgument} from "../types";
import {parseArgsToString, parseStringToArgs} from "./Arguments/Methods";
import {promises} from "graceful-fs";

const BAT_FILE_NAME = 'webui-user.bat';

export function runWebUI(dir: string): string | string[] {
    const result: string = path.join(dir, BAT_FILE_NAME);

    result.replace(' ', '` ');

    if (os.platform() === 'win32') {
        return `${result}\r`;
    } else {
        return `./${result}\n`;
    }
}

export async function saveArgs(cardDir: string, args: ChosenArgument[]) {
    const result = parseArgsToString(args);
    const finalDir = path.join(cardDir, BAT_FILE_NAME);

    await promises.writeFile(finalDir, result);
}

export async function readArgs(cardDir: string) {
    const finalDir = path.join(cardDir, BAT_FILE_NAME);
    const data = await promises.readFile(finalDir, 'utf-8');
    return parseStringToArgs(data);
}
