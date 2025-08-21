/* eslint-disable prettier/prettier */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Item } from '../items/entities/item.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>,
  ) {}

  async onModuleInit(): Promise<void> {
    const userCount = await this.userRepo.count();
    if (userCount > 0) return;

    // create demo user
    const password = await bcrypt.hash('password123', 10);
    const user = this.userRepo.create({
      name: 'Demo User',
      email: 'demo@example.com',
      password,
    });
    const savedUser = await this.userRepo.save(user);

    // create demo items
    const items = this.itemRepo.create([
      {
        name: 'First Item',
        description: 'This is the first demo item.',
        user_id: savedUser.id,
      },
      {
        name: 'Second Item',
        description: 'This is the second demo item.',
        user_id: savedUser.id,
      },
    ]);
    await this.itemRepo.save(items);

    this.logger.log('Seeded demo user and items');
  }
}
