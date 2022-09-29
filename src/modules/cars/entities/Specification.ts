import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";


@Entity("specifications")
class Specification {

  @PrimaryColumn()
  specification_id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.specification_id) {
      this.specification_id = uuidV4();
    }
  }
}

export { Specification };
