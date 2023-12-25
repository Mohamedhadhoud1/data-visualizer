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
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'dataVisualizer',
      entities: [User, Data, Sellers],
      synchronize: false,
    }),
    DataModule,
    SellersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
