import { v4 as uuidV4 } from "uuid";
import { hash } from "bcryptjs";
import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(user_id, name, email, password, "is_admin", driver_license)
    VALUES('${id}', 'Gian Carlos Ilchechen', 'admin@rentx.com.br', '${password}', true, 'XXXXXXXXXX')`
  );

  connection.close;
}

create().then(() => console.log("User admin created!"));
