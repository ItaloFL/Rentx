import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
  const defaultOpitions = await getConnectionOptions();


  return await createConnection(
    Object.assign(defaultOpitions,{

      database: process.env.NODE_ENV === "test" ? "rentx_test" : defaultOpitions.database
    })
  )
}