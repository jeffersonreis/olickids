import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';
import keystatic from '@keystatic/astro';

const isProd = process.env.NODE_ENV === 'production';

// In Astro 6.x, when two SSR routes collide the injected route silently
// overrides the file-based one and fails. We patch Keystatic to skip
// injecting the API route, letting our src/pages/api/keystatic route win.
function keystatiWithoutApiRoute() {
  const base = keystatic();
  return {
    ...base,
    hooks: {
      ...base.hooks,
      'astro:config:setup': (options) => {
        const original = options.injectRoute.bind(options);
        options.injectRoute = (route) => {
          if (route.pattern === '/api/keystatic/[...params]') return;
          original(route);
        };
        base.hooks['astro:config:setup']?.(options);
      },
    },
  };
}

export default defineConfig({
  output: 'server',
  integrations: [react(), keystatiWithoutApiRoute()],
  adapter: isProd ? netlify() : undefined,
  security: { checkOrigin: false },
  vite: {
    // Apply 'node' export condition only for SSR so the Keystatic API
    // gets the Node.js build (with filesystem support) instead of the
    // browser stub. The client bundle keeps default Vite conditions.
    ssr: {
      resolve: {
        conditions: ['node', 'import', 'module', 'browser', 'default'],
      },
    },
  },
});
