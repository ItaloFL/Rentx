import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = "database_ignite"): Promise<Connection> => {
  const defaultOpitions = await getConnectionOptions();


  return createConnection(
    Object.assign(defaultOpitions,{
      host: process.env.NODE_ENV === "test" ? "localhost" : host,
      database: process.env.NODE_ENV === "test" ? "rentx_test" : defaultOpitions.database
    })
  )
}