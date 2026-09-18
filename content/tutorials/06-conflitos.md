# Módulo 06: Resolução de Conflitos de Merge

Conflitos de merge costumam assustar quem está começando no Git, mas eles são perfeitamente normais em qualquer time de desenvolvimento. Um conflito não é um bug nem um erro do sistema: é o Git avisando com responsabilidade que duas alterações concorrentes modificaram o mesmo trecho de um arquivo e que uma decisão humana é necessária.

---

## 1. Por que os Conflitos Acontecem?

O Git consegue mesclar a grande maioria dos arquivos de forma 100% automática, mesmo que vários desenvolvedores estejam editando o mesmo arquivo em linhas diferentes.

Um conflito só é disparado quando:
1. Dois commits em ramos diferentes modificaram **as mesmas linhas de código** com conteúdos diferentes.
2. Um desenvolvedor editou um arquivo enquanto outro o excluiu ou o renomeou.

Quando isso acontece, o Git pausa a operação de merge e sinaliza os arquivos conflitantes no `git status` como `both modified`.

---

## 2. Anatomia dos Marcadores de Conflito

Ao abrir o arquivo conflitante no seu editor, você verá delimitadores especiais inseridos pelo Git:

```javascript
<<<<<<< HEAD
// Este é o código que já existia na sua branch atual (ex: main)
const PORT = process.env.PORT || 3000;
=======
// Este é o código vindo da branch que você está tentando mesclar (ex: feature-server)
const PORT = 8080;
>>>>>>> feature-server
```

### Decodificando os Marcadores:
- **`<<<<<<< HEAD`**: Marca o início do bloco com a versão da branch onde você está posicionado.
- **`=======`**: O divisor central que separa as duas versões concorrentes.
- **`>>>>>>> <nome-da-branch>`**: Marca o fim do trecho conflitante com o nome ou hash da branch de origem.

---

## 3. O Passo a Passo Definitivo para Resolver Conflitos

Resolver um conflito consiste em 4 etapas simples e metódicas:

### Passo 1: Identificar os Arquivos Afetados
Execute `git status` para listar quais arquivos estão marcados como não mesclados (*Unmerged paths*).

### Passo 2: Decidir e Editar o Código
Abra cada arquivo no seu editor de código (como o VS Code, que oferece botões como *"Accept Current Change"*, *"Accept Incoming Change"* ou *"Accept Both"*).
Remova **todos** os marcadores do Git (`<<<<<<<`, `=======`, `>>>>>>>`) e deixe o arquivo exatamente com a sintaxe final correta que deve ser preservada.

### Passo 3: Testar a Solução
Execute seus testes automatizados ou execute o projeto localmente para garantir que a resolução não quebrou nenhuma funcionalidade adjacente.

### Passo 4: Marcar como Resolvido e Concluir
```bash
# Adicionar os arquivos corrigidos à Staging Area
git add server.js

# Finalizar o merge criando o commit de resolução
git commit -m "fix(merge): resolve conflitos de configuração de porta do servidor"

# Alternativamente no Git moderno:
git merge --continue
```

> **Dica de sobrevivência:** Se você se complicou durante a resolução e quer recomeçar do zero com segurança, execute `git merge --abort`. O Git cancelará tudo e restaurará os arquivos como estavam antes.
