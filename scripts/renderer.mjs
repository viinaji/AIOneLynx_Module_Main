import { A as Arguments, p as parseArgsToString, a as parseStringToArgs } from './Methods_Cx000B.mjs';

function catchAddress(line) {
    if (line.toLowerCase().includes('Running on'.toLowerCase())) {
        const addressRegex = /(http:\/\/[\d.:]+)/;
        const match = line.match(addressRegex);
        if (match) {
            let result = match[1];
            if (result === 'http://0.0.0.0:7860')
                result = 'http://localhost:7860';
            return result;
        }
        return undefined;
    }
    return undefined;
}

const rendererModules = [
    {
        routePath: '/imageGenerationPage',
        cards: [
            {
                id: 'LSHQQYTIGER_SD',
                title: 'Stable Diffusion web UI for AMDGPUs',
                description: 'A web interface for Stable Diffusion, implemented using Gradio library.',
                repoUrl: 'https://github.com/lshqqytiger/stable-diffusion-webui-amdgpu',
                extensionsDir: '/extensions',
                type: 'image',
                bgUrl: 'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/af7bf88f-5b54-4590-9e9b-bf6fc073a' +
                    'c05/original=true/12161-3061700000-fog.jpeg',
                arguments: Arguments,
                methods: {
                    catchAddress: catchAddress,
                    parseArgsToString: parseArgsToString,
                    parseStringToArgs: parseStringToArgs,
                },
            },
        ],
    },
];

export { rendererModules as default };
