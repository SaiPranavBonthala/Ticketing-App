module.exports = {
  webPackDevMiddlware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};
