import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { Data } from './entities/datum.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sellers } from 'src/sellers/entities/seller.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Data, Sellers])],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
