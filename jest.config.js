module.exports = {
  transform: {
    "\\.js$": ["babel-jest", { configFile: "./.babelrc.jest" }],
  },
};
