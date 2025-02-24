import { defineConfig } from '@umijs/max';
import MonacoEditorWebpackPlugin from 'monaco-editor-webpack-plugin';
import routes from './src/config/routes';

export default defineConfig({
  fastRefresh: true,
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {},
  mock: false,
  routes,
  npmClient: 'pnpm',
  chainWebpack: (memo: any) => {
    memo.plugin('monaco-editor-webpack-plugin').use(MonacoEditorWebpackPlugin, [
      //按需配置
      { languages: ['sql', 'json', 'nest', 'typescript'] },
    ]);
    return memo;
  },
});
