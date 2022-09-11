const jquery={
	"rules": {
		"no-negated-in-lhs": "error",
		"no-cond-assign": [
			"error",
			"except-parens"
		],
		"curly": [
			"error",
			"all"
		],
		"object-curly-spacing": [
			"error",
			"always"
		],
		"computed-property-spacing": [
			"error",
			"always"
		],
		"array-bracket-spacing": [
			"error",
			"always"
		],
		"eqeqeq": [
			"error",
			"smart"
		],
		"no-unused-expressions": "error",
		"no-sequences": "error",
		"no-nested-ternary": "error",
		"no-unreachable": "error",
		"wrap-iife": [
			"error",
			"inside"
		],
		"no-caller": "error",
		"quotes": [
			"error",
			"double"
		],
		"no-undef": "error",
		"no-unused-vars": [
			"error",
			{
				"args":  "all",
				"argsIgnorePattern": "^_"
			}
		],
		"operator-linebreak": [
			"error",
			"after"
		],
		"comma-style": [
			"error",
			"last"
		],
		"camelcase": [
			"error",
			{
				"properties": "never"
			}
		],
		"dot-notation": [
			"error",
			{
				"allowPattern": "^[a-z]+(_[a-z]+)+$"
			}
		],
		"max-len": [
			"error",
			{
				"code": 100,
				"ignoreComments": true,
				"ignoreUrls": true,
				"ignoreRegExpLiterals": true
			}
		],
		"no-mixed-spaces-and-tabs": "error",
		"no-trailing-spaces": "error",
		"no-irregular-whitespace": "error",
		"no-multi-str": "error",
		"comma-dangle": [
			"error",
			"never"
		],
		"comma-spacing": [
			"error",
			{
				"before": false,
				"after": true
			}
		],
		"space-before-blocks": [
			"error",
			"always"
		],
		"space-in-parens": [
			"error",
			"always"
		],
		"keyword-spacing": [
			2
		],
		"semi": [
			"error",
			"always"
		],
		"semi-spacing": [
			"error",
			{
				// Because of the `for ( ; ...)` requirement
				// "before": true,
				"after": true
			}
		],
		"no-extra-semi": "error",
		"space-infix-ops": "error",
		"eol-last": "error",
		"lines-around-comment": [
			"error",
			{
				"beforeLineComment": true
			}
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"no-with": "error",
		"brace-style": "error",
		"space-before-function-paren": [
			"error",
			"never"
		],
		"no-loop-func": "error",
		"no-spaced-func": "error",
		"key-spacing": [
			"error",
			{
				"beforeColon": false,
				"afterColon": true
			}
		],
		"space-unary-ops": [
			"error",
			{
				"words": false,
				"nonwords": false
			}
		],
		"no-multiple-empty-lines": 2
	}
}

const standard={
    "parserOptions": {
      "ecmaVersion": 2022,
      "ecmaFeatures": {
        "jsx": true
      },
      "sourceType": "module"
    },
  
    "env": {
      "es2021": true,
      "node": true
    },
  
    "plugins": [
      "import",
      "n",
      "promise"
    ],
  
    "globals": {
      "document": "readonly",
      "navigator": "readonly",
      "window": "readonly"
    },
  
    "rules": {
      "no-var": "warn",
      "object-shorthand": ["warn", "properties"],
  
      "accessor-pairs": ["error", { "setWithoutGet": true, "enforceForClassMembers": true }],
      "array-bracket-spacing": ["error", "never"],
      "array-callback-return": ["error", {
        "allowImplicit": false,
        "checkForEach": false
      }],
      "arrow-spacing": ["error", { "before": true, "after": true }],
      "block-spacing": ["error", "always"],
      "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
      "camelcase": ["error", {
        "allow": ["^UNSAFE_"],
        "properties": "never",
        "ignoreGlobals": true
      }],
      "comma-dangle": ["error", {
        "arrays": "never",
        "objects": "never",
        "imports": "never",
        "exports": "never",
        "functions": "never"
      }],
      "comma-spacing": ["error", { "before": false, "after": true }],
      "comma-style": ["error", "last"],
      "computed-property-spacing": ["error", "never", { "enforceForClassMembers": true }],
      "constructor-super": "error",
      "curly": ["error", "multi-line"],
      "default-case-last": "error",
      "dot-location": ["error", "property"],
      "dot-notation": ["error", { "allowKeywords": true }],
      "eol-last": "error",
      "eqeqeq": ["error", "always", { "null": "ignore" }],
      "func-call-spacing": ["error", "never"],
      "generator-star-spacing": ["error", { "before": true, "after": true }],
      "indent": ["error", 2, {
        "SwitchCase": 1,
        "VariableDeclarator": 1,
        "outerIIFEBody": 1,
        "MemberExpression": 1,
        "FunctionDeclaration": { "parameters": 1, "body": 1 },
        "FunctionExpression": { "parameters": 1, "body": 1 },
        "CallExpression": { "arguments": 1 },
        "ArrayExpression": 1,
        "ObjectExpression": 1,
        "ImportDeclaration": 1,
        "flatTernaryExpressions": false,
        "ignoreComments": false,
        "ignoredNodes": ["TemplateLiteral *", "JSXElement", "JSXElement > *", "JSXAttribute", "JSXIdentifier", "JSXNamespacedName", "JSXMemberExpression", "JSXSpreadAttribute", "JSXExpressionContainer", "JSXOpeningElement", "JSXClosingElement", "JSXFragment", "JSXOpeningFragment", "JSXClosingFragment", "JSXText", "JSXEmptyExpression", "JSXSpreadChild"],
        "offsetTernaryExpressions": true
      }],
      "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
      "keyword-spacing": ["error", { "before": true, "after": true }],
      "lines-between-class-members": ["error", "always", { "exceptAfterSingleLine": true }],
      "multiline-ternary": ["error", "always-multiline"],
      "new-cap": ["error", { "newIsCap": true, "capIsNew": false, "properties": true }],
      "new-parens": "error",
      "no-array-constructor": "error",
      "no-async-promise-executor": "error",
      "no-caller": "error",
      "no-case-declarations": "error",
      "no-class-assign": "error",
      "no-compare-neg-zero": "error",
      "no-cond-assign": "error",
      "no-const-assign": "error",
      "no-constant-condition": ["error", { "checkLoops": false }],
      "no-control-regex": "error",
      "no-debugger": "error",
      "no-delete-var": "error",
      "no-dupe-args": "error",
      "no-dupe-class-members": "error",
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",
      "no-useless-backreference": "error",
      "no-empty": ["error", { "allowEmptyCatch": true }],
      "no-empty-character-class": "error",
      "no-empty-pattern": "error",
      "no-eval": "error",
      "no-ex-assign": "error",
      "no-extend-native": "error",
      "no-extra-bind": "error",
      "no-extra-boolean-cast": "error",
      "no-extra-parens": ["error", "functions"],
      "no-fallthrough": "error",
      "no-floating-decimal": "error",
      "no-func-assign": "error",
      "no-global-assign": "error",
      "no-implied-eval": "error",
      "no-import-assign": "error",
      "no-invalid-regexp": "error",
      "no-irregular-whitespace": "error",
      "no-iterator": "error",
      "no-labels": ["error", { "allowLoop": false, "allowSwitch": false }],
      "no-lone-blocks": "error",
      "no-loss-of-precision": "error",
      "no-misleading-character-class": "error",
      "no-prototype-builtins": "error",
      "no-useless-catch": "error",
      "no-mixed-operators": ["error", {
        "groups": [
          ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
          ["&&", "||"],
          ["in", "instanceof"]
        ],
        "allowSamePrecedence": true
      }],
      "no-mixed-spaces-and-tabs": "error",
      "no-multi-spaces": "error",
      "no-multi-str": "error",
      "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
      "no-new": "error",
      "no-new-func": "error",
      "no-new-object": "error",
      "no-new-symbol": "error",
      "no-new-wrappers": "error",
      "no-obj-calls": "error",
      "no-octal": "error",
      "no-octal-escape": "error",
      "no-proto": "error",
      "no-redeclare": ["error", { "builtinGlobals": false }],
      "no-regex-spaces": "error",
      "no-return-assign": ["error", "except-parens"],
      "no-self-assign": ["error", { "props": true }],
      "no-self-compare": "error",
      "no-sequences": "error",
      "no-shadow-restricted-names": "error",
      "no-sparse-arrays": "error",
      "no-tabs": "error",
      "no-template-curly-in-string": "error",
      "no-this-before-super": "error",
      "no-throw-literal": "error",
      "no-trailing-spaces": "error",
      "no-undef": "error",
      "no-undef-init": "error",
      "no-unexpected-multiline": "error",
      "no-unmodified-loop-condition": "error",
      "no-unneeded-ternary": ["error", { "defaultAssignment": false }],
      "no-unreachable": "error",
      "no-unreachable-loop": "error",
      "no-unsafe-finally": "error",
      "no-unsafe-negation": "error",
      "no-unused-expressions": ["error", {
        "allowShortCircuit": true,
        "allowTernary": true,
        "allowTaggedTemplates": true
      }],
      "no-unused-vars": ["error", {
        "args": "none",
        "caughtErrors": "none",
        "ignoreRestSiblings": true,
        "vars": "all"
      }],
      "no-use-before-define": ["error", { "functions": false, "classes": false, "variables": false }],
      "no-useless-call": "error",
      "no-useless-computed-key": "error",
      "no-useless-constructor": "error",
      "no-useless-escape": "error",
      "no-useless-rename": "error",
      "no-useless-return": "error",
      "no-void": "error",
      "no-whitespace-before-property": "error",
      "no-with": "error",
      "object-curly-newline": ["error", { "multiline": true, "consistent": true }],
      "object-curly-spacing": ["error", "always"],
      "object-property-newline": ["error", { "allowMultiplePropertiesPerLine": true }],
      "one-var": ["error", { "initialized": "never" }],
      "operator-linebreak": ["error", "after", { "overrides": { "?": "before", ":": "before", "|>": "before" } }],
      "padded-blocks": ["error", { "blocks": "never", "switches": "never", "classes": "never" }],
      "prefer-const": ["error", {"destructuring": "all"}],
      "prefer-promise-reject-errors": "error",
      "prefer-regex-literals": ["error", { "disallowRedundantWrapping": true }],
      "quote-props": ["error", "as-needed"],
      "quotes": ["error", "single", { "avoidEscape": true, "allowTemplateLiterals": false }],
      "rest-spread-spacing": ["error", "never"],
      "semi": ["error", "never"],
      "semi-spacing": ["error", { "before": false, "after": true }],
      "space-before-blocks": ["error", "always"],
      "space-before-function-paren": ["error", "always"],
      "space-in-parens": ["error", "never"],
      "space-infix-ops": "error",
      "space-unary-ops": ["error", { "words": true, "nonwords": false }],
      "spaced-comment": ["error", "always", {
        "line": { "markers": ["*package", "!", "/", ",", "="] },
        "block": { "balanced": true, "markers": ["*package", "!", ",", ":", "::", "flow-include"], "exceptions": ["*"] }
      }],
      "symbol-description": "error",
      "template-curly-spacing": ["error", "never"],
      "template-tag-spacing": ["error", "never"],
      "unicode-bom": ["error", "never"],
      "use-isnan": ["error", {
        "enforceForSwitchCase": true,
        "enforceForIndexOf": true
      }],
      "valid-typeof": ["error", { "requireStringLiterals": true }],
      "wrap-iife": ["error", "any", { "functionPrototypeMethods": true }],
      "yield-star-spacing": ["error", "both"],
      "yoda": ["error", "never"],
  
      "import/export": "error",
      "import/first": "error",
      "import/no-absolute-path": ["error", { "esmodule": true, "commonjs": true, "amd": false }],
      "import/no-duplicates": "error",
      "import/no-named-default": "error",
      "import/no-webpack-loader-syntax": "error",
  
      "n/handle-callback-err": ["error", "^(err|error)$" ],
      "n/no-callback-literal": "error",
      "n/no-deprecated-api": "error",
      "n/no-exports-assign": "error",
      "n/no-new-require": "error",
      "n/no-path-concat": "error",
      "n/process-exit-as-throw": "error",
  
      "promise/param-names": "error"
    }
  }

  const typescript=module.exports = {
    root: true,
    plugins: [
      '@typescript-eslint',
      '@typescript-eslint/internal',
      'deprecation',
      'eslint-comments',
      'eslint-plugin',
      'import',
      'jest',
      'simple-import-sort',
    ],
    env: {
      es6: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:eslint-plugin/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    parserOptions: {
      sourceType: 'module',
      project: [
        './tsconfig.eslint.json',
        './packages/*/tsconfig.json',
        './tests/integration/tsconfig.json',
        /**
         * We are currently in the process of transitioning to nx's out of the box structure and
         * so need to manually specify converted packages' tsconfig.build.json and tsconfig.spec.json
         * files here for now in addition to the tsconfig.json glob pattern.
         *
         * TODO(#4665): Clean this up once all packages have been transitioned.
         */
        './packages/scope-manager/tsconfig.build.json',
        './packages/scope-manager/tsconfig.spec.json',
      ],
      allowAutomaticSingleRunInference: true,
      tsconfigRootDir: __dirname,
      warnOnUnsupportedTypeScriptVersion: false,
      EXPERIMENTAL_useSourceOfProjectReferenceRedirect: false,
    },
    rules: {
      // make sure we're not leveraging any deprecated APIs
      'deprecation/deprecation': 'error',
  
      //
      // our plugin :D
      //
  
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': true,
          'ts-nocheck': true,
          'ts-check': false,
          minimumDescriptionLength: 5,
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': [
        'error',
        { allow: ['arrowFunctions'] },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
          allowBoolean: true,
          allowAny: true,
          allowNullish: true,
          allowRegExp: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],
  
      //
      // Internal repo rules
      //
  
      '@typescript-eslint/internal/no-poorly-typed-ts-props': 'error',
      '@typescript-eslint/internal/no-typescript-default-import': 'error',
      '@typescript-eslint/internal/prefer-ast-types-enum': 'error',
  
      //
      // eslint-base
      //
  
      curly: ['error', 'all'],
      'no-mixed-operators': 'error',
      'no-console': 'error',
      'no-process-exit': 'error',
      'no-fallthrough': [
        'warn',
        { commentPattern: '.*intentional fallthrough.*' },
      ],
  
      //
      // eslint-plugin-eslint-comment
      //
  
      // require a eslint-enable comment for every eslint-disable comment
      'eslint-comments/disable-enable-pair': [
        'error',
        {
          allowWholeFile: true,
        },
      ],
      // disallow a eslint-enable comment for multiple eslint-disable comments
      'eslint-comments/no-aggregating-enable': 'error',
      // disallow duplicate eslint-disable comments
      'eslint-comments/no-duplicate-disable': 'error',
      // disallow eslint-disable comments without rule names
      'eslint-comments/no-unlimited-disable': 'error',
      // disallow unused eslint-disable comments
      'eslint-comments/no-unused-disable': 'error',
      // disallow unused eslint-enable comments
      'eslint-comments/no-unused-enable': 'error',
      // disallow ESLint directive-comments
      'eslint-comments/no-use': [
        'error',
        {
          allow: [
            'eslint-disable',
            'eslint-disable-line',
            'eslint-disable-next-line',
            'eslint-enable',
          ],
        },
      ],
  
      //
      // eslint-plugin-import
      //
  
      // disallow non-import statements appearing before import statements
      'import/first': 'error',
      // Require a newline after the last import/require in a group
      'import/newline-after-import': 'error',
      // Forbid import of modules using absolute paths
      'import/no-absolute-path': 'error',
      // disallow AMD require/define
      'import/no-amd': 'error',
      // forbid default exports
      'import/no-default-export': 'error',
      // Forbid the use of extraneous packages
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
          peerDependencies: true,
          optionalDependencies: false,
        },
      ],
      // Forbid mutable exports
      'import/no-mutable-exports': 'error',
      // Prevent importing the default as if it were named
      'import/no-named-default': 'error',
      // Prohibit named exports
      'import/no-named-export': 'off', // we want everything to be a named export
      // Forbid a module from importing itself
      'import/no-self-import': 'error',
      // Require modules with a single export to use a default export
      'import/prefer-default-export': 'off', // we want everything to be named
    },
    overrides: [
      // all test files
      {
        files: [
          'packages/*/tests/**/*.spec.ts',
          'packages/*/tests/**/*.test.ts',
          'packages/*/tests/**/spec.ts',
          'packages/*/tests/**/test.ts',
          'packages/parser/tests/**/*.ts',
          'tests/integration/**/*.test.ts',
          'tests/integration/integration-test-base.ts',
          'tests/integration/pack-packages.ts',
        ],
        env: {
          'jest/globals': true,
        },
        rules: {
          '@typescript-eslint/no-unsafe-assignment': 'off',
          '@typescript-eslint/no-unsafe-call': 'off',
          '@typescript-eslint/no-unsafe-member-access': 'off',
          '@typescript-eslint/no-unsafe-return': 'off',
          'eslint-plugin/consistent-output': 'off', // Might eventually be removed from `eslint-plugin/recommended`: https://github.com/not-an-aardvark/eslint-plugin-eslint-plugin/issues/284
          'jest/no-disabled-tests': 'warn',
          'jest/no-focused-tests': 'error',
          'jest/no-alias-methods': 'error',
          'jest/no-identical-title': 'error',
          'jest/no-jasmine-globals': 'error',
          'jest/no-jest-import': 'error',
          'jest/no-test-prefixes': 'error',
          'jest/no-done-callback': 'error',
          'jest/no-test-return-statement': 'error',
          'jest/prefer-to-be': 'warn',
          'jest/prefer-to-contain': 'warn',
          'jest/prefer-to-have-length': 'warn',
          'jest/prefer-spy-on': 'error',
          'jest/valid-expect': 'error',
          'jest/no-deprecated-functions': 'error',
        },
      },
      // test utility scripts and website js files
      {
        files: ['tests/**/*.js'],
        rules: {
          '@typescript-eslint/explicit-function-return-type': 'off',
          '@typescript-eslint/no-unsafe-call': 'off',
          '@typescript-eslint/no-unsafe-member-access': 'off',
          '@typescript-eslint/no-unsafe-return': 'off',
          '@typescript-eslint/restrict-plus-operands': 'off',
        },
      },
      // plugin source files
      {
        files: [
          'packages/eslint-plugin-internal/**/*.ts',
          'packages/eslint-plugin-tslint/**/*.ts',
          'packages/eslint-plugin/**/*.ts',
        ],
        rules: {
          '@typescript-eslint/internal/no-typescript-estree-import': 'error',
        },
      },
      // plugin rule source files
      {
        files: [
          'packages/eslint-plugin-internal/src/rules/**/*.ts',
          'packages/eslint-plugin-tslint/src/rules/**/*.ts',
          'packages/eslint-plugin/src/configs/**/*.ts',
          'packages/eslint-plugin/src/rules/**/*.ts',
        ],
        rules: {
          // specifically for rules - default exports makes the tooling easier
          'import/no-default-export': 'off',
        },
      },
      // plugin rule tests
      {
        files: [
          'packages/eslint-plugin-internal/tests/rules/**/*.test.ts',
          'packages/eslint-plugin-tslint/tests/rules/**/*.test.ts',
          'packages/eslint-plugin/tests/rules/**/*.test.ts',
          'packages/eslint-plugin/tests/eslint-rules/**/*.test.ts',
        ],
        rules: {
          '@typescript-eslint/internal/plugin-test-formatting': 'error',
        },
      },
      // files which list all the things
      {
        files: ['packages/eslint-plugin/src/rules/index.ts'],
        rules: {
          // enforce alphabetical ordering
          'sort-keys': 'error',
          'import/order': ['error', { alphabetize: { order: 'asc' } }],
        },
      },
      // tools and tests
      {
        files: ['**/tools/**/*.ts', '**/tests/**/*.ts'],
        rules: {
          // allow console logs in tools and tests
          'no-console': 'off',
        },
      },
      // generated files
      {
        files: [
          'packages/scope-manager/src/lib/*.ts',
          'packages/eslint-plugin/src/configs/*.ts',
        ],
        rules: {
          // allow console logs in tools and tests
          '@typescript-eslint/internal/no-poorly-typed-ts-props': 'off',
          '@typescript-eslint/internal/no-typescript-default-import': 'off',
          '@typescript-eslint/internal/prefer-ast-types-enum': 'off',
        },
      },
      // ast spec specific standardization
      {
        files: ['packages/ast-spec/src/**/*.ts'],
        rules: {
          '@typescript-eslint/consistent-type-imports': [
            'error',
            { prefer: 'type-imports', disallowTypeAnnotations: true },
          ],
          '@typescript-eslint/no-unused-vars': 'error',
          '@typescript-eslint/sort-type-union-intersection-members': 'error',
          'import/first': 'error',
          'import/newline-after-import': 'error',
          'import/no-duplicates': 'error',
          'simple-import-sort/imports': 'error',
        },
      },
      {
        files: ['rollup.config.ts'],
        rules: {
          'import/no-default-export': 'off',
        },
      },
      {
        files: ['packages/website/src/**/*.{ts,tsx}'],
        rules: {
          'import/no-default-export': 'off',
          'no-console': 'off',
        },
      },
    ],
  };
  
  console.log('num of jquery rules:', Object.keys(jquery.rules).length)
  console.log('num of standardJS rules:', Object.keys(standard.rules).length)
  console.log('num of typescript rules:', Object.keys(typescript.rules).length)