import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { WhatsappApiService } from './whatsapp-api.service';
import { Request, Response } from 'express';

@Controller('whatsapp-api')
export class WhatsappApiController {
  constructor(private readonly whatsappApiService: WhatsappApiService) {}

  @Get()
  verifyToken(@Query() req: Request, @Res() res: Response) {
    try {
      const accessToken = 'LKJ124JH124J1K2';
      const token = req['hub.verify_token'];
      const challenge = req['hub.challenge'];

      if (token === accessToken && token !== null && challenge !== null) {
        return res.send(challenge);
      } else {
        return res.status(HttpStatus.BAD_REQUEST).send();
      }
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Post()
  async receivedMessage(@Body() req, @Res() res: Response) {
    console.log("entra")
    console.log(req)
    try {
      const entry = req.entry[0];
      const changes = entry.changes[0];
      const value = changes.value;
      const messageObject = value.messages;
      console.log("messageObject", messageObject[0].from)
      
      
      if (typeof messageObject !== 'undefined') {
        const text = this.whatsappApiService.getTextUser(messageObject[0]);
        console.log("this.whatsappApiService.getTextUser", text)
        this.whatsappApiService.sendMessagesWhatsapp(
          `Hola ${messageObject[0].from} enviaste un mensaje diciendo: ${text}.`,
          messageObject[0].from,
        ).subscribe()
        console.log("exito")
      } else {
        console.log("error on try")
      }
      return res.send('EVENT_RECEIVED');
    } catch (error) {
      console.log("error en catch")
      return res.send('EVENT_RECEIVED');
    }
  }
}
