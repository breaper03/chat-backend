import { Module } from '@nestjs/common';
import { WhatsappApiService } from './whatsapp-api.service';
import { WhatsappApiController } from './whatsapp-api.controller';

@Module({
  controllers: [WhatsappApiController],
  providers: [WhatsappApiService],
})
export class WhatsappApiModule {}
