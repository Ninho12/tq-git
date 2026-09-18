import { MODULES, findModule } from '../src/utils/modulesRegistry.js';
import { loadTutorial, loadQuiz, checkModuleFiles } from '../src/utils/contentLoader.js';

console.log('🧪 Iniciando testes de integridade do tq-git...\n');

let failed = false;

// 1. Validar módulos
if (MODULES.length !== 10) {
  console.error(`❌ Esperado 10 módulos, encontrado: ${MODULES.length}`);
  failed = true;
} else {
  console.log('✅ Registro contém exatamente 10 módulos.');
}

// 2. Validar cada módulo individualmente
MODULES.forEach((mod) => {
  const { tutorialExists, quizExists } = checkModuleFiles(mod);

  if (!tutorialExists) {
    console.error(`❌ Módulo ${mod.id}: Arquivo de tutorial não encontrado (${mod.tutorialFile})`);
    failed = true;
  }

  if (!quizExists) {
    console.error(`❌ Módulo ${mod.id}: Arquivo de quiz não encontrado (${mod.quizFile})`);
    failed = true;
  }

  // Validar Tutorial
  try {
    const tutContent = loadTutorial(mod.tutorialFile);
    const words = tutContent.trim().split(/\s+/).length;
    if (words < 200) {
      console.error(`❌ Módulo ${mod.id}: Tutorial muito curto (${words} palavras).`);
      failed = true;
    }
  } catch (err) {
    console.error(`❌ Módulo ${mod.id}: Erro ao carregar tutorial: ${err.message}`);
    failed = true;
  }

  // Validar Quiz
  try {
    const questions = loadQuiz(mod.quizFile);
    if (!Array.isArray(questions)) {
      console.error(`❌ Módulo ${mod.id}: Quiz não é um array.`);
      failed = true;
    } else if (questions.length !== 5) {
      console.error(`❌ Módulo ${mod.id}: Quiz contém ${questions.length} perguntas (esperado: exatamente 5).`);
      failed = true;
    } else {
      questions.forEach((q, idx) => {
        if (!q.question || typeof q.question !== 'string') {
          console.error(`❌ Módulo ${mod.id}, Questão ${idx + 1}: Pergunta ausente ou inválida.`);
          failed = true;
        }
        if (!Array.isArray(q.options) || q.options.length !== 4) {
          console.error(`❌ Módulo ${mod.id}, Questão ${idx + 1}: Opções devem ser um array com 4 alternativas.`);
          failed = true;
        }
        if (typeof q.correct !== 'number' || q.correct < 0 || q.correct > 3) {
          console.error(`❌ Módulo ${mod.id}, Questão ${idx + 1}: 'correct' deve ser um índice entre 0 e 3.`);
          failed = true;
        }
        if (!q.explanation || typeof q.explanation !== 'string') {
          console.error(`❌ Módulo ${mod.id}, Questão ${idx + 1}: Explicação didática ausente.`);
          failed = true;
        }
      });
    }
  } catch (err) {
    console.error(`❌ Módulo ${mod.id}: Erro ao carregar quiz: ${err.message}`);
    failed = true;
  }

  // Validar resolução de apelidos
  const resolved = findModule(String(mod.id));
  if (!resolved || resolved.id !== mod.id) {
    console.error(`❌ Falha ao resolver módulo pelo id: ${mod.id}`);
    failed = true;
  }
});

// 3. Resultado final
if (failed) {
  console.error('\n💥 Falha em um ou mais testes de integridade.');
  process.exit(1);
} else {
  console.log('\n🎉 TODOS OS 10 MÓDULOS, TUTORIAIS E QUIZZES PASSARAM COM SUCESSO!\n');
}
