import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { AbstractEntity } from '@common/entities/AbstractEntity';
import { Project } from './Project';

export enum TransferTypes {
  Testnet = 'testnet',
  Mainnet = 'mainnet',
}

export enum TransferStateTypes {
  Created = 'created',
  Approved = 'approved',
  Denied = 'denied',
}

@Entity()
export class TransferRequest extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.transferRequests)
  project?: Project;

  @Column({
    type: 'enum',
    default: TransferTypes.Testnet,
    enum: TransferTypes,
  })
  type: TransferTypes;

  @Column({
    type: 'enum',
    default: TransferStateTypes.Created,
    enum: TransferStateTypes,
  })
  state: TransferStateTypes;

  @Column()
  comments?: string;

  constructor(
    id: number,
    type: TransferTypes,
    state: TransferStateTypes = TransferStateTypes.Created,
  ) {
    super();
    this.id = id;
    this.type = type;
    this.state = state;
  }
}
