import convict from 'convict';

export interface Config {
  /**
   * New-style connection URL for mongodb.
   */
  dbUrl: string;
}

const convictConfig = convict<Config>({
  dbUrl: {
    default: 'mongodb://localhost/development',
    doc: 'mongodb url',
    env: 'DB_URL',
  }
});

const config: Config = {
  dbUrl: convictConfig.get('dbUrl')
};

export { config as default };
