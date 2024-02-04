import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhatsappApiModule } from './messages/whatsapp-api/whatsapp-api.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [WhatsappApiModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
