import { marked } from 'marked';
import { MarkedTerminal } from 'marked-terminal';
import chalk from 'chalk';

// Configure marked with terminal renderer
marked.setOptions({
  renderer: new MarkedTerminal({
    heading: chalk.bold.cyan,
    firstHeading: chalk.bold.yellow.underline,
    secondHeading: chalk.bold.magenta,
    thirdHeading: chalk.bold.blue,
    code: chalk.yellow,
    blockquote: chalk.gray.italic,
    tableOptions: {
      style: {
        head: ['cyan', 'bold'],
        border: ['gray']
      }
    }
  })
});

export function renderMarkdown(content) {
  try {
    return marked(content);
  } catch (err) {
    // Fallback in case of rendering glitch
    return content;
  }
}

export function printHeader(title) {
  console.log(chalk.bold.cyan('\n' + '='.repeat(60)));
  console.log(chalk.bold.yellow(`  ${title}`));
  console.log(chalk.bold.cyan('='.repeat(60) + '\n'));
}

export function printSubHeader(text) {
  console.log(chalk.bold.magenta(`\n▶ ${text}\n`));
}
