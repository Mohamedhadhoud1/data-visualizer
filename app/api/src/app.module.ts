import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { DataModule } from './data/data.module';
import { Data } from './data/entities/datum.entity';
import { SellersModule } from './sellers/sellers.module';
import { Sellers } from './sellers/entities/seller.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'monorail.proxy.rlwy.net',
      port: 43405,
      username: 'postgres',
      password: 'adGbe6C4b3Dg-F5gd3f3-ebBb256-bEg',
      database: 'railway',
      entities: [User, Data, Sellers],
      synchronize: false,
      extra: {
        connectionLimit: 5,
      },
    }),
    DataModule,
    SellersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
