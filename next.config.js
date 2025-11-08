/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60, // Reduced cache for faster updates
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react', 
      'framer-motion', 
      '@radix-ui/react-dialog', 
      '@radix-ui/react-popover', 
      '@radix-ui/react-select',
      '@react-three/fiber',
      '@react-three/drei',
      'three',
    ],
    // Disable optimizeCss to avoid critters dependency issue on Render
    // optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  compress: true,
  swcMinify: true,
  // Optimize caching for faster builds
  generateEtags: true,
  onDemandEntries: {
    maxInactiveAge: 15 * 1000, // Reduced from 25s to 15s for faster cleanup
    pagesBufferLength: 1, // Reduced from 2 to 1 for less memory usage
  },
  webpack: (config, { isServer, dev }) => {
    // Ignore warnings about non-serializable cache items and module warnings
    config.ignoreWarnings = [
      { module: /node_modules/ },
      { message: /No serializer registered for Warning/ },
      { message: /autoprefixer/ },
      { message: /Gradient has outdated direction syntax/ },
      { message: /does not contain a default export/ },
      { message: /Caching failed/ },
      { message: /Resolving.*vendor-chunks/ },
      { message: /doesn't lead to expected result/ },
      { message: /Can't resolve.*vendor-chunks/ },
      { message: /ENOENT: no such file or directory/ },
      { message: /\.nft\.json/ },
      { file: /\.nft\.json/ },
      { message: /webpack\.cache\.PackFileCacheStrategy/ },
      { message: /FileSystemInfo/ },
      { message: /Skipped not serializable cache item/ },
      { message: /while serializing/ },
    ]

    // Optimize webpack cache for faster builds
    if (dev && config.cache) {
      config.cache = {
        ...config.cache,
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
        // Reduce cache size for faster builds
        maxMemoryGenerations: 1,
        compression: 'gzip',
      }
    }

    // Suppress specific warnings at the compilation level
    config.infrastructureLogging = {
      level: 'error',
    }

    // Fix for ESM modules - handle default exports properly
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      }
    }

    // Handle external modules that may have issues
    config.externals = config.externals || []
    if (isServer) {
      config.externals.push({
        'webgl-sdf-generator': 'commonjs webgl-sdf-generator',
        'bidi-js': 'commonjs bidi-js',
      })
    }

    // Optimize bundle splitting
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk for large libraries
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            // Separate chunk for Three.js (large library)
            three: {
              name: 'three',
              test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
              chunks: 'all',
              priority: 30,
            },
            // Separate chunk for Framer Motion
            framer: {
              name: 'framer',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              chunks: 'all',
              priority: 25,
            },
            // Common chunk for shared code
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      }
    }

    return config
  },
}

module.exports = nextConfig


// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options

    org: "sorras",
    project: "javascript-nextjs",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    // tunnelRoute: "/monitoring",

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
