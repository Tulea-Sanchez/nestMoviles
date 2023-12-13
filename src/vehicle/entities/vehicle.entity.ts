import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vehicle {

    @PrimaryGeneratedColumn( 'uuid' )
    id: string;


    @Column( {
        type: 'text',
    })
    plate: string;


    @Column( {
        type: 'text',
    })
    description: string;

}

