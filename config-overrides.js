// config-overrides.js
module.exports = function override(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      path: require.resolve('path-browserify'),
      child_process: false
    };
    return config;
  };
  