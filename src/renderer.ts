import lsArguments from './Lshqqytiger/Arguments/Arguments';
import {
    parseArgsToString as lsParseArgsToString,
    parseStringToArgs as lsParseStringToArgs,
} from './Lshqqytiger/Arguments/Methods';
import {catchAddress as lsCatchAddress} from './Lshqqytiger/RendererMethods';
import {CardModules} from './types';

const rendererModules: CardModules = [
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
                bgUrl:
                    'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/af7bf88f-5b54-4590-9e9b-bf6fc073a' +
                    'c05/original=true/12161-3061700000-fog.jpeg',
                arguments: lsArguments,
                methods: {
                    catchAddress: lsCatchAddress,
                    parseArgsToString: lsParseArgsToString,
                    parseStringToArgs: lsParseStringToArgs,
                },
            },
        ],
    },

];
export default rendererModules;
