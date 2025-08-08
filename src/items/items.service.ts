import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

export interface Item {
  id: number;
  name: string;
  description: string;
}

@Injectable()
export class ItemsService {
  private items: Item[] = [];
  private idCounter = 1;

  create(createItemDto: CreateItemDto) {
    const item = {
      id: this.idCounter++,
      ...createItemDto,
    };
    this.items.push(item);
    return item;
  }

  findAll() {
    return this.items;
  }

  findOne(id: number) {
    const item = this.items.find((i) => i.id === id);
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    const index = this.items.findIndex((i) => i.id === id);
    if (index === -1) throw new NotFoundException('Item not found');

    const updatedItem = { ...this.items[index], ...updateItemDto };
    this.items[index] = updatedItem;
    return updatedItem;
  }

  remove(id: number) {
    const index = this.items.findIndex((i) => i.id === id);
    if (index === -1) throw new NotFoundException('Item not found');
    const removed = this.items.splice(index, 1);
    return removed[0];
  }
}
