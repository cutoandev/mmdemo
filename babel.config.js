module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'formatjs',
      {
        removeDefaultMessage: process.env.NODE_ENV !== 'test',
      },
    ],
  ],
};
