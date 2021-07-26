import { app } from '@shared/infra/http/app'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { hash } from 'bcryptjs'

import createConnection from '@shared/infra/http/typeorm'
import { Connection } from 'typeorm'

let connection: Connection

describe("List category controller", () => {
  
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = uuid()
    const password = await hash("italo112", 8)

    await connection.query(
        `INSERT INTO USERS(id, name,  email, password, "isAdmin" , created_at, driver_liscense)
            values('${id}', 'italo1234', 'italoadm@rentx.com', '${password}', true, 'now()', '2342342')
        `
    )

  })

  afterAll(async () => {
    await connection.dropDatabase()
     await connection.close()
  })

  it("should be able to list category",async () => {

    const responseToken = await request(app).post("/sesions").send({
      email: "italoadm@rentx.com",
      password: "italo112"
    })

    const { refresh_token } = responseToken.body

    await request(app).post("/categories").send({
      name: "test category supertest",
      description: "test category description"
    }).set({
      Authorization: `Bearer ${ refresh_token }`
    })
    

    const response = await request(app).get("/categories").set({
      Authorization: `Bearer ${ refresh_token }`
    });

    expect(response.status).toBe(200)
  })
})