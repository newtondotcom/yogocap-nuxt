import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
    { languageOptions: { globals: globals.browser } },
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/essential'],
];
