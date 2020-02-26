import { config } from 'dotenv';
import macOsVersion from 'macos-version';
import pkg from '@pkg';

// Load .env file
config();

type Env = string | undefined;

const getEnvironment = (key: string): Env => process.env[`alfred_${key}`];
const workflowPath = process.cwd();

const meta: {
  osx: string;
  nodejs: string;
  alfred: Env;
  dataPath: Env;
  cachePath: Env;
} = {
  osx: macOsVersion() as string, // will always be MacOs
  nodejs: process.version,
  alfred: getEnvironment('version'),
  dataPath: getEnvironment('workflow_data'),
  cachePath: getEnvironment('workflow_cache'),
};

const requirements: {
  nodejs: string;
} = {
  nodejs: '10.0.0',
};

const workflow: {
  readonly version: string;
  readonly uid: Env;
  readonly bundleId: Env;
  readonly workflowPath: string;
  readonly workflowTimestamp: string;
  readonly notifierPath: string;
} = {
  version: pkg.version,
  uid: getEnvironment('workflow_uid'),
  bundleId: getEnvironment('workflow_bundleid'),
  workflowPath,
  workflowTimestamp: `${workflowPath}/workflow.json`,
  notifierPath: `${workflowPath}/notifier/terminal-notifier.app/Contents/MacOS/terminal-notifier`,
};

export const ENV = {
  meta,
  requirements,
  workflow,
  // debug: {
  //   _startTime: Date.now(),
  //   get startTime(): number {
  //     return this._startTime;
  //   },
  //   set startTime(startTime: number) {
  //     this._startTime = startTime;
  //   },
  // },
};