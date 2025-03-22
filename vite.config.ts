import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const viteConfig = defineConfig((env) => {
  const isDevMode = env.mode.includes('development');
  return {
    // base: isDevMode ? '/' : '/hobby-dobby/',
    base: isDevMode ? '/' : '/',
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: [
              'react',
              'react-dom',
              'react-router',
              'react-error-boundary',
              'react-textarea-autosize',
            ],
            ecosystem: ['zustand', 'clsx'],
            sweetalert: ['sweetalert2'],
            supabase: ['@supabase/supabase-js'],
          },
        },
      },
    },
    plugins: [
      react({
        jsxRuntime: 'automatic',
      }),
    ],
    publicDir: 'public',
    server: {
      host: 'localhost',
      port: 3000,
    },
    preview: {
      host: 'localhost',
      port: 8080,
    },
    css: {
      devSourcemap: true,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});

export default viteConfig;
