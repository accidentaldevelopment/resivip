import convict from 'convict';

export interface Config {
  /**
   * New-style connection URL for mongodb.
   */
  dbUrl: string;

  /**
   * Server listen address
   */
  host: string;

  /**
   * Server listen port
   */
  port: number;
}

const convictConfig = convict<Config>({
  dbUrl: {
    default: 'mongodb://localhost/development',
    doc: 'mongodb url',
    env: 'DB_URL',
  },
  host: {
    default: '0.0.0.0',
    env: 'HOST',
  },
  port: {
    default: 4000,
    env: 'PORT'
  }
});

const config: Config = {
  dbUrl: convictConfig.get('dbUrl'),
  host: convictConfig.get('host'),
  port: convictConfig.get('port')
};

export { config as default };
