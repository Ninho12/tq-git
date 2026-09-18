# Módulo 10: Boas Práticas e Fluxos de Trabalho em Equipe

Dominar comandos individuais do Git é apenas metade da jornada. No ambiente profissional, o sucesso de um time depende de como os desenvolvedores se organizam em torno de um **fluxo de trabalho (workflow)** padronizado e de uma cultura de qualidade no código.

---

## 1. Os Três Grandes Fluxos de Trabalho da Indústria

### 1. Gitflow Workflow (Projetos Tradicionais com Ciclos de Release)
Criado por Vincent Driessen, é um modelo altamente estruturado baseado em papéis rigorosos para cada branch:
- **`main`**: Reflete sempre o código em produção. Só recebe commits via tags de versão e merges de releases/hotfixes.
- **`develop`**: Branch central de integração de novas funcionalidades.
- **`feature/*`**: Ramificações criadas a partir de `develop` para trabalhar em novas features.
- **`release/*`**: Branches preparatórias para homologação e congelamento antes do lançamento em produção.
- **`hotfix/*`**: Branches de emergência criadas diretamente a partir de `main` para corrigir falhas graves em produção sem esperar o próximo ciclo.

### 2. GitHub Flow (Ágil, Simples e Contínuo)
Ideal para aplicações web modernas, microsserviços e ambientes com **Continuous Deployment (CD)**:
1. Qualquer coisa na branch `main` está pronta para ser implantada em produção a qualquer momento.
2. Para trabalhar em algo novo, crie uma branch descritiva a partir da `main` (ex: `add-dark-mode`).
3. Envie commits regularmente para o repositório remoto.
4. Abra um **Pull Request (PR)** para solicitar feedback e revisão da equipe.
5. Após aprovação de código e aprovação nos testes automáticos (CI), faça o merge na `main` e realize o deploy imediato.

### 3. Trunk-based Development (DevOps de Alta Performance)
Adotado por gigantes de tecnologia (como Google e Meta). Todos os desenvolvedores integram código com frequência (várias vezes ao dia) diretamente na branch principal (*trunk*), utilizando branches muito curtas (menos de um dia) e técnicas como **Feature Flags (Feature Toggles)** para esconder funcionalidades incompletas dos usuários.

---

## 2. Etiqueta e Boas Práticas em Pull Requests

Um bom Pull Request acelera o Code Review e reduz falhas:
- **Mantenha o PR pequeno:** PRs com menos de 300 linhas de código recebem revisões 3x mais criteriosas e são aprovados muito mais rápido.
- **Título claro e descrição rica:** Explique **o que** foi feito, **por que** foi feito e **como testar**.
- **Adicione evidências visuais:** Screenshots ou GIFs de antes e depois ajudam os revisores a validar a interface.
- **Garanta que o CI passe antes de solicitar revisão:** Não faça seus colegas perderem tempo com erros de lint ou testes quebrados.

---

## 3. Versionamento Semântico e Tags: `git tag`

No Git, uma **tag** é uma marcação fixa e imutável que aponta para um commit específico, utilizada para marcar versões oficiais de lançamento (releases).

O padrão da indústria é o **Semantic Versioning (SemVer)**: `vMAJOR.MINOR.PATCH`
- **MAJOR:** Mudanças incompatíveis com versões anteriores (breaking changes).
- **MINOR:** Novas funcionalidades mantendo compatibilidade retroativa.
- **PATCH:** Correções de bugs sem adicionar novas funcionalidades.

```bash
# Criar uma tag anotada com mensagem
git tag -a v1.0.0 -m "Release da primeira versão pública estável"

# Listar as tags existentes
git tag

# Enviar as tags para o servidor remoto
git push origin --tags
```
