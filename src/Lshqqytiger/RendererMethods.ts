export function catchAddress(line: string) {
    if (line.toLowerCase().includes('Running on'.toLowerCase())) {
        const addressRegex: RegExp = /(http:\/\/[\d.:]+)/;
        const match: RegExpMatchArray | null = line.match(addressRegex);
        if (match) {
            let result = match[1];
            if (result === 'http://0.0.0.0:7860') result = 'http://localhost:7860';
            return result;
        }
        return undefined;
    }
    return undefined;
}
