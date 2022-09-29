import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuidV4} from "uuid"


@Entity("users")
class User {

  @PrimaryColumn()
  user_id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  driver_license: string;

  @Column()
  is_admin: boolean;

  @CreateDateColumn()
  created_at: Date;

  constructor(){
    if(!this.user_id) {
      this.user_id = uuidV4()
    }
  }

}

export { User }