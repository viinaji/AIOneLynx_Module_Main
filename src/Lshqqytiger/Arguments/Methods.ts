import {ArgType, Category, ChosenArgument} from '../../types';
import Arguments from './Arguments';
import {getArgumentType, isValidArg, removeEscapes} from "../../utils";
import {isEmpty} from "lodash";

function getTypeByCategoryName(category: string): Category {
    switch (category) {
        case 'Command Line Arguments':
            return 'cl';
        case 'Environment Variables':
            return 'env';
        case 'Flags':
            return 'flag';
        default:
            return undefined;
    }
}

function getCategoryType(name: string): Category {
    if (!name) return undefined;

    for (const argument of Arguments) {
        if ('sections' in argument) {
            for (const section of argument.sections) {
                if (section.items.some(item => item.name === name)) {
                    return getTypeByCategoryName(argument.category);
                }
            }
        } else {
            if (argument.items.some(item => item.name === name)) {
                return getTypeByCategoryName(argument.category);
            }
        }
    }

    return undefined;
}

export function parseArgsToString(args: ChosenArgument[]): string {
    let result: string = '@echo off\n\n';
    let clResult: string = '';
    let flagResult: string = '';

    args.forEach(arg => {
        const cat = getCategoryType(arg.name);
        if (cat === 'env') {
            if (arg.name !== 'COMMANDLINE_ARGS') result += `set ${arg.name}=${arg.value}\n`;
        } else if (cat === 'cl') {
            const argType = getArgumentType(arg.name, Arguments);
            if (argType === 'CheckBox') {
                clResult += `${arg.name} `;
            } else if (argType === 'File' || argType === 'Directory') {
                clResult += `${arg.name} "${arg.value}" `;
            } else {
                clResult += `${arg.name} ${arg.value} `;
            }
        } else if (cat === 'flag') {
            flagResult += `${arg.name} `;
        }
    });

    if (!isEmpty(clResult)) result += `set COMMANDLINE_ARGS=${clResult}\n`;

    result += `\ncall webui.bat ${flagResult}`;

    return result;
}

export function parseStringToArgs(args: string): ChosenArgument[] {
    const argResult: ChosenArgument[] = [];
    const lines: string[] = args.split('\n');

    lines.forEach((line: string): void => {
        if (line.startsWith('set COMMANDLINE_ARGS=')) {
            argResult.push({name: 'COMMANDLINE_ARGS', value: ''});
            // Extract the command line arguments and clear falsy values
            const clArgs: string = line.split('=')[1];
            const args: string[] = clArgs.split('--').filter(Boolean);

            // Map each argument to an object with id and value
            const result: ArgType[] = args.map((arg: string): ArgType => {
                const [id, ...value] = arg.trim().split(' ');
                return {
                    name: `--${id}`,
                    value: value.join(' ').replace(/"/g, ''),
                };
            });

            // Process each argument
            result.forEach((value: ArgType): void => {
                // Check if the argument exists or valid
                if (isValidArg(value.name, Arguments)) {
                    if (getArgumentType(value.name, Arguments) === 'CheckBox') {
                        argResult.push({name: value.name, value: ''});
                    } else {
                        argResult.push({name: value.name, value: value.value});
                    }
                }
            });
        } else if (line.startsWith('set ')) {
            // If line starts with 'set ', extract the environment variable id and value
            let [name, value] = line.replace('set ', '').split('=');
            name = removeEscapes(name.trim());
            value = removeEscapes(value.trim());
            if (isValidArg(name, Arguments)) {
                argResult.push({name, value});
            }
        } else if (line.startsWith('call webui.bat')) {
            const flags = line.replace('call webui.bat ', '').split(' ');
            flags.forEach(flag => {
                if (isValidArg(flag, Arguments)) {
                    argResult.push({name: flag, value: ''});
                }
            });
        }
    });

    return argResult;
}
