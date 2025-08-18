import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createItemDto: CreateItemDto, userId: number): Promise<Item> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    const item = this.itemRepository.create({ ...createItemDto, user });
    return this.itemRepository.save(item);
  }

  async findAll(): Promise<Item[]> {
    return this.itemRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Item> {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!item) throw new NotFoundException('Item not found');
    Object.assign(item, updateItemDto);
    return this.itemRepository.save(item);
  }

  async remove(id: number): Promise<Item> {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!item) throw new NotFoundException('Item not found');
    await this.itemRepository.remove(item);
    return item;
  }

  async findAllByUser(userId: number): Promise<Item[]> {
    return this.itemRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async findOwnerByItemId(itemId: number): Promise<UserEntity> {
    const item = await this.itemRepository.findOne({
      where: { id: itemId },
      relations: ['user'],
    });
    if (!item) throw new NotFoundException('Item not found');
    return item.user;
  }
}
