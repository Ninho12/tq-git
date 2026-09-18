# Módulo 02: Ciclo de Vida dos Arquivos (`git add` e `git status`)

Compreender o ciclo de vida dos arquivos é a base de todo o fluxo de trabalho no Git. Ao contrário de ferramentas simples de backup que apenas copiam arquivos, o Git trabalha com um sistema de estados e uma área intermediária fundamental chamada **Staging Area** (ou *Index*).

---

## 1. As Três Áreas do Git

O Git divide seus arquivos em três áreas conceituais:
1. **Working Directory (Diretório de Trabalho):** Os arquivos reais que você visualiza e edita no seu editor de código.
2. **Staging Area (Área de Preparação):** O palco onde você seleciona e organiza as alterações exatas que farão parte do próximo commit.
3. **Git Repository (Repositório / Banco de Dados):** Onde os commits são gravados de forma permanente e imutável.

---

## 2. Os Quatro Estados dos Arquivos

Cada arquivo dentro da pasta do projeto pode estar em um de quatro estados:

```
                  ┌─────────────── git add ───────────────┐
                  ▼                                       │
 [Untracked] ─────────► [Staged] ◄─── git add ─── [Modified]
                          │                           ▲
                      git commit                      │
                          │                        (edição)
                          ▼                           │
                    [Unmodified] ─────────────────────┘
```

1. **Untracked (Não rastreado):** Arquivo novo que existe no seu diretório de trabalho, mas o Git ainda não monitora.
2. **Unmodified (Não modificado):** Arquivo que já faz parte do último commit e não sofreu nenhuma alteração desde então.
3. **Modified (Modificado):** Arquivo rastreado que sofreu alterações no diretório de trabalho, mas cujas mudanças ainda não foram para o Staging.
4. **Staged (Preparado):** Arquivo cujas modificações foram marcadas com `git add` para serem incluídas no próximo commit.

---

## 3. Comandos Práticos

### Inspecionando o Estado: `git status`
O comando `git status` é seu melhor amigo no terminal. Ele informa em qual branch você está, quais arquivos estão modificados, quais estão em stage e quais não estão rastreados.

```bash
# Status detalhado
git status

# Status compacto (muito útil no dia a dia)
git status -s
```

### Adicionando Arquivos ao Staging: `git add`
Para mover alterações do diretório de trabalho para a Staging Area:

```bash
# Adicionar um arquivo específico
git add index.js

# Adicionar múltiplos arquivos
git add app.js styles.css

# Adicionar todos os arquivos novos e modificados da pasta atual
git add .

# Adicionar partes interativas de um arquivo (hunk por hunk)
git add -p arquivo.js
```

### Inspecionando Diferenças: `git diff`
Para ver exatamente o que mudou linha por linha:
```bash
# Compara o diretório de trabalho com a Staging Area
git diff

# Compara a Staging Area com o último commit registrado
git diff --staged
```

---

## 4. O Arquivo `.gitignore`

Nem todo arquivo do seu projeto deve ir para o repositório. Arquivos de compilação, dependências pesadas (`node_modules`), variáveis de ambiente secretas (`.env`) e logs devem ser ignorados.

Crie um arquivo chamado `.gitignore` na raiz:
```gitignore
# Ignorar dependências do Node
node_modules/

# Ignorar segredos e variáveis de ambiente
.env
.env.local

# Ignorar logs do sistema
*.log
npm-debug.log*

# Ignorar pastas de build
dist/
build/
```

O Git deixará de listar esses arquivos no `git status` e impedirá que sejam adicionados acidentalmente.
