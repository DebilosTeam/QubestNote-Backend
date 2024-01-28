import {
    Entity,
    Unique,
    BeforeInsert,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn
} from 'typeorm';

import * as argon2 from 'argon2';

@Entity('users')
@Unique(['username', 'email'])
export class Users {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    username: string;
    
    @Column()
    email: string;
    
    @Column()
    password: string;
    
    @CreateDateColumn()
    createdat: Date;
    
    @Column({ nullable: true })
    secretkey: string;
    
    @Column({ default: false })
    totpstatus: boolean;
    
    @Column({ default: false })
    emailconfirmed: boolean;
    
    @Column({ nullable: true })
    confirmationtoken: string;
    
    @Column({ default: false })
    isdisabled: boolean;
    
    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
          this.password = await argon2.hash(
            this.password
          );
        }
    }

    constructor(users: Partial<Users>) {
        Object.assign(this, users);
    }
}