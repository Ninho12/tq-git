# Módulo 01: Configuração Inicial e Criação de Repositórios (`git init`)

O **Git** é um sistema de controle de versão distribuído (DVCS) projetado para rastrear alterações em arquivos de código ao longo do tempo. Antes de salvar qualquer linha de histórico, é fundamental configurar sua identidade e entender como um diretório comum se transforma em um repositório Git.

---

## 1. Configurando sua Identidade de Desenvolvedor

Sempre que você cria um *commit* (ponto de salvamento no histórico), o Git vincula permanentemente seu nome e e-mail a esse registro. Isso garante auditoria, rastreabilidade e autoria em projetos individuais e colaborativos.

As configurações do Git operam em três escopos principais:
- **`--system`**: Aplica-se a todos os usuários da máquina do sistema operacional.
- **`--global`**: Aplica-se a todos os repositórios do seu usuário atual (salvo em `~/.gitconfig`).
- **`--local`**: Aplica-se exclusivamente ao repositório no qual você está no momento (salvo em `.git/config`).

### Comandos de Configuração Essenciais:
```bash
# Definir seu nome globalmente
git config --global user.name "Seu Nome Completo"

# Definir seu e-mail globalmente (deve ser o mesmo da sua conta GitHub/GitLab)
git config --global user.email "seu.email@exemplo.com"

# Definir a branch padrão inicial para 'main'
git config --global init.defaultBranch main

# Definir o VS Code como editor de texto padrão do Git
git config --global core.editor "code --wait"
```

Para verificar todas as configurações ativas e suas origens:
```bash
git config --list --show-origin
```

---

## 2. Inicializando um Repositório: `git init`

Transformar uma pasta qualquer em um repositório Git é um processo instantâneo e não destrutivo. 

Navegue até a pasta do seu projeto e execute:
```bash
git init
```

### O que acontece nos bastidores?
O comando cria um subdiretório oculto chamado `.git/`. Essa pasta é o "coração" do Git. Nela residem:
- **`HEAD`**: Arquivo apontando para a branch ativa no momento.
- **`config`**: Configurações locais exclusivas daquele repositório.
- **`objects/`**: Banco de dados de objetos (blobs, árvores e commits).
- **`refs/`**: Ponteiros para branches (`refs/heads/`) e tags (`refs/tags/`).
- **`index`**: A área de preparação (*staging area*), que registra os arquivos prontos para o próximo commit.

> **Importante:** Nunca apague ou edite manualmente os arquivos dentro da pasta `.git` a menos que saiba exatamente o que está fazendo, pois ela armazena todo o histórico do projeto.

---

## 3. Clonando Repositórios Existentes: `git clone`

Caso o projeto já exista remotamente (no GitHub, GitLab, etc.), você não precisa rodar `git init`. Em vez disso, utiliza o comando `clone`:

```bash
git clone https://github.com/usuario/repositorio.git
```

O `git clone` realiza três operações fundamentais automaticamente:
1. Cria uma nova pasta com o nome do repositório.
2. Faz o download completo de todos os commits, branches e tags.
3. Cria a pasta `.git` já vinculada ao repositório remoto sob o alias padrão chamado `origin`.

---

## 4. Resumo Rápido e Boas Práticas

| Comando | Função |
| :--- | :--- |
| `git config --global user.name "Nome"` | Define o autor dos commits para toda a máquina |
| `git config --global user.email "email"` | Define o e-mail do autor |
| `git init` | Inicializa o versionamento na pasta atual |
| `git clone <url>` | Clona um repositório remoto completo |
| `git config --list` | Inspeciona as variáveis configuradas |

**Dica de ouro:** Configure sempre a chave SSH ou Personal Access Token (PAT) na sua plataforma de hospedagem para não precisar digitar senhas a cada interação remota.
