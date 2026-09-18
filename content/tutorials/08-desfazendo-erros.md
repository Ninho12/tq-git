# Módulo 08: Desfazendo Alterações (`git reset` e `git revert`)

Errar faz parte do desenvolvimento de software. Um dos maiores superpoderes do Git é a sua capacidade cirúrgica de desfazer alterações em qualquer nível: antes de salvar na Staging Area, depois do `git add`, ou mesmo após commits já concluídos.

---

## 1. Desfazendo Alterações Locais com `git restore`

No Git moderno (versão 2.23+), o comando **`git restore`** foi criado para substituir os usos confusos do antigo `git checkout`:

```bash
# 1. Descartar alterações de um arquivo no diretório de trabalho (volta ao último commit)
git restore index.js

# 2. Descartar alterações em todos os arquivos da pasta atual
git restore .

# 3. Tirar um arquivo da Staging Area (desfazer o git add) mantendo o código no editor
git restore --staged index.js
```

---

## 2. Rebobinando o Histórico: `git reset`

O comando `git reset` move o ponteiro da branch atual para trás no histórico, alterando o passado. Ele possui três modos fundamentais:

```
+----------------+------------------+-----------------+-----------------------+
| Modo de Reset  | Move o HEAD?     | Altera Staging? | Altera Working Tree?  |
+----------------+------------------+-----------------+-----------------------+
| --soft         | SIM              | NÃO             | NÃO (mantém no editor)|
| --mixed (padrão)| SIM             | SIM (esvazia)   | NÃO (mantém no editor)|
| --hard         | SIM              | SIM             | SIM (destrói edições) |
+----------------+------------------+-----------------+-----------------------+
```

### Exemplos Práticos:
```bash
# --soft: Desfaz o último commit, mas deixa tudo pronto na Staging Area
# Útil para corrigir a mensagem ou adicionar um detalhe esquecido
git reset --soft HEAD~1

# --mixed (comportamento padrão): Desfaz o commit e tira do Staging
# O código continua intacto nos seus arquivos no editor
git reset HEAD~1

# --hard: CUIDADO! Apaga o commit E todas as modificações nos arquivos
# Restaura o projeto exatamente como estava no commit de destino
git reset --hard HEAD~1
```

> **Aviso Crítico:** `git reset --hard` é uma das poucas operações no Git que pode causar perda permanente de código não salvo. Use com extrema cautela!

---

## 3. Desfazendo em Branches Públicas: `git revert`

Se um commit com bug já foi enviado com `git push` para um repositório compartilhado com outros desenvolvedores (como a branch `main`), **nunca use `git reset`**, pois reescrever o histórico compartilhado quebra o repositório dos seus colegas.

A solução profissional e segura é o **`git revert`**:
```bash
git revert <hash-do-commit>
```

### Como o `git revert` opera?
Em vez de apagar o commit do passado, ele cria um **novo commit para a frente** que aplica exatamente as alterações inversas (se você adicionou uma linha, ele a apaga; se apagou, ele a recria). O histórico permanece íntegro e a auditoria preservada.

---

## 4. O Salva-Vidas Supremo: `git reflog`

Se você acidentalmente rodou um `git reset --hard` e perdeu commits importantes, nem tudo está perdido! O comando `git reflog` grava cada movimento do ponteiro HEAD na sua máquina local nos últimos 30 a 90 dias:

```bash
git reflog
# Localize o hash antes do desastre (ex: abc1234)
git reset --hard abc1234
```
Esse comando resgata commits órfãos e devolve a tranquilidade ao desenvolvedor.
