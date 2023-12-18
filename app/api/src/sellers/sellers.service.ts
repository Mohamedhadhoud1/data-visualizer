import { Injectable } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sellers } from './entities/seller.entity';

@Injectable()
export class SellersService {
  constructor(
    @InjectRepository(Sellers)
    private readonly sellerRepository: Repository<Sellers>,
  ) {}

  async addAll(createSellerDto: CreateSellerDto[]) {
    return await this.sellerRepository.save(createSellerDto);
  }
  async addOne(createSellerDto: CreateSellerDto) {
    return await this.sellerRepository.save(createSellerDto);
  }

  findAll() {
    return this.sellerRepository.find();
  }

  findOne(id: number): Promise<Sellers | null> {
    return this.sellerRepository.findOneBy({ id });
  }

  update(id: number, updateSellerDto: UpdateSellerDto) {
    return this.sellerRepository.update(id, updateSellerDto);
  }

  remove(id: number) {
    return this.sellerRepository.delete(id);
  }
}
