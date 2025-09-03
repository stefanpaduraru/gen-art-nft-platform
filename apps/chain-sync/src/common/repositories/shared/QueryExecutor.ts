import { Connection, EntityManager } from 'typeorm';

export type QueryExecutor = EntityManager | Connection;
