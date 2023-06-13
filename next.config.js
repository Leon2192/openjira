/* @type {import('next').NextConfig} 
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig */
module.exports = {
  webpack: (config, { dev, isServer }) => {
    // Optimizaciones de Webpack
    config.optimization.minimize = true;
    config.optimization.minimizer[0].options.terserOptions = {
      // Opciones de Terser para minificar el código
      compress: {
        drop_console: true, // Eliminar console.log() en producción
      },
    };

    // Configuración específica del servidor
    if (isServer) {
      // Eliminar polyfills innecesarios en el servidor
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();
        if (entries['main.js'] && !dev) {
          entries['main.js'].unshift('core-js/modules/es.promise');
          entries['main.js'].unshift('core-js/modules/es.array.iterator');
        }
        return entries;
      };
    }

    return config;
  },
};

