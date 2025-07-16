## 🔧 Code Quality Kit

This Code Quality Kit provides a plug-and-play setup to enforce consistent code quality across projects using:

- ✅ **Prettier** – Code formatting
- ✅ **ESLint** – Linting with Prettier integration
- ✅ **Husky** – Git hooks
- ✅ **Lint-Staged** – Only run formatters on staged files
- ✅ **Commitlint** – Enforce conventional commits
- ✅ **GitHub Actions** – CI for quality checks

---

## 📦 Installation

### 1. Install the Kit

```bash
npm install --save-dev code-quality-kit
```

---

## 🚀 Setup

Run the provided setup script:

```bash
npx code-quality-kit
```

This will:

- Create config files
- Set up Husky pre-commit & commit-msg hooks
- Add GitHub Actions CI workflow
- Enable Prettier + ESLint + Commitlint

---

## ⚙️ Configuration

Customize features by adding a `.codequalityrc.json` file in your project root:

```json
{
  "husky": true,
  "eslint": true,
  "prettier": true,
  "commitlint": true,
  "ci": true
}
```

You can turn off any part of the setup by setting its value to `false`.

---

## 🧪 Pre-commit Hook

The pre-commit hook runs:

- ✅ Prettier formatting (`npx prettier --write .`)
- ✅ ESLint autofix (`npx eslint . --fix`)
- ✅ Lint-staged for staged files only

---

## 🧪 Commit-msg Hook

Ensures commit messages follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
npx commitlint --edit $1
```

---

## ✅ GitHub Actions – Quality Check

Automatically runs formatting and linting checks on push and pull request:

```yaml
.github/workflows/quality-check.yml
```

---

## 💻 Recommended VS Code Extensions

To get real-time linting and formatting feedback in your editor:

| Extension                                                                                                                   | Description                              |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)                                        | Integrates ESLint into VS Code           |
| [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)                     | Automatically format code                |
| [Conventional Commits](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits) _(optional)_ | Helps write conventional commit messages |
| [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)                   | Respects `.editorconfig` rules           |

---

## 📁 Output Files

The following files will be created or updated:

```
.prettierrc.js
.eslintrc.js
commitlint.config.js
lint-staged.config.js
.husky/pre-commit
.husky/commit-msg
.github/workflows/quality-check.yml
```

---

## 👥 Author

**Kasun Udara** – [kasunu2001@gmail.com](mailto:kasunu2001@gmail.com)

---
