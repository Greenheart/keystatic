import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import eslintPluginJest from 'eslint-plugin-jest';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactCompiler from 'eslint-plugin-react-compiler';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginStorybook from 'eslint-plugin-storybook';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintConfigNext from 'eslint-config-next';

const OFF = 0;
const WARN = 1;
const ERROR = 2;

// const reactComponentTypeMessage = {
//   message:
//     'This type includes the children prop which is generally wrong, ' +
//     'instead of using this type, type the props of the component',
// };

/** @type {Parameters<import('eslint/config').defineConfig>[0]} */
const overrides = [
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // TypeScript already checks for the following things and they cause conflicts
      'import/no-unresolved': OFF,
      'no-undef': OFF,
    },
  },
  {
    files: [
      '**/__tests__/**/*',
      '**/*stories.*',
      '**/*test.*',
      '**/build/**/*',
      '**/test-fixtures.*',
      '**/tests/**/*',
    ],
    rules: {
      // Allow importing from packages that aren't listed in package.json for
      // test and Storybook files
      // TypeScript will still catch uninstalled imports for us as there will
      // be no modules or type definitions for them
      'import/no-extraneous-dependencies': OFF,
    },
  },
];

export default defineConfig(
  [
    tseslint.configs.recommended,
    eslintPluginJest.configs['flat/recommended'],
    eslintConfigPrettier,
    eslintConfigNext,
    {
      languageOptions: {
        globals: {
          browser: true,
          es6: true,
          jest: true,
          node: true,
        },
      },
      plugins: {
        import: eslintPluginImport,
        jest: eslintPluginJest,
        react: eslintPluginReact,
        'react-hooks': eslintPluginReactHooks,
        'react-compiler': eslintPluginReactCompiler,
        '@typescript/eslint': tseslint.plugin,
        storybook: eslintPluginStorybook,
      },
      settings: {
        react: { version: 'detect' },
      },
      rules: {
        // '@typescript-eslint/consistent-type-imports': WARN,
        curly: [ERROR, 'multi-line'],
        'import/first': ERROR,
        'import/newline-after-import': ERROR,
        'import/no-duplicates': ERROR,
        'jest/valid-describe': OFF,
        'jest/valid-expect': OFF,
        'jest/no-conditional-expect': OFF,
        'jest/no-standalone-expect': OFF,
        'jest/expect-expect': OFF,
        'jest/no-export': OFF,
        'jest/valid-title': OFF,
        'jest/no-try-expect': OFF,
        'jest/no-disabled-tests': ERROR,
        'jest/no-alias-methods': ERROR,
        'jsx-quotes': ERROR,
        'no-trailing-spaces': ERROR,
        'no-undef': ERROR,
        'no-unused-expressions': ERROR,
        'object-curly-spacing': [ERROR, 'always'],
        'react-hooks/exhaustive-deps': ERROR,
        'react-hooks/rules-of-hooks': ERROR,
        'react/jsx-boolean-value': WARN,
        'react/jsx-no-undef': ERROR,
        'react/jsx-uses-react': ERROR,
        'react/jsx-uses-vars': ERROR,
        'react/jsx-wrap-multilines': WARN,
        'react/no-did-mount-set-state': WARN,
        'react/no-did-update-set-state': WARN,
        'react/no-unescaped-entities': OFF,
        'react/no-unknown-property': WARN,
        'react/react-in-jsx-scope': OFF,
        'react/self-closing-comp': WARN,
        'react/sort-prop-types': WARN,
        semi: ERROR,
        strict: OFF,
        '@typescript-eslint/no-unused-vars': [
          ERROR,
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
            vars: 'all',
          },
        ],
        '@typescript-eslint/no-empty-object-type': {
          allowObjectTypes: 'always',
        },
        quotes: [
          ERROR,
          'single',
          { avoidEscape: true, allowTemplateLiterals: true },
        ],
        'no-restricted-syntax': [
          ERROR,
          {
            // Curious why we have this rule?
            // - Enums only work for a subset of use cases that unions of string
            // literals + objects work for and learning one language feature is
            // easier than learning two language features
            // - Enums are a new language feature which have runtime semantics which
            // means they change TypeScript from JS + types to JS + types + extra
            // language features which is harder to teach without clear advantages
            // for this specific feature
            selector: 'TSEnumDeclaration',
            message: 'Use a union of string literals instead of an enum',
          },
        ],
        '@typescript-eslint/no-unsafe-function-type': ERROR,
        // TODO: Replace these rules (originally based on @typescript-eslint/ban-types) with the new built-in rules from typescript-eslint
        // '@typescript-eslint/no-unsafe-function-type': [
        //   ERROR,
        //   {
        //     extendDefaults: false,
        //     Function:
        //       '`Function` types are unsafe. Use more specific function types ' +
        //       'instead. e.g. (arg: number) => string',
        //     String: {
        //       message:
        //         'The `String` type refers to the String object which is probably ' +
        //         'not what you want, you probably want `string` instead which ' +
        //         'refers to the string primitive type.',
        //       fixWith: 'string',
        //     },
        //     ComponentType: reactComponentTypeMessage,
        //     FC: reactComponentTypeMessage,
        //     SFC: reactComponentTypeMessage,
        //     'React.ComponentType': reactComponentTypeMessage,
        //     'React.FC': reactComponentTypeMessage,
        //     'React.SFC': reactComponentTypeMessage,
        //   },
        // ],
        'no-restricted-syntax': [
          ERROR,
          {
            selector: "TSQualifiedName[left.name='React']",
            message:
              "Avoid using the global React type, import the specific type you want from 'react'",
          },
        ],
        'react/no-unknown-property': OFF,
        'react-compiler/react-compiler': [
          ERROR,
          {
            reportableLevels: new Set([
              'InvalidJS',
              'InvalidReact',
              // uncomment if you want to see these cases
              // 'CannotPreserveMemoization',
            ]),
          },
        ],
      },
      ignores: [
        // Logs
        'logs',
        '*.log',
        'npm-debug.log*',
        'yarn-debug.log*',
        'yarn-error.log*',

        // TSGQL
        '__generated__/',

        // node-waf configuration
        '.lock-wscript',

        // Compiled binary addons (https://nodejs.org/api/addons.html)
        'build/Release',

        // Dependency directories
        'node_modules/',

        // TypeScript cache
        '*.tsbuildinfo',

        // Optional npm cache directory
        '.npm',

        // Optional eslint cache
        '.eslintcache',

        // Optional REPL history
        '.node_repl_history',

        // Yarn Integrity file
        '.yarn-integrity',

        // dotenv environment variables file
        '.env',
        '.env.test',

        // Next.js build output
        '.next',

        // Preconstruct build output
        'dist',

        // Docs
        'docs/cache',
        'docs/public/playroom',
        'docs/public/storybook',

        // Test coverage
        'coverage',

        // Contentlayer
        '.contentlayer',

        '**/*.json',
        '**/*.md',

        'l10n.js',
        'l10n.d.ts',
        'packages/keystatic/src/app/l10n/index.js',
        'packages/keystatic/src/app/l10n/index.d.ts',
      ],
    },
  ],
  ...overrides
);
