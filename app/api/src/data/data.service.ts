import { Injectable } from '@nestjs/common';
import { CreateDatumDto } from './dto/create-datum.dto';
import { UpdateDatumDto } from './dto/update-datum.dto';
import { Data } from './entities/datum.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Sellers } from 'src/sellers/entities/seller.entity';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Data)
    private dataRepository: Repository<Data>,
    @InjectRepository(Sellers)
    private readonly sellerRepository: Repository<Sellers>,
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

  async findSubSellersData(sellerName: string): Promise<Data[]> {
    const mainSeller = await this.sellerRepository.findOne({
      where: { mainSellerName: sellerName },
    });

    if (!mainSeller) {
      return [];
    }

    const subSellers = await this.sellerRepository.find({
      where: { mainSellerName: sellerName },
    });

    const sellers = [mainSeller, ...subSellers];
    const sellerNames = sellers.map(
      (seller) => seller.subSellerName || seller.mainSellerName,
    );
    return this.dataRepository
      .createQueryBuilder('data')
      .where('data.seller IN (:...sellerNames)', { sellerNames })
      .orWhere('data.name IN (:...sellerNames)', { sellerNames }) // Include sub-sellers in the 'name' column
      .getMany();
  }
  async findSubSellersAndMainSellersData(sellerName: string): Promise<Data[]> {
    const mainSeller = await this.sellerRepository.findOne({
      where: { mainSellerName: sellerName },
    });

    if (!mainSeller) {
      return [];
    }

    const subSellers = await this.sellerRepository.find({
      where: { mainSellerName: sellerName },
    });

    const sellers = [mainSeller, ...subSellers];
    let sellerNames = sellers.map(
      (seller) => seller.subSellerName || seller.mainSellerName,
    );
    sellerNames = [sellerName, ...sellerNames];
    return this.dataRepository
      .createQueryBuilder('data')
      .where('data.seller IN (:...sellerNames)', { sellerNames })
      .orWhere('data.name IN (:...sellerNames)', { sellerNames }) // Include sub-sellers in the 'name' column
      .getMany();
  }
}
