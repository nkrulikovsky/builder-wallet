module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    "nativewind/babel",
    "module:react-native-dotenv",
    ["@babel/plugin-proposal-private-methods", { loose: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
