# GitHub Copilot Prompts

This directory contains curated GitHub Copilot prompt files from the [awesome-copilot](https://github.com/github/awesome-copilot) repository. These prompts support QA/user feedback workflows, frontend bug fixing, UI consistency, auth/persistence debugging, and safe code updates.

## Available Prompts

### 1. create-implementation-plan.prompt.md

**Purpose:** Create structured implementation plans for new features, refactoring tasks, package upgrades, or architectural changes.

**When to use:**
- Planning a new feature with multiple phases
- Documenting a refactoring approach before starting
- Creating traceable upgrade plans with clear requirements and acceptance criteria

**Example invocation:**
```
@workspace /create-implementation-plan Add user notification preferences
```

---

### 2. prompt-builder.prompt.md

**Purpose:** Guide you through creating high-quality GitHub Copilot prompts with proper structure, tools, and best practices.

**When to use:**
- Building a new custom prompt for your team
- Ensuring your prompts follow established patterns
- Adding proper front matter, tools, and validation criteria

**Example invocation:**
```
@workspace /prompt-builder
```

---

### 3. breakdown-plan.prompt.md

**Purpose:** Generate comprehensive GitHub project plans with issue hierarchy (Epic > Feature > Story > Task), dependency linking, priority assignment, and Kanban tracking.

**When to use:**
- Breaking down a PRD into actionable GitHub issues
- Creating sprint planning artifacts
- Establishing clear work item hierarchy with dependencies

**Example invocation:**
```
@workspace /breakdown-plan Review the feature PRD and create GitHub issues
```

---

### 4. readme-blueprint-generator.prompt.md

**Purpose:** Automatically generate a comprehensive README.md by analyzing project documentation, architecture files, and copilot-instructions.

**When to use:**
- Bootstrapping documentation for a new project
- Updating README after significant changes
- Ensuring consistent documentation structure

**Example invocation:**
```
@workspace /readme-blueprint-generator
```

---

### 5. conventional-commit.prompt.md

**Purpose:** Generate standardized commit messages following the Conventional Commits specification with proper type, scope, and description.

**When to use:**
- Committing changes with consistent, descriptive messages
- Ensuring commits follow team conventions
- Auto-generating commit messages from staged changes

**Example invocation:**
```
@workspace /conventional-commit
```

---

## Usage Tips

1. **Invoke prompts** in VS Code Copilot Chat using the `@workspace /prompt-name` syntax
2. **Combine prompts** for complex workflows (e.g., use `create-implementation-plan` first, then `breakdown-plan` to create issues)
3. **Customize prompts** by editing the front matter `tools` array to add/remove capabilities
4. **Reference prompts** in other prompts using `#file:.github/prompts/prompt-name.prompt.md`

## Source

All prompts sourced from: https://github.com/github/awesome-copilot/tree/main/prompts
