// Собирает CJS-бандл из ESM-исходника. Footer разворачивает default-экспорт в
// module.exports, чтобы require('@bybrave/md5') отдавал функцию напрямую —
// как в оригинальном md5, а не { default }.
import { build } from 'esbuild';

await build({
  entryPoints: ['index.js'],
  bundle: true,
  format: 'cjs',
  platform: 'neutral',
  target: 'es2018',
  outfile: 'dist/index.cjs',
  footer: {
    js: 'module.exports = module.exports.default;',
  },
});

console.log('built dist/index.cjs');
