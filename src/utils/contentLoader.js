import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root path to the content directory
const CONTENT_DIR = path.resolve(__dirname, '../../content');
const TUTORIALS_DIR = path.join(CONTENT_DIR, 'tutorials');
const QUIZZES_DIR = path.join(CONTENT_DIR, 'quizzes');

export function getTutorialPath(filename) {
  return path.join(TUTORIALS_DIR, filename);
}

export function getQuizPath(filename) {
  return path.join(QUIZZES_DIR, filename);
}

export function loadTutorial(filename) {
  const filePath = getTutorialPath(filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Arquivo de tutorial não encontrado: ${filename}`);
  }
  return fs.readFileSync(filePath, 'utf-8');
}

export function loadQuiz(filename) {
  const filePath = getQuizPath(filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Arquivo de quiz não encontrado: ${filename}`);
  }
  const rawData = fs.readFileSync(filePath, 'utf-8');
  try {
    return JSON.parse(rawData);
  } catch (err) {
    throw new Error(`Falha ao processar o JSON do quiz (${filename}): ${err.message}`);
  }
}

export function checkModuleFiles(mod) {
  const tutorialExists = fs.existsSync(getTutorialPath(mod.tutorialFile));
  const quizExists = fs.existsSync(getQuizPath(mod.quizFile));
  return { tutorialExists, quizExists };
}
