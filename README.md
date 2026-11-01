# 职业规划报告与展示生成工具

保存本机现有 PDF 报告及 PPT 展示生成源码，以及构建时实际使用的项目图像素材。参考文档、原始简历/模板、生成成品、预览图及提取文本不入库。

## 构建

在 macOS 安装 Python 3.12 依赖：`python -m pip install -r requirements.lock.txt`。报告使用系统字体 `/Library/Fonts/Arial Unicode.ttf`；其他系统需要先配置有相同中文字符覆盖的字体并相应调整脚本。运行 `python 制作报告.py`。

展示使用 Node.js 和 Codex 提供的 `@oai/artifact-tool` 2.8.106。在该运行环境中配置 `node_modules` 后运行 `node 构建/制作展示.mjs`。第三方运行库不复制进本仓库。

最终产物统一写入本项目 `outputs/`；构建核对文件写入项目内的忽略目录。既有外部交付成品不移动、不覆盖。保持源码中本次使用的文本和素材，后续编辑从对应脚本开始。
