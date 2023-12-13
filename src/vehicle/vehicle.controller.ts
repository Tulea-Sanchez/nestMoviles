import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';

import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { title } from 'process';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './entities/vehicle.entity';


@Controller('vehicles')
export class VehicleController {
  vehicleRepository: any;
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  create(@Body() createvehicleDto: CreateVehicleDto) {
    console.log(createvehicleDto);
    return this.vehicleService.create(createvehicleDto);
  }

  @Get()
  async findAll(): Promise<Vehicle[]> {
    return this.vehicleService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleService.findOne(id);
  }

  @Get('find-by-title/:plate')
  async findByTitle(@Param('plate') plate: string) {
    const vehicles = await this.vehicleService.findByTitle(plate);
    return { vehicles };
  }

    
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatevehicleDto: UpdateVehicleDto) {
    return this.vehicleService.update(id, updatevehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(id);
  }


  // @Post('Request-the-chef')
  // findOneByTitle(@Body() body: { title: string }) {
  //   return this.vehicleService.findByTitle(body.title);
  // }

  // @Get('last-searched')
  // async getLastSearchedvehicle() {
  //   return this.vehicleService.findLastSearched();
  // }

  // @Get('random-vehicles')
  // async getRandomvehicles() {
  //   return this.vehicleService.findRandomvehicles();
  // }

  // @Post('vehicle-from-country')
  // async getvehicleFromCountry(@Body() body: { country: string; excludeTitle: string }) {
  //   return this.vehicleService.findvehicleFromCountry(body.country, body.excludeTitle);
  // }

  

}
