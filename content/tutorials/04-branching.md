# Módulo 04: Ramificações (`git branch` e `git switch` / `checkout`)

O sistema de ramificações (*branching*) é um dos recursos mais poderosos e eficientes do Git. Diferente de outros sistemas de controle de versão onde criar uma branch implica duplicar pastas inteiras de código, no Git uma branch é apenas um **ponteiro móvel e leve de 41 bytes** que aponta para um commit específico.

---

## 1. O que é uma Branch e o que é o HEAD?

- **Branch:** É uma linha independente de desenvolvimento. Quando você cria novos commits, o ponteiro da branch ativa avança automaticamente para o novo commit.
- **HEAD:** É um ponteiro especial interno do Git que indica em qual branch (e commit) o seu diretório de trabalho está posicionado atualmente.

```
                    [feature-login] ◄─── HEAD
                          │
                          ▼
(commit C1) ──► (commit C2) ──► (commit C3)
                  ▲
                  │
                [main]
```

No diagrama acima, `HEAD` aponta para a branch `feature-login`, que por sua vez aponta para o commit `C3`. A branch `main` continua apontando para `C2`.

---

## 2. Trabalhando com Branches

### Listando Branches Existentes:
```bash
# Lista branches locais (* indica onde o HEAD está)
git branch

# Lista branches locais e remotas
git branch -a

# Exibe o último commit de cada branch
git branch -v
```

### Criando Novas Branches:
```bash
# Cria uma branch chamada 'feature-auth' a partir do ponto atual
git branch feature-auth
```

---

## 3. Alternando entre Branches: `git switch` vs `git checkout`

Historicamente, o comando `git checkout` era sobrecarregado: servia tanto para trocar de branch quanto para descartar alterações de arquivos. A partir da versão 2.23 do Git, foi introduzido o comando **`git switch`**, dedicado exclusivamente à navegação de branches.

```bash
# Alternar para uma branch existente
git switch feature-auth

# Criar e alternar para a nova branch em um único passo
git switch -c feature-pagamento

# Voltar rapidamente para a branch anterior em que você estava
git switch -
```

*(Caso você veja projetos legados ou tutoriais antigos, o equivalente clássico é `git checkout -b feature-pagamento`).*

---

## 4. Renomeando e Excluindo Branches

Quando uma funcionalidade é concluída e integrada com sucesso, é boa prática excluir a branch temporária para manter o repositório limpo.

```bash
# Excluir branch com segurança (o Git avisa se ela tiver commits não mesclados)
git branch -d feature-auth

# Forçar a exclusão de uma branch (mesmo com commits pendentes)
git branch -D feature-teste-abandonado

# Renomear a branch atual
git branch -m novo-nome-da-branch
```

> **Atenção:** Você nunca pode excluir a branch na qual está atualmente posicionado. Mude para a `main` antes de deletar a branch de trabalho.
