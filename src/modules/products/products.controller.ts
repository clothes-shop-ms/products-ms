import {Controller, Param, Query} from '@nestjs/common';
import {MessagePattern, Payload} from "@nestjs/microservices";

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {GetParams} from "../../common/controllers/dto";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: '@product/create'})
  async create(@Payload() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @MessagePattern({cmd: '@product/find_all'})
  async findAll(@Payload() findParams: GetParams) {
    console.log('Find params:', findParams);
    return this.productsService.findAll({page: findParams.pagination.page, limit: findParams.pagination.limit});
  }

  @MessagePattern({cmd: '@product/find_one'})
  findOne(@Payload('id') id: string) {
    return this.productsService.findOne(id);
  }

  @MessagePattern({ cmd: '@product/update'})
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto);
  }

  @MessagePattern({ cmd: '@product/delete'})
  remove(@Payload('id') id: string) {
    return this.productsService.remove(id);
  }
}
