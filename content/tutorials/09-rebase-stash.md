# Módulo 09: Organização Avançada (`git stash` e `git rebase`)

Conforme você evolui no uso do Git, surgem cenários do dia a dia onde você precisa pausar o trabalho atual para corrigir uma emergência em outra branch, ou precisa limpar e organizar seus commits locais antes de submeter um Pull Request. É aqui que entram duas ferramentas avançadas: o **Git Stash** e o **Git Rebase**.

---

## 1. O Depósito Temporário: `git stash`

Imagine que você está no meio de uma funcionalidade grande, com vários arquivos modificados e incompletos. De repente, surge um bug crítico em produção que precisa ser consertado imediatamente na branch `main`.

Se você tentar trocar de branch com arquivos sujos, o Git impedirá a troca para evitar conflitos. Criar um commit com código quebrado ("wip") também não é boa prática.

A solução ideal é o `git stash`: ele pega todas as suas alterações não commitadas e as guarda em uma gaveta temporária, deixando seu diretório de trabalho 100% limpo.

### Comandos do Stash:
```bash
# Guardar alterações com uma mensagem descritiva
git stash save "WIP: funcionalidade do carrinho de compras"

# Guardar incluindo arquivos novos não rastreados (untracked)
git stash -u

# Listar todas as gavetas salvas no stash
git stash list

# Recuperar o último stash salvo e removê-lo da gaveta
git stash pop

# Aplicar o stash mantendo uma cópia salva na gaveta
git stash apply stash@{0}

# Excluir uma gaveta específica ou limpar todo o stash
git stash drop stash@{0}
git stash clear
```

---

## 2. Linearizando o Histórico: `git rebase`

O comando `git rebase` é uma alternativa ao `git merge` para integrar alterações entre branches. Enquanto o merge une dois ramos criando um commit de fusão, o rebase **desconecta seus commits da branch atual e os reaplica um a um no topo da outra branch**, criando um histórico estritamente linear e sem ramificações.

```
Antes do Rebase:
main:     C1 ──► C2 ──► C3
                  \
feature:           C4 ──► C5

Após executar (em feature) 'git rebase main':
main:     C1 ──► C2 ──► C3
                          \
feature:                   C4' ──► C5' (novos hashes)
```

---

## 3. Rebase Interativo: O Esculpidor de Histórico (`git rebase -i`)

O rebase interativo permite limpar e reescrever commits locais antes de compartilhar seu código com o time:

```bash
# Abrir os últimos 3 commits para edição interativa
git rebase -i HEAD~3
```

O Git abrirá seu editor com uma lista de comandos disponíveis para cada commit:
- **`pick`**: Mantém o commit como está.
- **`reword`**: Mantém o commit, mas permite reescrever a mensagem.
- **`edit`**: Pausa no commit para permitir alterar arquivos ou quebrá-lo em vários.
- **`squash`**: Combina o commit com o anterior e une as mensagens.
- **`fixup`**: Combina o commit com o anterior descartando a mensagem do segundo.
- **`drop`**: Remove o commit do histórico.

---

## 4. A Regra de Ouro do Rebase

> **REGRA DE OURO:** NUNCA faça rebase em branches públicas ou compartilhadas (como `main` ou `develop`).

O rebase recria novos commits com novos hashes criptográficos. Se você rebasear uma branch que outros desenvolvedores já clonaram, criará um histórico divergente e causará um pesadelo de sincronização para toda a equipe. Use rebase exclusivamente em branches locais e privadas!
