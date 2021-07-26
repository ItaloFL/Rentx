import { app } from '@shared/infra/http/app'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { hash } from 'bcryptjs'

import createConnection from '@shared/infra/http/typeorm'
import { Connection } from 'typeorm'

let connection: Connection

describe("Create category controller", () => {
  
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = uuid()
    const password = await hash("admin", 8)

    await connection.query(
        `INSERT INTO USERS(id, name,  email, password, "isAdmin" , created_at, driver_liscense)
            values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXX')
        `
    )

  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it("should be able to create a new category",async () => {

    const responseToken = await request(app).post("/sesions").send({
      email: "admin@rentx.com",
      password: "admin"
    })

    const { refresh_token } = responseToken.body

    const response = await request(app).post("/categories").send({
      name: "test category supertest",
      description: "test category description"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    })

    expect(response.status).toBe(201)
  })

  it("should not be able to create a new category if she already exist",async () => {

    const responseToken = await request(app).post("/sesions").send({
      email: "admin@rentx.com",
      password: "admin"
    })

    const { refresh_token } = responseToken.body


    const response = await request(app).post("/categories").send({
      name: "test category supertest",
      description: "test category description"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    })

    expect(response.status).toBe(400)
  })
})