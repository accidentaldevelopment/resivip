import convict from 'convict';

export interface Config {
  /**
   * New-style connection URL for mongodb.
   */
  dbUrl: string;
}

const convictConfig = convict<Config>({
  dbUrl: {
    doc: 'mongodb url',
    env: 'DB_URL',
    default: 'mongodb://localhost/development'
  }
});

const config: Config = {
  dbUrl: convictConfig.get('dbUrl')
};

export { config as default };
