# Módulo 07: Trabalho Remoto (`git remote`, `push`, `pull`, `fetch`)

O Git é um sistema **distribuído**, o que significa que cada colaborador possui uma cópia integral do repositório em sua máquina local. Para compartilhar alterações com outros membros do time e sincronizar com servidores como GitHub, GitLab ou Bitbucket, utilizamos os comandos de interação remota.

---

## 1. Gerenciando Remotes: `git remote`

Um *remote* é apenas um atalho/apelido para a URL de um repositório hospedado na nuvem ou em um servidor da sua rede. Por convenção, o repositório principal é chamado de **`origin`**.

```bash
# Listar os remotes configurados e suas URLs de busca e envio
git remote -v

# Adicionar um novo repositório remoto ao seu projeto local
git remote add origin https://github.com/usuario/meu-projeto.git

# Renomear um remote existente
git remote rename origin upstream

# Remover a associação com um remote
git remote remove upstream
```

---

## 2. Enviando Commits: `git push`

Para publicar seus commits locais na branch correspondente do repositório remoto:

```bash
# Primeiro push de uma branch nova: configura o vínculo de rastreamento (-u)
git push -u origin main

# Pushes subsequentes na mesma branch já vinculada:
git push

# Enviar tags anotadas para o servidor
git push origin --tags

# Excluir uma branch remota
git push origin --delete feature-antiga
```

> **Por que usar `-u` (`--set-upstream`)?**
> A flag `-u` cria uma ligação permanente entre a branch local e a branch remota (`origin/main`). Nas próximas vezes, bastará digitar `git push` ou `git pull` sem especificar o remote ou a branch.

---

## 3. Baixando Atualizações: `git fetch` vs `git pull`

Muitos desenvolvedores confundem esses dois comandos fundamentais. Compreender a diferença evita merges indesejados no seu fluxo de trabalho:

### `git fetch` (Seguro e Informativo)
O `git fetch` conecta ao servidor remoto e baixa todos os novos commits, tags e branches que outros desenvolvedores publicaram, mas **NÃO altera nem mescla nada no seu código de trabalho**.

Ele atualiza suas referências remotas locais (ex: `origin/main`). Você pode inspecionar o que mudou com total segurança:
```bash
git fetch origin
git log HEAD..origin/main --oneline
```

### `git pull` (Download + Integração Automática)
O `git pull` é na verdade um atalho composto por dois comandos sequenciais:
1. `git fetch` (baixa as novidades do remote)
2. `git merge origin/<branch>` (mescla imediatamente as alterações na sua branch atual)

```bash
# Puxar e mesclar na branch atual
git pull

# Boa prática profissional: puxar aplicando rebase em vez de gerar commits de merge vazios
git pull --rebase
```

---

## 4. Resumo Comparativo

| Comando | O que faz no disco local? |
| :--- | :--- |
| `git remote -v` | Mostra as URLs configuradas |
| `git push -u origin <branch>` | Publica commits locais no servidor e cria rastreamento |
| `git fetch` | Baixa novidades sem tocar nos arquivos do seu projeto |
| `git pull` | Baixa novidades E funde automaticamente no seu código |
| `git pull --rebase` | Baixa novidades e reaplica seus commits no topo da linha |
