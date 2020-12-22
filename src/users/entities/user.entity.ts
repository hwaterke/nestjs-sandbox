import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string

  @Column()
  email!: string

  @Column()
  password!: string
}
