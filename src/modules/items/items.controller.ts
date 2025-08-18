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
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post(':userId')
  create(
    @Param('userId') userId: string,
    @Body() createItemDto: CreateItemDto,
  ): Promise<Item> {
    return this.itemsService.create(createItemDto, +userId);
  }

  @Get()
  findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Item> {
    return this.itemsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<Item> {
    return this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Item> {
    return this.itemsService.remove(+id);
  }

  @Get('user/:userId')
  findAllByUser(@Param('userId') userId: string): Promise<Item[]> {
    return this.itemsService.findAllByUser(+userId);
  }

  @Get(':id/user')
  findOwner(@Param('id') id: string) {
    return this.itemsService.findOwnerByItemId(+id);
  }
}
