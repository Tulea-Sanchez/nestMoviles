import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './entities/vehicle.entity';

@Module({
  controllers: [VehicleController],
  providers: [VehicleService],
  imports: [
    TypeOrmModule.forFeature([ Vehicle ])
  ]
})
export class VehicleModule {}
