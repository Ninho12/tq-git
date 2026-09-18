export const MODULES = [
  {
    id: 1,
    slug: '01-config-init',
    title: 'Configuração Inicial e git init',
    description: 'Configurando identidade (user.name, user.email), editor padrão e inicializando novos repositórios.',
    tutorialFile: '01-config-init.md',
    quizFile: '01-config-init.json',
    aliases: ['1', '01', 'config', 'init', 'config-init']
  },
  {
    id: 2,
    slug: '02-ciclo-vida',
    title: 'Ciclo de Vida dos Arquivos (git add e git status)',
    description: 'Os 4 estados dos arquivos no Git: Untracked, Unmodified, Modified e Staged, e uso do .gitignore.',
    tutorialFile: '02-ciclo-vida.md',
    quizFile: '02-ciclo-vida.json',
    aliases: ['2', '02', 'ciclo', 'status', 'add', 'ciclo-vida']
  },
  {
    id: 3,
    slug: '03-historico-commits',
    title: 'Histórico e Registros (git log e git commit)',
    description: 'Criação de commits semânticos, mensagens claras, flags de inspeção do git log e estrutura de hashes.',
    tutorialFile: '03-historico-commits.md',
    quizFile: '03-historico-commits.json',
    aliases: ['3', '03', 'commit', 'log', 'historico', 'historico-commits']
  },
  {
    id: 4,
    slug: '04-branching',
    title: 'Ramificações (git branch e git switch / checkout)',
    description: 'Trabalhando com branches paralelas, criação, listagem, remoção e alternância segura com git switch.',
    tutorialFile: '04-branching.md',
    quizFile: '04-branching.json',
    aliases: ['4', '04', 'branch', 'switch', 'checkout', 'branching']
  },
  {
    id: 5,
    slug: '05-merges',
    title: 'Fusão de Ramos (git merge)',
    description: 'Estratégias de integração: Fast-Forward vs 3-Way Merge Commit, flags úteis e boas práticas.',
    tutorialFile: '05-merges.md',
    quizFile: '05-merges.json',
    aliases: ['5', '05', 'merge', 'merges', 'fusao']
  },
  {
    id: 6,
    slug: '06-conflitos',
    title: 'Resolução de Conflitos de Merge',
    description: 'Como o Git identifica conflitos, anatomia dos marcadores (<<<<<<<, =======, >>>>>>>) e resolução passo a passo.',
    tutorialFile: '06-conflitos.md',
    quizFile: '06-conflitos.json',
    aliases: ['6', '06', 'conflitos', 'conflito', 'conflict']
  },
  {
    id: 7,
    slug: '07-remotes',
    title: 'Trabalho Remoto (git remote, push, pull, fetch)',
    description: 'Sincronização com GitHub/GitLab: remotes, tracking branches, push com upstream e fetch vs pull.',
    tutorialFile: '07-remotes.md',
    quizFile: '07-remotes.json',
    aliases: ['7', '07', 'remote', 'remotes', 'push', 'pull', 'fetch']
  },
  {
    id: 8,
    slug: '08-desfazendo-erros',
    title: 'Desfazendo Alterações (git reset e git revert)',
    description: 'Diferença crucial entre git restore, git reset (--soft, --mixed, --hard) e git revert em projetos em equipe.',
    tutorialFile: '08-desfazendo-erros.md',
    quizFile: '08-desfazendo-erros.json',
    aliases: ['8', '08', 'reset', 'revert', 'restore', 'desfazendo', 'desfazendo-erros']
  },
  {
    id: 9,
    slug: '09-rebase-stash',
    title: 'Organização Avançada (git stash e git rebase)',
    description: 'Armazenamento temporário de mudanças com git stash e linearização de histórico com git rebase e rebase interativo.',
    tutorialFile: '09-rebase-stash.md',
    quizFile: '09-rebase-stash.json',
    aliases: ['9', '09', 'stash', 'rebase', 'rebase-stash']
  },
  {
    id: 10,
    slug: '10-workflows',
    title: 'Boas Práticas e Fluxos de Trabalho',
    description: 'Metodologias consagradas de trabalho em equipe: Gitflow, Trunk-based Development, GitHub Flow e Conventional Commits.',
    tutorialFile: '10-workflows.md',
    quizFile: '10-workflows.json',
    aliases: ['10', 'workflows', 'fluxos', 'praticas']
  }
];

export function findModule(query) {
  if (!query) return null;
  const q = String(query).trim().toLowerCase();
  
  // Search exact match by ID or slug
  const directMatch = MODULES.find(
    m => String(m.id) === q || m.slug.toLowerCase() === q
  );
  if (directMatch) return directMatch;

  // Search by aliases
  const aliasMatch = MODULES.find(m => m.aliases.includes(q));
  if (aliasMatch) return aliasMatch;

  // Partial match in slug or title
  return MODULES.find(
    m => m.slug.toLowerCase().includes(q) || m.title.toLowerCase().includes(q)
  ) || null;
}
