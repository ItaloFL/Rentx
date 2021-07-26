import { v4 as uuid } from 'uuid';
import { hash } from 'bcryptjs'
import '../index'
import createConnection  from '../index';


async function create(){
    const connection = await createConnection("localhost");

    const id = uuid()
    const password = await hash("admin", 8)

    await connection.query(
        `INSERT INTO USERS(id, name,  email, password, "isAdmin" , created_at, driver_liscense)
            values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXX')
        `
    )
}

create().then(() => console.log("User admin created"))