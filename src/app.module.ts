import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhatsappApiModule } from './messages/whatsapp-api/whatsapp-api.module';

@Module({
  imports: [WhatsappApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
