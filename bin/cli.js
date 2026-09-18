#!/usr/bin/env node

import { createCli } from '../src/index.js';

const program = createCli();
program.parse(process.argv);
