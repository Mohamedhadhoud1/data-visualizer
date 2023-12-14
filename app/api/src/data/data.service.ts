import { Injectable } from '@nestjs/common';
import { CreateDatumDto } from './dto/create-datum.dto';
import { UpdateDatumDto } from './dto/update-datum.dto';
import { Data } from './entities/datum.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Data)
    private dataRepository: Repository<Data>,
  ) {}

  async addAll(createDatumDto: CreateDatumDto[]) {
    return await this.dataRepository.save(createDatumDto);
  }
  async addOne(createDatumDto: CreateDatumDto) {
    return await this.dataRepository.save(createDatumDto);
  }

  findAll() {
    return this.dataRepository.find();
  }

  findOne(id: number): Promise<Data | null> {
    return this.dataRepository.findOneBy({ id });
  }

  update(id: number, updateDatumDto: UpdateDatumDto) {
    return this.dataRepository.update(id, updateDatumDto);
  }

  remove(id: number) {
    return this.dataRepository.delete(id);
  }
  findAllThat(user: string): Promise<CreateDatumDto[]> {
    return this.dataRepository.find({
      where: {
        seller: user,
      },
    });
  }
}
