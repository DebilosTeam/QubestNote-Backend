import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        host: "localhost",
        migrations: ['/migrations/*{.ts,.js}'],
        migrationsTableName: '_migrations',
        port: (config.get<number>('POSTGRES_PORT')),
        username: (config.get<string>('POSTGRES_USER')),
        password: (config.get<string>('POSTGRES_PASSWORD')),
        database: (config.get<string>('POSTGRES_DB')),
        autoLoadEntities: true,
        synchronize: true
      }),
      inject: [ConfigService],
    }),
  ],
})

export class DatabaseModule {}
