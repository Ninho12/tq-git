# Módulo 03: Histórico e Registros (`git log` e `git commit`)

No Git, um **commit** não é simplesmente uma lista de diferenças (*diff*), mas sim um **instantâneo completo (snapshot)** de todo o projeto naquele exato momento no tempo. Entender como registrar commits com clareza e navegar pelo histórico é indispensável para qualquer desenvolvedor profissional.

---

## 1. Criando Commits com `git commit`

Após preparar as modificações na Staging Area com `git add`, consolidamos o estado do projeto utilizando o comando `git commit`:

```bash
# Commit com mensagem curta inline
git commit -m "feat: adiciona validação de formulário de login"

# Abrir o editor de texto configurado para escrever mensagem longa
git commit

# Atalho: adicionar modificações de arquivos já rastreados E commitar juntos
git commit -am "fix: corrige espaçamento do cabeçalho"
```
> **Nota:** A flag `-a` só funciona para arquivos que já estavam sendo rastreados pelo Git. Arquivos novos (*untracked*) ainda exigem `git add`.

---

## 2. Anatomia de um Commit

Cada commit criado no Git gera um objeto imutável que contém:
- **Hash SHA-1 (ou SHA-256):** Um identificador criptográfico único de 40 caracteres hexadecimais (ex: `a1b2c3d4e5f6...`).
- **Tree (Árvore de Diretórios):** O ponteiro para a estrutura de arquivos e pastas gravada.
- **Ponteiro(s) para o Pai (Parent):** O hash do commit anterior (ou dos pais, no caso de merges).
- **Metadados:** Nome e e-mail do autor, data e hora da criação e do registro.
- **Mensagem:** A descrição textual do que foi alterado e o porquê.

---

## 3. Boas Práticas: Commits Atômicos e Conventional Commits

Um commit de qualidade deve ser **atômico**: ele resolve um único problema ou adiciona uma única funcionalidade completa que pode ser revertida sem quebrar outras partes do código.

O padrão **Conventional Commits** é amplamente utilizado na indústria:
- `feat:` Nova funcionalidade para o usuário.
- `fix:` Correção de um bug.
- `docs:` Alterações apenas em documentação.
- `style:` Formatação de código que não altera lógica (espaços, ponto e vírgula).
- `refactor:` Refatoração de código que não altera comportamento externo.
- `test:` Adição ou correção de testes automatizados.
- `chore:` Tarefas de manutenção e dependências.

---

## 4. Inspecionando o Histórico com `git log`

O comando `git log` oferece recursos avançados para navegar no passado do repositório:

```bash
# Histórico simples paginado
git log

# Histórico resumido em uma linha por commit com hash curto
git log --oneline

# Visualização gráfica das ramificações e merges
git log --oneline --graph --all --decorate

# Exibir os últimos N commits com estatísticas de linhas alteradas
git log -n 5 --stat

# Filtrar commits por autor ou por período
git log --author="João" --since="2 weeks ago"

# Buscar commits que alteraram uma palavra ou função específica
git log -S "loginUser"
```

### Inspecionando um Commit Específico: `git show`
Para inspecionar detalhadamente um único commit pelo seu hash:
```bash
git show a1b2c3d
```
O comando exibirá o autor, a data, a mensagem completa e o diff linha por linha das alterações daquele commit.
