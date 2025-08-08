import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import type { Item } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto): Item {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  findAll(): Item[] {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Item {
    return this.itemsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto): Item {
    return this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Item {
    return this.itemsService.remove(+id);
  }
}
