import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [UserModule, AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
