import {ArgumentsData} from "./types";
import {isEmpty} from "lodash";

export function removeEscapes(str: string) {
    return str.replace(/\\(.)/gm, '$1');
}


export function isValidArg(name: string, Arguments: ArgumentsData): boolean {
    if (isEmpty(name)) return false;
    for (const argument of Arguments) {
        if ('sections' in argument) {
            for (const section of argument.sections) {
                if (section.items.some(item => item.name === name)) return true;
            }
        } else {
            if (argument.items.some(item => item.name === name)) return true;
        }
    }
    return false;
}

export default function GetFilteredArguments(filterKeys: string[] = [], Arguments: ArgumentsData): ArgumentsData {
    if (isEmpty(filterKeys)) return Arguments;
    return Arguments.map(argument => {
        if ('sections' in argument) {
            return {
                ...argument,
                sections: argument.sections.map(section => {
                    return {...section, items: section.items.filter(item => !filterKeys.includes(item.name))};
                }),
            };
        } else {
            return {...argument, items: argument.items.filter(item => !filterKeys.includes(item.name))};
        }
    });
}

export function getArgumentByName(name: string, Arguments: ArgumentsData) {
    if (isEmpty(name)) return undefined;
    for (const argument of Arguments) {
        if ('sections' in argument) {
            for (const section of argument.sections) {
                const found = section.items.find(item => item.name === name);
                if (found) return found;
            }
        } else {
            const found = argument.items.find(item => item.name === name);
            if (found) return found;
        }
    }
    return undefined;
}

export function getArgumentType(name: string, Arguments: ArgumentsData) {
    return getArgumentByName(name, Arguments)?.type || undefined;
}

export function getArgumentDefaultValue(name: string, Arguments: ArgumentsData) {
    return getArgumentByName(name, Arguments)?.defaultValue || undefined;
}

export function getArgumentValues(name: string, Arguments: ArgumentsData) {
    return getArgumentByName(name, Arguments)?.values || undefined;
}

export function getArgumentDescription(name: string, Arguments: ArgumentsData) {
    return getArgumentByName(name, Arguments)?.description || undefined;
}
