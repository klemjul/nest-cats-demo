import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "src/auth/auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { CreateCatDto } from "./cat.dto";
import { Cat } from "./cat.interface";
import { CatsService } from "./cats.service";
import { EventEmitter2 } from "@nestjs/event-emitter";

// @UseGuards(RolesGuard)
@Controller("cats")
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private eventEmitter: EventEmitter2
  ) {}

  // @Roles("admin")
  @Delete(":uuid")
  @HttpCode(204)
  async delete(@Param("uuid", new ParseUUIDPipe()) uuid: string) {
    const cat = this.catsService.find(uuid);
    if (!cat) {
      throw new NotFoundException();
    }
    this.catsService.delete(cat);
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    const newCat = this.catsService.create(createCatDto);
    this.eventEmitter.emit("cat.created", newCat);
    return newCat;
  }

  @Get()
  async getAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(":uuid")
  async getOne(
    @Param("uuid", new ParseUUIDPipe())
    uuid: string
  ): Promise<Cat> {
    const cat = this.catsService.find(uuid);
    if (!cat) {
      throw new NotFoundException();
    }
    return cat;
  }
}
