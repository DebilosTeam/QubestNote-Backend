import { 
    Entity,
    BeforeInsert,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn
} from 'typeorm';
import * as argon2 from "argon2";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;
    
    @Column({ unique: true })
    email: string;
    
    @Column()
    password: string;
    
    @CreateDateColumn()
    createdAt: Date;
    
    @Column({ nullable: true })
    secretKey: string;
    
    @Column({ default: false })
    totpStatus: boolean;
    
    @Column({ default: false })
    emailConfirmed: boolean;
    
    @Column({ nullable: true })
    confirmationToken: string;
    
    @Column({ default: false })
    isDisabled: boolean;
    
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