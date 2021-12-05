import {LetheanCli} from './src/lethean-cli.ts';
// @todo adds stdin/tcp detection for rest mapping
await LetheanCli.init();



console.log(LetheanCli.options.commands)
