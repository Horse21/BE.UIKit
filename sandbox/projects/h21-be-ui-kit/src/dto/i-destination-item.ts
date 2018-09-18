import { IEntity } from './entity/i-entity';
export interface IDestinationItem extends IEntity {
    type: string;
    name: string;
    description: string;
}