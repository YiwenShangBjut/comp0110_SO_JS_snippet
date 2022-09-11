module.exports.rules = {
  "num-statements": {
    meta: { type: "suggestion", schema: [] },
    create(context) {
      return {
        ":statement:not(BlockStatement)": (node) =>
          context.report({
            node: node,
            message: "a statement " + JSON.stringify(node.loc),
          }),
      };
    },
  },
};
module.exports.configs = {
  numStatements: {
    plugins: ["eslint-plugin-num-statements"],
    rules: { "num-statements/num-statements": "warn" },
  },
};
