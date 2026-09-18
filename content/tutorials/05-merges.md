# Módulo 05: Fusão de Ramos (`git merge`)

Depois de desenvolver uma funcionalidade ou correção de bug em uma branch isolada, chega o momento de incorporar essas alterações de volta à linha principal do projeto (geralmente a branch `main`). Esse processo de integração é chamado de **Merge**.

---

## 1. Como Funciona o `git merge`

Para realizar o merge, você deve primeiro se posicionar na branch de destino (aquela que receberá as alterações) e então executar o comando indicando a branch de origem:

```bash
# 1. Trocar para a branch receptora
git switch main

# 2. Mesclar as alterações da branch de funcionalidade
git merge feature-login
```

O Git analisa o histórico dos dois ramos procurando o seu **ancestral comum mais recente (base commit)** e decide qual estratégia de integração aplicar.

---

## 2. As Duas Principais Estratégias de Merge

### 1. Fast-Forward Merge
Acontece quando a branch de destino (`main`) não recebeu nenhum commit novo desde que a branch de trabalho (`feature`) foi criada. A história é estritamente linear.

- **Comportamento:** O Git não precisa criar um novo commit de fusão. Ele simplesmente move o ponteiro da `main` para frente até o último commit da `feature`.
- **Vantagem:** Histórico limpo, sequencial e sem commits extras desnecessários.

```
Antes do Merge:
main:     C1 ──► C2
                  \
feature:           C3 ──► C4

Após Fast-Forward:
main & feature: C1 ──► C2 ──► C3 ──► C4
```

### 2. Three-Way Merge (Merge Commit)
Acontece quando tanto a branch de destino quanto a branch de trabalho receberam commits novos de forma concorrente (o histórico divergiu).

- **Comportamento:** O Git combina três instantâneos: o ancestral comum (base), o último commit da `main` e o último commit da `feature`. Se não houver edições conflitantes nas mesmas linhas, o Git cria automaticamente um **commit de merge**, que tem **dois commits pais**.

```
Antes do Merge:
main:     C1 ──► C2 ──► C5
                  \
feature:           C3 ──► C4

Após o Three-Way Merge:
main:     C1 ──► C2 ──► C5 ──────► M (Merge Commit)
                  \              /
feature:           C3 ──► C4 ───┘
```

---

## 3. Flags Avançadas de Merge

- **`git merge --no-ff <branch>`**: Força a criação de um commit de merge mesmo que um Fast-Forward seja possível. É muito usado em equipes para preservar a memória visual de que aquele conjunto de commits pertenceu a uma feature específica.
- **`git merge --squash <branch>`**: Condensa todos os commits da branch de feature em um único bloco de alterações na Staging Area, pronto para ser commitado na `main` em uma única tacada. É ideal para limpar histórico poluído por dezenas de commits pequenos ("wip", "teste").
- **`git merge --abort`**: Se você iniciar um merge e algo der errado antes de concluir, esse comando cancela tudo e restaura o repositório exatamente ao estado anterior.
