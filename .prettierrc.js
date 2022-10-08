/* eslint-env node */
/**
 * @type {import("@types/prettier").Options}
 */
module.exports = {
    // 行尾需要有分号
    semi: true,
    // 末尾需要有逗号
    trailingComma: "all",
    // 使用单引号
    singleQuote: false,
    // 一行最多 120 字符
    printWidth: 120,
    // 使用 4 个空格缩进
    tabWidth: 4,
    // 大括号内的首尾需要空格
    bracketSpacing: true,
    parser: "flow",
    // 格式化嵌入的内容
    embeddedLanguageFormatting: "auto"
};
