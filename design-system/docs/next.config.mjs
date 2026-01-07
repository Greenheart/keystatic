import withPreconstruct from '@preconstruct/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  serverExternalPackages: ['esbuild'],
  experimental: {
    externalDir: true,
  },
  turbopack: {},
};

export default withPreconstruct(nextConfig);
