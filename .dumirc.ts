import { defineConfig } from "dumi";
import { defineThemeConfig } from "dumi-theme-antd/dist/defineThemeConfig";

export default defineConfig({
  apiParser: {},
  resolve: {
    // 配置入口文件路径，API 解析将从这里开始
    entryFile: "./src/index.tsx",
  },
  outputPath: "docs-dist",
  themeConfig: defineThemeConfig({
    title: "JUI",
  }),
});
