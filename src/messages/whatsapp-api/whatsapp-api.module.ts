import { Module } from '@nestjs/common';
import { WhatsappApiService } from './whatsapp-api.service';
import { WhatsappApiController } from './whatsapp-api.controller';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule],
  controllers: [WhatsappApiController],
  providers: [WhatsappApiService],
})
export class WhatsappApiModule {}
