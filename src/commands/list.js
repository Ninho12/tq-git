import chalk from 'chalk';
import boxen from 'boxen';
import { MODULES } from '../utils/modulesRegistry.js';
import { checkModuleFiles } from '../utils/contentLoader.js';

export function runListCommand() {
  console.log('\n' + chalk.bold.cyan('📚 MÓDULOS DE APRENDIZADO DO TQ-GIT') + '\n');
  console.log(chalk.gray('Use ') + chalk.yellow('tq-git tutorial <modulo>') + chalk.gray(' para ler ou ') + chalk.yellow('tq-git quiz <modulo>') + chalk.gray(' para praticar.\n'));

  MODULES.forEach((mod) => {
    const { tutorialExists, quizExists } = checkModuleFiles(mod);
    const tutBadge = tutorialExists ? chalk.green('✔ Tutorial') : chalk.red('✖ Tutorial');
    const quizBadge = quizExists ? chalk.green('✔ Quiz (5 Qs)') : chalk.red('✖ Quiz');

    console.log(
      `${chalk.bold.yellow(String(mod.id).padStart(2, '0'))}. ` +
      `${chalk.bold.white(mod.title)} ` +
      `${chalk.gray(`(${mod.slug})`)}`
    );
    console.log(`    ${chalk.gray(mod.description)}`);
    console.log(`    ${chalk.dim('Conteúdo:')} ${tutBadge}  |  ${quizBadge}`);
    console.log('');
  });

  const tip = chalk.cyan('Dica: ') + chalk.white('Você pode rodar por número ou nome, ex: ') + chalk.yellow('tq-git tutorial 01') + chalk.white(' ou ') + chalk.yellow('tq-git quiz branching');
  console.log(boxen(tip, { padding: { left: 2, right: 2, top: 0, bottom: 0 }, borderColor: 'blue', borderStyle: 'round' }));
  console.log('');
}
