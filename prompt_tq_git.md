# Prompt para Criação da Ferramenta CLI: `tq-git`

Você é um desenvolvedor expert em Node.js e ferramentas CLI. Seu objetivo é criar uma ferramenta de linha de comando chamada **`tq-git`** (publicável no NPM sob um escopo pessoal, ex: `@ninho12/tq-git`), destinada a ensinar Git do básico ao avançado diretamente pelo terminal através de **tutoriais em Markdown** e **quizzes interativos em JSON**.

---

## 1. Requisitos Técnicos da CLI

1. **Estrutura do Projeto:**
   - `bin/cli.js`: Ponto de entrada executável (`#!/usr/bin/env node`).
   - `src/`: Lógica central para ler diretórios, gerenciar navegação, executar quizzes e exibir comandos.
   - `content/tutorials/`: Contém os 10 arquivos `.md` cobrindo os principais tópicos de Git.
   - `content/quizzes/`: Contém os 10 arquivos `.json` correspondentes (exatamente 5 perguntas de múltipla escolha por módulo).

2. **Comandos Principais da CLI:**
   - `tq-git list`: Lista todos os 10 módulos disponíveis indicando seus tutoriais e quizzes correspondentes.
   - `tq-git tutorial <modulo>` ou navegação interativa: Exibe o conteúdo do tutorial formatado de forma limpa no terminal (utilizando bibliotecas como `marked-terminal` ou `cli-markdown`).
   - `tq-git quiz <modulo>`: Inicia um questionário interativo de 5 perguntas para o módulo selecionado, contabiliza acertos e mostra a pontuação final.
   - `tq-git pix`: Exibe uma mensagem de agradecimento ao desenvolvedor junto com a chave PIX e sugestões de valores de doação.
   - `tq-git help`: Exibe o painel de ajuda com todos os comandos disponíveis.

3. **Detalhes do Comando `pix`:**
   Deve exibir exatamente as seguintes informações formatadas com estilo no terminal:
   - **Desenvolvedor:** João Paulo Sena Padilha
   - **Chave PIX (E-mail):** `joaopaulojpsp@gmail.com`
   - **Mensagem:** "Gostou da ferramenta e quer apoiar o desenvolvedor? Considere fazer uma doação via PIX!"
   - **Sugestões de valores:** R$ 5,00 | R$ 10,00 | R$ 20,00

---

## 2. Conteúdo dos 10 Módulos (Tutoriais em Markdown e Quizzes em JSON)

Abaixo estão especificados os 10 tópicos de Git que devem ser gerados em arquivos físicos dentro da estrutura do projeto. Cada tutorial deve ser robusto (aproximadamente 500 palavras) e cada quiz deve conter exatamente 5 questões de múltipla escolha.

### Lista dos 10 Módulos:
1. `01-config-init` — Configuração Inicial e `git init`
2. `02-ciclo-vida` — Ciclo de Vida dos Arquivos (`git add` e `git status`)
3. `03-historico-commits` — Histórico e Registros (`git log` e `git commit`)
4. `04-branching` — Ramificações (`git branch` e `git switch` / `checkout`)
5. `05-merges` — Fusão de Ramos (`git merge`)
6. `06-conflitos` — Resolução de Conflitos de Merge
7. `07-remotes` — Trabalho Remoto (`git remote`, `push`, `pull`, `fetch`)
8. `08-desfazendo-erros` — Desfazendo Alterações (`git reset` e `git revert`)
9. `09-rebase-stash` — Organização Avançada (`git stash` e `git rebase`)
10. `10-workflows` — Boas Práticas e Fluxos de Trabalho

---

## 3. Especificação dos Arquivos de Conteúdo

### Exemplo de Estrutura de Arquivo de Tutorial (`content/tutorials/01-config-init.md`)
*(O desenvolvedor deve gerar 10 arquivos `.md` detalhados, cada um com cerca de 500 palavras cobrindo conceitos teóricos, exemplos de código e explicações passo a passo).*

### Exemplo de Estrutura de Arquivo de Quiz (`content/quizzes/01-config-init.json`)
Cada arquivo JSON de quiz deve conter um array com exatamente 5 objetos no seguinte formato:

```json
[
  {
    "id": 1,
    "question": "Qual comando é utilizado para inicializar um novo repositório Git em uma pasta local?",
    "options": [
      "git start",
      "git init",
      "git new",
      "git create"
    ],
    "correct": 1,
    "explanation": "O comando 'git init' cria um novo subdiretório .git na pasta atual, inicializando um repositório vazio."
  },
  {
    "id": 2,
    "question": "Como você configura seu nome de usuário globalmente no Git?",
    "options": [
      "git config --global user.name "Seu Nome"",
      "git set-user "Seu Nome"",
      "git user.name = "Seu Nome"",
      "git profile --name "Seu Nome""
    ],
    "correct": 0,
    "explanation": "A flag '--global' salva a configuração no arquivo ~/.gitconfig para todos os repositórios da sua máquina."
  },
  {
    "id": 3,
    "question": "Onde as configurações locais de um repositório específico (que sobrepõem as globais) são armazenadas?",
    "options": [
      "No diretório raiz do sistema operacional",
      "Dentro da pasta oculta .git/config do repositório",
      "No arquivo package.json",
      "Na pasta temporária do usuário"
    ],
    "correct": 1,
    "explanation": "As configurações locais ficam salvas em `.git/config` dentro do próprio repositório."
  },
  {
    "id": 4,
    "question": "Qual comando permite verificar o e-mail global configurado atualmente?",
    "options": [
      "git show email",
      "git config user.email",
      "git config --global user.email",
      "git get-email"
    ],
    "correct": 2,
    "explanation": "Executar 'git config --global user.email' retorna o e-mail gravado globalmente."
  },
  {
    "id": 5,
    "question": "O que o comando 'git clone <url>' faz além de baixar o código?",
    "options": [
      "Apenas faz o download dos arquivos compactados",
      "Baixa o repositório remoto, cria o diretório local e já inicializa o vínculo (.git) com o remoto",
      "Faz o deploy automático para um servidor de produção",
      "Apaga o repositório remoto original"
    ],
    "correct": 1,
    "explanation": "O 'git clone' copia todo o histórico, cria a pasta de trabalho e configura automaticamente o remote padrão chamado 'origin'."
  }
]
```

---

## 4. Requisitos de Implementação em Node.js

Para executar este projeto com sucesso, utilize as seguintes bibliotecas recomendadas:
- **`commander`**: Para gerenciar os argumentos da CLI (`list`, `tutorial`, `quiz`, `pix`, `help`).
- **`inquirer`** ou **`readline-sync`**: Para a interface interativa dos quizzes e seleção de módulos.
- **`chalk`**: Para estilizar as cores no terminal (destacando títulos, acertos, erros e o comando PIX).
- **`marked`** e **`marked-terminal`**: Para renderizar os arquivos Markdown diretamente na tela do terminal com formatação rica.

Implemente a lógica modular e crie todos os arquivos de conteúdo necessários para que o usuário possa instalar e executar a ferramenta globalmente via `npm install -g .` ou executando diretamente via `npx`.
