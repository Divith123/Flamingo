module.exports = (api) => {
  api.cache(true);
  const plugins = [];

  plugins.push([
    "react-native-unistyles/plugin",
    {
      root: "apps/native",
    },
  ]);

  plugins.push("react-native-worklets/plugin");

  return {
    presets: ["babel-preset-expo"],

    plugins,
  };
};
