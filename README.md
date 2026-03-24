# ralph-intro

Template para iniciar projetos com o **Ralph**, agente autônomo baseado em Claude Code que executa PRDs completos dentro de um Dev Container isolado.

---

## Arquivos versionados (commitáveis)

```
.devcontainer/
  ├── Dockerfile
  ├── devcontainer.json
  └── init-firewall.sh

.claude/
  └── skills/
      ├── prd/SKILL.md
      └── ralph/SKILL.md

scripts/
  └── ralph/
      ├── ralph.sh
      └── CLAUDE.md

README.md
.gitignore
```

> Arquivos ignorados pelo `.gitignore`: `app/`, `prd.json`, `progress.txt`, `prd-terminal-task-manager.md`

---

## Tutorial: Rodando o Ralph com Dev Containers no VS Code / Cursor

### Pré-requisitos

- [VS Code](https://code.visualstudio.com/) ou [Cursor](https://www.cursor.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e rodando
- Extensão **Dev Containers** da Microsoft instalada no editor

---

### 1. Clone ou crie o repositório

```bash
git clone <seu-repositorio>
cd <seu-repositorio>
```

---

### 2. Copie os scripts do Ralph para o repositório

```bash
mkdir -p scripts/ralph
cp /home/<usuario>/htdocs/ralph/ralph.sh scripts/ralph/
cp /home/<usuario>/htdocs/ralph/prompt.md scripts/ralph/prompt.md
```

---

### 3. Copie as skills do Ralph

**Global (disponível em todos os projetos):**

```bash
cp -r skills/prd ~/.claude/skills/
cp -r skills/ralph ~/.claude/skills/
```

**Local (apenas neste repositório):**

```bash
cp -r /home/<usuario>/htdocs/ralph/skills/prd .claude/skills/
cp -r /home/<usuario>/htdocs/ralph/skills/ralph .claude/skills/
```

---

### 4. Configure o Dev Container

Os arquivos `.devcontainer/` já estão incluídos neste repositório. Eles foram obtidos do repositório oficial do Claude Code:

> https://github.com/anthropics/claude-code/tree/main/.devcontainer

Os três arquivos necessários são:
- `Dockerfile`
- `devcontainer.json`
- `init-firewall.sh`

---

### 5. Abra o projeto no Dev Container

No VS Code / Cursor, abra a paleta de comandos (`Ctrl+Shift+P`) e execute:

```
Dev Containers: Reopen in Container
```

Aguarde o container ser construído. O ambiente estará isolado com todas as dependências necessárias.

---

### 6. Gere o PRD dentro do Dev Container

Com o terminal aberto dentro do container, rode o comando:

```
/prd Descreva aqui o que você precisa desenvolver
```

O Claude irá fazer perguntas para refinar o escopo. Responda e confirme para gerar o `prd.json`.

---

### 7. Inicie o Ralph

Com o `prd.json` gerado, rode o script do Ralph:

```bash
./scripts/ralph/ralph.sh --tool claude
```

O agente autônomo irá ler o PRD e começar a executar as tarefas automaticamente.

---

### 8. Acompanhe o progresso

O Ralph gera automaticamente um arquivo `progress.txt` na raiz do projeto. Acompanhe o andamento em tempo real:

```bash
tail -f progress.txt
```

---

### Conclusão

Quando o Ralph finalizar todas as tarefas do PRD, o `progress.txt` será atualizado com o status **COMPLETO**. O código gerado estará na pasta `app/`.
