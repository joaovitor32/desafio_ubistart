import { HttpModule, HttpService } from '@nestjs/axios';

import { AddressModule } from 'src/address/address.module';
import { AddressService } from 'src/address/address.service';
import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService, PrismaService, AddressService],
  controllers: [UserController],
  imports: [HttpModule, AddressModule],
})
export class UserModule { }
