import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { Item } from '../items/entities/item.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>,
  ) {}

  async onModuleInit(): Promise<void> {
    const userCount = await this.userRepo.count();
    if (userCount > 0) return;

    const password = await bcrypt.hash('password123', 10);
    const user = this.userRepo.create({
      name: 'Demo User',
      email: 'demo@example.com',
      password,
    });
    const savedUser = await this.userRepo.save(user);

    const item1 = this.itemRepo.create({
      name: 'First Item',
      description: 'This is the first demo item.',
      user: savedUser,
    });
    const item2 = this.itemRepo.create({
      name: 'Second Item',
      description: 'This is the second demo item.',
      user: savedUser,
    });
    await this.itemRepo.save([item1, item2]);

    this.logger.log('Seeded demo user and items');
  }
}
