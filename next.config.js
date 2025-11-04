/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  compress: true,
  swcMinify: true,
  // Clear all caches
  generateEtags: false,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
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
    ]

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

    return config
  },
}

module.exports = nextConfig
