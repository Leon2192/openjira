/* @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { dev, isServer }) => {
    // Configuración de Webpack
    config.optimization.minimize = true; // Minimizar el código
   
    // Configuración específica del servidor
    if (isServer && !dev) {
      // Configurar opciones de minimización para el servidor
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }

    // Habilitar Webpack 5
    config.experiments = {
      topLevelAwait: true, // Habilitar el uso de import() para la carga de módulos
    };
    config.resolve.fallback = {
      assert: false, // Deshabilitar el polyfill de assert en Webpack 5
    };

    return config;
  },
  
}

module.exports = nextConfig
