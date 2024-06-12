import {Injectable, Logger, NotFoundException, OnModuleInit} from '@nestjs/common';
import {PrismaClient} from "@prisma/client";

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {PaginationParams} from "../../common/services/pagination.params";

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger("ProductService");

  onModuleInit() {
    this.$connect();
    this.logger.log("Database connected");
  }

  async create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto
    });
  }

  async findAll(params: PaginationParams) {
    const {page, limit} = params;

    const total = await this.product.count();
    const lastPage = Math.ceil(total / limit);

    const result =  await this.product.findMany({
      take: limit,
      skip: Math.floor((page - 1) * params.limit),
      where: {
        available: true,
      }
    });

    return {
      data: result,
      meta: {
        page,
        total,
        lastPage
      }
    }
  }

  async findOne(id: string) {
    const result = await this.product.findUnique({
      where: {
        id
      }
    });

    if(!result || !result.available) { throw new NotFoundException(`Product ${id} not found`)}

    return result;
  }

  async update(updateProductDto: UpdateProductDto) {
    const { id, ...data} = updateProductDto
    await this.findOne(id);

    return this.product.update({
      where: {id},
      data: data
    })
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.product.update({
      where: {id},
      data: {
        available: false,
      }
    })
  }
}
