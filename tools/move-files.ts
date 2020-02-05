const mkdirp = require('mkdirp');
const shell = require('shelljs');

const argv = Object.assign([], process.argv);
argv.splice(0, 2);
const call: 'copyToTemp' | 'copyFromTemp' | undefined = argv.shift();

const dataPath = `${process.env.HOME}/Library/Application Support/Alfred 3/Workflow Data/com.alfred-workflow-todoist`;
const cachePath = `${process.env.HOME}/Library/Caches/com.runningwithcrayons.Alfred-3/Workflow Data/com.alfred-workflow-todoist`;
const cwd = process.cwd();
const TEMP_FOLDER = 'assets';

function noop() {
  console.log(
    'Please try: ts-node tools/move-files.ts [call]\n\n\tcall: copyToTemp | copyFromTemp'
  );
}

function copyToTemp() {
  mkdirp(`${TEMP_FOLDER}`);
  shell.cp('dist/workflow/info.plist', `${TEMP_FOLDER}/info.plist`);
  shell.cp('dist/workflow/icon.png', `${TEMP_FOLDER}/icon.png`);
  shell.cp('dist/workflow/workflow.json', `${TEMP_FOLDER}/workflow.json`);
  shell.cp('dist/workflow/check-node.sh', `${TEMP_FOLDER}/check-node.sh`);
  // shell.cp('-R', 'dist/workflow/images/', `${TEMP_FOLDER}/images`)
}

function copyFromTemp() {
  mkdirp(`dist/workflow`);
  let plist = shell.cp(`${TEMP_FOLDER}/info.plist`, 'dist/workflow/info.plist')
    .stderr;
  let icon = shell.cp(`${TEMP_FOLDER}/icon.png`, 'dist/workflow/icon.png')
    .stderr;
  let workflowConfig = shell.cp(
    `${TEMP_FOLDER}/workflow.json`,
    'dist/workflow/workflow.json'
  ).stderr;
  let checkNode = shell.cp(
    `${TEMP_FOLDER}/check-node.sh`,
    'dist/workflow/check-node.sh'
  ).stderr;
  // shell.cp('-R', `${TEMP_FOLDER}/images/`, 'dist/workflow/images/')
}

if (call === 'copyToTemp') {
  copyToTemp();
} else if (call === 'copyFromTemp') {
  copyFromTemp();
} else {
  noop();
}
