
import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Like, Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehicleService {

  private readonly logger = new Logger('VehiclesServices');

  constructor(

    @InjectRepository(Vehicle)
    private readonly VehicleRepository: Repository<Vehicle>,
    
  ) {
  }

  async create(createVehicleDto: CreateVehicleDto) {
    
    const newVehicle = this.VehicleRepository.create({
      plate: createVehicleDto.plate,
      description: createVehicleDto.description,
    });
    const recipe = this.VehicleRepository.create(newVehicle);
    await this.VehicleRepository.save( recipe );

    return recipe;

  }


  async findAll(): Promise<Vehicle[]> {
    try {
        const vehicles = await this.VehicleRepository
            .createQueryBuilder('vehicle')
            .getMany();

        return vehicles;
    } catch (error) {
        this.handleExceptions(error);
        throw error;
    }
}


  
  

  async findOne(id: string): Promise<Vehicle | undefined> {
    const options: FindOneOptions<Vehicle> = {
      where: { id },
    };
    const Vehicle = await this.VehicleRepository.findOne(options);
    return Vehicle;
  }


  async findByTitle(plate: string): Promise<Vehicle | null> {
    const vehicle = await this.VehicleRepository.findOne({ where: { plate } });
    
    if (!vehicle) {
      return null;
    }
  
    return vehicle;
  }
  
  


  async update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    const vehicle = await this.VehicleRepository.findOne({ where: { id: id } });
  
    if (!vehicle) {
      throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
    }
  
    this.VehicleRepository.merge(vehicle, updateVehicleDto);
    return this.VehicleRepository.save(vehicle);
  }
  
  
  

  async remove(id: string): Promise<void> {
    const result = await this.VehicleRepository.delete(id);
  
    if (result.affected === 0) {
      throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
    }
  }
  

  private handleExceptions ( error : any) {
    if ( error.code === '23505')
        throw new BadRequestException(error.detail);

      this.logger.error(error);
      throw new InternalServerErrorException('check server logs !')
  }

}
