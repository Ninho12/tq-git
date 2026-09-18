import inquirer from 'inquirer';
import chalk from 'chalk';
import boxen from 'boxen';
import { MODULES, findModule } from '../utils/modulesRegistry.js';
import { loadQuiz } from '../utils/contentLoader.js';

export async function runQuizCommand(moduleParam) {
  let selectedMod = null;

  if (moduleParam) {
    selectedMod = findModule(moduleParam);
    if (!selectedMod) {
      console.log(chalk.red(`\n✖ Módulo "${moduleParam}" não encontrado.`));
      console.log(chalk.gray('Use ') + chalk.yellow('tq-git list') + chalk.gray(' para ver os módulos disponíveis.\n'));
      return;
    }
  } else {
    // Interactive module selection
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
        message: 'Selecione o módulo para iniciar o quiz:',
        choices,
        pageSize: 12
      }
    ]);

    selectedMod = answer.chosenModule;
    if (!selectedMod) return;
  }

  let questions = [];
  try {
    questions = loadQuiz(selectedMod.quizFile);
  } catch (err) {
    console.log(chalk.red(`\n✖ Erro ao carregar quiz: ${err.message}\n`));
    return;
  }

  // Quiz Header
  console.log(
    boxen(
      `${chalk.bold.yellow(`QUIZ: MÓDULO ${String(selectedMod.id).padStart(2, '0')}`)}\n${chalk.bold.white(selectedMod.title)}\n${chalk.gray('Responda às 5 perguntas de múltipla escolha')}`,
      {
        padding: { top: 0, bottom: 0, left: 2, right: 2 },
        margin: { top: 1, bottom: 1 },
        borderColor: 'magenta',
        borderStyle: 'round',
        textAlignment: 'center'
      }
    )
  );

  let score = 0;
  const total = questions.length;

  for (let i = 0; i < total; i++) {
    const q = questions[i];
    console.log('\n' + chalk.bold.cyan(`━━━━━━━━━━━━━━━━ Pergunta ${i + 1} de ${total} ━━━━━━━━━━━━━━━━`));
    console.log(chalk.bold.white(`\n${q.question}\n`));

    const optionsChoices = q.options.map((opt, index) => ({
      name: opt,
      value: index
    }));

    const response = await inquirer.prompt([
      {
        type: 'list',
        name: 'userChoice',
        message: 'Escolha a opção correta:',
        choices: optionsChoices,
        pageSize: 6
      }
    ]);

    const isCorrect = response.userChoice === q.correct;
    if (isCorrect) {
      score++;
      console.log(chalk.bold.green('\n✔ Resposta Correta!'));
    } else {
      console.log(chalk.bold.red('\n✖ Resposta Incorreta!'));
      console.log(chalk.yellow(`Opção correta: `) + chalk.bold.white(q.options[q.correct]));
    }

    if (q.explanation) {
      console.log(chalk.gray(`\n💡 Explicação: `) + chalk.italic.white(q.explanation));
    }

    // Small pause between questions
    if (i < total - 1) {
      await inquirer.prompt([
        {
          type: 'input',
          name: 'continue',
          message: chalk.dim('Pressione Enter para ir para a próxima pergunta...'),
          default: ''
        }
      ]);
    }
  }

  // Final Results
  const percentage = Math.round((score / total) * 100);
  let feedbackMessage = '';
  let borderColor = 'green';

  if (score === total) {
    feedbackMessage = chalk.bold.green('🏆 Perfeito! Você domina este módulo completamente!');
    borderColor = 'green';
  } else if (score >= 4) {
    feedbackMessage = chalk.bold.cyan('👏 Muito bom! Excelente retenção de conteúdo!');
    borderColor = 'cyan';
  } else if (score >= 3) {
    feedbackMessage = chalk.bold.yellow('👍 Bom resultado! Quase lá para gabaritar.');
    borderColor = 'yellow';
  } else {
    feedbackMessage = chalk.bold.red('📖 Recomendamos reler o tutorial para fixar os conceitos.');
    borderColor = 'red';
  }

  const resultCard = [
    chalk.bold.yellow('✦ RESULTADO FINAL DO QUIZ ✦'),
    '',
    `${chalk.bold('Pontuação:')} ${chalk.bold.white(`${score}/${total}`)} acertos (${percentage}%)`,
    '',
    feedbackMessage
  ].join('\n');

  console.log('\n' + boxen(resultCard, {
    padding: 1,
    margin: { top: 1, bottom: 1 },
    borderColor,
    borderStyle: 'round',
    textAlignment: 'center'
  }));

  // Post quiz action
  const postAction = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'O que deseja fazer agora?',
      choices: [
        { name: '🔄 Tentar novamente este quiz', value: 'retry' },
        { name: '📚 Ir para outro módulo', value: 'other' },
        { name: '👋 Finalizar por agora', value: 'exit' }
      ]
    }
  ]);

  if (postAction.action === 'retry') {
    await runQuizCommand(selectedMod.slug);
  } else if (postAction.action === 'other') {
    await runQuizCommand();
  }
}
