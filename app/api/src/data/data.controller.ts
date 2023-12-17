import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  @Get(':sellerName')
  async getDataBySellerName(@Param('sellerName') sellerName: string) {
    return this.dataService.getDataBySellerName(sellerName);
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
