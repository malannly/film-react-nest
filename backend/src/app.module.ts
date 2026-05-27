import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'node:path';

import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const dbUrl = new URL(
          config.get<string>('DATABASE_URL') ||
            'postgres://localhost:5432/prac',
        );
        return {
          type: config.get<'postgres'>('DATABASE_DRIVER'),
          host: dbUrl.hostname,
          port: parseInt(dbUrl.port || '5432'),
          database: dbUrl.pathname.slice(1),
          username: config.get<string>('DATABASE_USERNAME') || 'prac',
          password: config.get<string>('DATABASE_PASSWORD') || '1234',
          autoLoadEntities: true,
          synchronize: false,
        };
      },
    }),

    FilmsModule,
    OrderModule,

    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
    }),
  ],
})
export class AppModule {}
