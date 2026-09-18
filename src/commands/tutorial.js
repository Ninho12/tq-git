import inquirer from 'inquirer';
import chalk from 'chalk';
import boxen from 'boxen';
import { MODULES, findModule } from '../utils/modulesRegistry.js';
import { loadTutorial } from '../utils/contentLoader.js';
import { renderMarkdown } from '../utils/renderer.js';
import { runQuizCommand } from './quiz.js';

export async function runTutorialCommand(moduleParam) {
  let selectedMod = null;

  if (moduleParam) {
    selectedMod = findModule(moduleParam);
    if (!selectedMod) {
      console.log(chalk.red(`\n✖ Módulo "${moduleParam}" não encontrado.`));
      console.log(chalk.gray('Use ') + chalk.yellow('tq-git list') + chalk.gray(' para ver os módulos disponíveis.\n'));
      return;
    }
  } else {
    // Interactive selection
    const choices = MODULES.map(m => ({
      name: `${String(m.id).padStart(2, '0')}. ${m.title}`,
      value: m
    }));

    choices.push(new inquirer.Separator());
    choices.push({ name: chalk.gray('← Voltar / Sair'), value: null });

    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'chosenModule',
        message: 'Selecione o tutorial que deseja estudar:',
        choices,
        pageSize: 12
      }
    ]);

    selectedMod = answer.chosenModule;
    if (!selectedMod) return;
  }

  // Header
  const headerBox = boxen(
    `${chalk.bold.yellow(`MÓDULO ${String(selectedMod.id).padStart(2, '0')}`)}\n${chalk.bold.white(selectedMod.title)}`,
    {
      padding: { top: 0, bottom: 0, left: 2, right: 2 },
      margin: { top: 1, bottom: 1 },
      borderColor: 'cyan',
      borderStyle: 'double',
      textAlignment: 'center'
    }
  );
  console.log(headerBox);

  // Load and render Markdown
  try {
    const rawMarkdown = loadTutorial(selectedMod.tutorialFile);
    const rendered = renderMarkdown(rawMarkdown);
    console.log(rendered);
  } catch (err) {
    console.log(chalk.red(`\n✖ Erro ao carregar tutorial: ${err.message}\n`));
    return;
  }

  console.log(chalk.cyan('─'.repeat(60)));
  console.log(chalk.bold.green('✔ Você concluiu a leitura deste tutorial!\n'));

  // Prompt to take quiz
  const nextStep = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'startQuizNow',
      message: `Deseja fazer o quiz do módulo "${selectedMod.title}" agora?`,
      default: true
    }
  ]);

  if (nextStep.startQuizNow) {
    await runQuizCommand(selectedMod.slug);
  }
}
