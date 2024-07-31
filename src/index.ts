import { Plugin } from 'vite';
import { toDisk } from '@maizzle/framework/src/generators/output';
import colors from 'picocolors';

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
    handleHotUpdate: build,
    configureServer(server) {
      setTimeout(() => {
        server.config.logger.info(
          `  ${colors.green('➜')}  ${colors.bold('Maizzle')}: compiling ${colors.dim(options.src)} ➜ ${colors.dim(options.dest)}`
        );
      }, 100);
    },
  };
};
