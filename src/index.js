import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { runListCommand } from './commands/list.js';
import { runTutorialCommand } from './commands/tutorial.js';
import { runQuizCommand } from './commands/quiz.js';
import { runPixCommand } from './commands/pix.js';

export function createCli() {
  const program = new Command();

  program
    .name('tq-git')
    .description(chalk.cyan('Terminal Quizzes & Tutoriais: Aprenda Git do básico ao avançado no terminal!'))
    .version('1.0.0');

  program
    .command('list')
    .description('Lista todos os 10 módulos disponíveis de Git')
    .action(() => {
      runListCommand();
    });

  program
    .command('tutorial [modulo]')
    .description('Exibe o tutorial formatado no terminal (ex: tq-git tutorial 01)')
    .action(async (modulo) => {
      await runTutorialCommand(modulo);
    });

  program
    .command('quiz [modulo]')
    .description('Inicia o questionário interativo de 5 perguntas do módulo (ex: tq-git quiz 01)')
    .action(async (modulo) => {
      await runQuizCommand(modulo);
    });

  program
    .command('pix')
    .description('Exibe a chave PIX e informações para apoiar o desenvolvedor')
    .action(() => {
      runPixCommand();
    });

  // Interactive root menu if called without any arguments
  program.action(async () => {
    console.log(chalk.bold.cyan(`\n╭────────────────────────────────────────╮`));
    console.log(chalk.bold.cyan(`│       `) + chalk.bold.yellow(`🚀 BEM-VINDO AO TQ-GIT 🚀`) + chalk.bold.cyan(`        │`));
    console.log(chalk.bold.cyan(`│  `) + chalk.white(`Aprenda Git com Tutoriais & Quizzes`) + chalk.bold.cyan(`   │`));
    console.log(chalk.bold.cyan(`╰────────────────────────────────────────╯\n`));

    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'menuOption',
        message: 'O que você deseja fazer?',
        choices: [
          { name: '📚 Listar todos os módulos', value: 'list' },
          { name: '📖 Ler um tutorial', value: 'tutorial' },
          { name: '🧠 Responder a um quiz', value: 'quiz' },
          { name: '💖 Apoiar o desenvolvedor (PIX)', value: 'pix' },
          new inquirer.Separator(),
          { name: '👋 Sair', value: 'exit' }
        ]
      }
    ]);

    switch (answer.menuOption) {
      case 'list':
        runListCommand();
        break;
      case 'tutorial':
        await runTutorialCommand();
        break;
      case 'quiz':
        await runQuizCommand();
        break;
      case 'pix':
        runPixCommand();
        break;
      case 'exit':
      default:
        console.log(chalk.gray('\nAté mais e bons estudos de Git!\n'));
        break;
    }
  });

  return program;
}
