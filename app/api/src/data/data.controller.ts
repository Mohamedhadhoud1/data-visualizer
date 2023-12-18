import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDatumDto } from './dto/create-datum.dto';
import { UpdateDatumDto } from './dto/update-datum.dto';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post('addAll')
  addAll(@Body() createDatumDto: CreateDatumDto[]) {
    return this.dataService.addAll(createDatumDto);
  }
  @Post('addOne')
  addOne(@Body() createDatumDto: CreateDatumDto) {
    return this.dataService.addOne(createDatumDto);
  }

  @Get()
  findAll() {
    return this.dataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataService.findOne(+id);
  }
  @Get('seller/:sellerName')
  findAllThat(@Param('sellerName') name: string) {
    return this.dataService.findAllThat(name);
  }
  @Get('subAndMain/:sellerName')
  async getDataBySellerName(@Param('sellerName') sellerName: string) {
    try {
      const result =
        await this.dataService.findSubSellersAndMainSellersData(sellerName);
      return result;
    } catch (error) {
      console.error(`Error fetching data for seller ${sellerName}:`, error);
      throw new InternalServerErrorException(
        'An error occurred while fetching data.',
      );
    }
  }
  @Get('sub/:sellerName')
  async getSubDataBySellerName(@Param('sellerName') sellerName: string) {
    try {
      const result = await this.dataService.findSubSellersData(sellerName);
      return result;
    } catch (error) {
      console.error(`Error fetching data for seller ${sellerName}:`, error);
      throw new InternalServerErrorException(
        'An error occurred while fetching data.',
      );
    }
  }
  @Get('subInd/:sellerName')
  async getSubIndDataBySellerName(@Param('sellerName') sellerName: string) {
    try {
      const result =
        await this.dataService.findIndividualSubSellersData(sellerName);
      return result;
    } catch (error) {
      console.error(`Error fetching data for seller ${sellerName}:`, error);
      throw new InternalServerErrorException(
        'An error occurred while fetching data.',
      );
    }
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatumDto: UpdateDatumDto) {
    return this.dataService.update(+id, updateDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataService.remove(+id);
  }
}
