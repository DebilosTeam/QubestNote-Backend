import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as session from 'express-session';
import * as passport from 'passport';

import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 360000,
        httpOnly: true
      }
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
