import defaultPrettierConfig from '../.prettierrc.js'

/** @type {import('prettier').Config} */
export default {
  ...defaultPrettierConfig,
  plugins: [
    ...(defaultPrettierConfig.plugins || []),
    'prettier-plugin-tailwindcss',
  ],
};
