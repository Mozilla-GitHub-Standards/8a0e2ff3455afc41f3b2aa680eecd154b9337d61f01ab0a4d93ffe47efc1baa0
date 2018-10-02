import winston from "winston";
import convict from "convict";

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.simple()
  )
});

const SCHEMA = {
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 8888,
    env: "PORT",
    arg: "port"
  },
  shutdownTimeout: {
    doc: "Grace period after SIGINT/SIGTERM.",
    format: "duration",
    default: 1000,
    env: "SHUTDOWN_TIMEOUT"
  },
  elasticHost: {
    doc: "ES host with port.",
    format: "String",
    default: null,
    env: "ELASTIC_HOST"
  },
  elasticIndex: {
    doc: "ES index name.",
    format: "String",
    default: "dino-tree",
    env: "ELASTIC_INDEX"
  },
  dummyJson: {
    doc: "File containing dummy Json data.",
    format: "String",
    default: null,
    env: "DUMMY_JSON"
  }
};

function load(configFile) {
  const CONFIG = convict(SCHEMA);
  try {
    if (configFile) {
      CONFIG.loadFile(configFile);
    }
    CONFIG.validate({ allowed: "strict" });
    return CONFIG.getProperties();
  } catch (e) {
    throw new Error(`error reading config: ${e}`);
  }
}

export { load, logger };
