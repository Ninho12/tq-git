import chalk from 'chalk';
import boxen from 'boxen';

export function runPixCommand() {
  const content = [
    chalk.bold.yellow('✦ APOIE O DESENVOLVIMENTO DO TQ-GIT ✦'),
    '',
    chalk.white('Gostou da ferramenta e quer apoiar o desenvolvedor? Considere fazer uma doação via PIX!'),
    '',
    `${chalk.bold.cyan('Desenvolvedor:')} ${chalk.bold.white('João Paulo Sena Padilha')}`,
    `${chalk.bold.cyan('Chave PIX (E-mail):')} ${chalk.bold.green('joaopaulojpsp@gmail.com')}`,
    '',
    chalk.bold.magenta('Sugestões de valores:'),
    `  ${chalk.bgGreen.black.bold(' R$ 5,00 ')}   ${chalk.bgCyan.black.bold(' R$ 10,00 ')}   ${chalk.bgYellow.black.bold(' R$ 20,00 ')}`,
    '',
    chalk.dim('Sua contribuição ajuda a manter este projeto atualizado e gratuito!')
  ].join('\n');

  const boxed = boxen(content, {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'green',
    title: chalk.bold.greenBright(' PIX - Apoie o Projeto '),
    titleAlignment: 'center'
  });

  console.log(boxed);
}
