# form-metal

## Editor Config
我们提供了 .editorconfig 约束文件格式. 为了确保 editorconfig 的正常工作，你需要按照 [需插件支持](https://editorconfig.org/#download) 和 [无需插件支持](https://editorconfig.org/#pre-installed) 确定是否需要安装插件

我们同时提供了 `.vscode/settings.json` 约束文件格式，对于 vscode 用户来说，这会让你可以开箱即用。对于非 vscode 用户，`.editorconfig` 也能帮你约束，但是可能需要你安装插件

## changeset 配置

为确保版本控制正常运行，需要在 `.changeset/config.json` 中配置 `changelog[1].repo` 其值为本项目的 github 仓库，一般为 `(userName|teamName)/repositoryName`，也可以使用仓库链接，如 `https://github.com/userName/repositoryName`

项目需要在 github 的 `settings - Actions - General - Workflow permissions` 中勾选 **Read and write permissions** 和  **Allow GitHub Actions to create and approve pull requests** 选项

如需将该仓库发布到 npm，需要到 `.github/workflows/publish` 中开启最后两项，且在 `settings - Actions - secrets and variables - Actions` 中添加需要的[token](https://docs.npmjs.com/creating-and-viewing-access-tokens)

> note: secrets 会首先查找项目中的配置，再向上查找项目所属组织的配置，如果组织中已经配置，可以不用在项目中再次配置
