import { Plugin } from 'vite';
import { toDisk } from '@maizzle/framework/src/generators/output/index.js';
import colors from 'picocolors';
import { relative } from 'path';
import email from 'tailwindcss-preset-email';

type MaizzleConfig = {
  src?: string;
  dest?: string;
  ext?: string;
};

export default (config?: MaizzleConfig): Plugin => {
  const options = {
    src: `${process.cwd()}/maizzle`,
    dest: `${process.cwd()}/mail`,
    ext: 'html',
    ...config,
  };

  const build = () =>
    toDisk('local', null, {
      build: {
        tailwind: {
          config: {
            plugins: [email],
          },
        },
        components: {
          folders: [`${options.src}/components`, `${options.src}/layouts`, `${options.src}/templates`],
        },
        templates: {
          source: `${options.src}/templates`,
          destination: {
            path: options.dest,
            extension: options.ext,
          },
        },
        assets: {
          source: `${options.src}/assets`,
          destination: {
            path: `${options.dest}/assets`,
          },
        },
      },
    });

  return {
    name: 'maizzle:serve',
    configResolved: build,
    handleHotUpdate({ file }) {
      if (!file.startsWith(options.dest)) {
        build();
      }
    },
    configureServer(server) {
      setTimeout(() => {
        server.config.logger.info(
          `  ${colors.green('➜')}  ${colors.bold('Maizzle')}: ${colors.dim(`compiling ${colors.reset(relative(process.cwd(), options.src))} ${colors.dim('➜')} ${colors.reset(relative(process.cwd(), options.dest))}`)}`
        );
      }, 100);
    },
  };
};
