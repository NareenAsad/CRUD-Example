import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createItemDto: CreateItemDto, userId: number): Promise<Item> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const item = this.itemRepo.create({ ...createItemDto, user });
    return await this.itemRepo.save(item);
  }

  async findAll(): Promise<Item[]> {
    return this.itemRepo.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Item> {
    const item = await this.itemRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.findOne(id);
    Object.assign(item, updateItemDto);
    return await this.itemRepo.save(item);
  }

  async remove(id: number): Promise<Item> {
    const item = await this.findOne(id);
    await this.itemRepo.remove(item);
    return item;
  }

  async findAllByUser(userId: number): Promise<Item[]> {
    return this.itemRepo.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async findOwnerByItemId(itemId: number): Promise<User> {
    const item = await this.findOne(itemId);
    return item.user;
  }
}
