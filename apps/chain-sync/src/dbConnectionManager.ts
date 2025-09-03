import { logger } from "@common/services/Logger";
import {
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  DB_TIMEZONE,
} from "@config/config";
import {
  Connection,
  getConnection as getTypeormConnection,
  createConnection as createTypeormConnection,
} from "typeorm";
import { entities } from "@common/entities/entities";

export class DbConnectionManager {
  private isConnecting = false;

  private connection?: Connection;

  public async awaitConnection(): Promise<Connection> {
    await this.createConnection();

    return new Promise((resolve, reject) => {
      const interval = 500;
      const intervalHandler = setInterval(() => {
        if (!this.isConnecting) {
          try {
            const connection = this.getConnection();
            if (connection) {
              resolve(connection);
            } else {
              reject(new Error("Connection not found."));
            }
          } catch (error) {
            reject(error);
          }
          clearInterval(intervalHandler);
        }
      }, interval);
    });
  }

  public getConnection(): Connection {
    if (this.connection) return this.connection;

    if (this.isConnecting) {
      throw new Error("Connection is still being established.");
    }

    this.connection = getTypeormConnection();
    if (!this.connection) {
      throw new Error("Connection not found.");
    }

    return this.connection;
  }

  private establishConnection() {
    const radixBase = 10;

    return createTypeormConnection({
      type: "mysql",
      host: DB_HOST,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: Number.parseInt(DB_PORT as string, radixBase),
      timezone: DB_TIMEZONE,
      logging: false,
      synchronize: false,
      charset: "UTF8MB4_UNICODE_CI",
      connectTimeout: 100000,
      extra: {
        acquireTimeout: 25000,
      },
      entities: [...entities],
      cli: {
        entitiesDir: "src/common/entities",
      },
    });
  }

  private async createConnection(): Promise<void> {
    if (this.isConnecting || this.connection) {
      return;
    }
    this.isConnecting = true;
    try {
      // tslint:disable-next-line
      console.time("db-connection-time");
      this.connection = await this.establishConnection();

      // tslint:disable-next-line
      console.timeEnd("db-connection-time");
      this.isConnecting = false;
      logger.info("Database connection established");
    } catch (error) {
      this.isConnecting = false;
      logger.error("DB Connection error ", error);
      throw error;
    }
  }
}

export const dbConnectionManager = new DbConnectionManager();
