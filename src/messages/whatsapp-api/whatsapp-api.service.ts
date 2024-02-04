import { Injectable } from '@nestjs/common';
import { ReceiveMessageWhatsAppDto } from './dto/whatsapp-api.dto';
import axios from 'axios';

@Injectable()
export class WhatsappApiService {
  create(receiveMessageWhatsAppDto: ReceiveMessageWhatsAppDto) {
    return 'This action adds a new whatsappApi';
  }

  findAll() {
    return `This action returns all whatsappApi`;
  }

  getTextUser(message) {
    let text = '';
    const typeOfMessage = message['type'];

    if (typeOfMessage === 'text') {
      text = message['text']['body'];
    } else if (typeOfMessage === 'interactive') {
      const interactiveObject = message['interactive'];
      interactiveObject['type'] === 'button_reply'
        ? (text = interactiveObject['button_reply']['title'])
        : interactiveObject['type'] === 'list_reply'
        ? (text = interactiveObject['list_reply']['title'])
        : '';
    } else {
      return 'error en obtener el texto en el mensaje del usuario...';
    }

    return text;
  }

  async sendMessagesWhatsapp(
    textResponse: string,
    number: string,
  ): Promise<any> {
    const data = JSON.stringify({
      messaging_product: 'whatsapp',
      to: number,
      text: {
        body: textResponse,
      },
      type: 'text',
    });

    const options = {
      method: 'post',
      url: 'https://graph.facebook.com/v18.0/221851531013038/messages',
      data: data,
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer EAAFFFrIkr5EBO9FDTZAiyzGvg3jZALCLVMmrsHZAL2EYW7lbXzFjPnKeCyc6WdXQVpZBLHUmEurZCqIuDYFZA79GcQwRria2le5BxU4ZCvZAbRYdSfZCOKgr6dAyn99ZCGZB9maQk0xhpiG2BVN9lK2qxeWot0nHBKIOc6J81tjgtCqm6WO3mZAvv0EFvtyPs2Rc52OZA',
      },
    };

    try {
      const response = await axios(options);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Error al enviar el mensaje a Facebook');
    }
  }

  // sendMessagesWhatsapp(textResponse, number) {
  // const data = JSON.stringify({
  //   "messaging_product": "whatsapp",
  //   "to": number,
  //   "text": {
  //     "body": textResponse
  //   },
  //   "type": "text"
  // });

  //   const options = {
  //     host: "graph.facebook.com",
  //     path: "/v18.0/221851531013038/messages",
  //     method: "POST",
  //     body: data,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer EAAFFFrIkr5EBO9FDTZAiyzGvg3jZALCLVMmrsHZAL2EYW7lbXzFjPnKeCyc6WdXQVpZBLHUmEurZCqIuDYFZA79GcQwRria2le5BxU4ZCvZAbRYdSfZCOKgr6dAyn99ZCGZB9maQk0xhpiG2BVN9lK2qxeWot0nHBKIOc6J81tjgtCqm6WO3mZAvv0EFvtyPs2Rc52OZA"
  //     }
  //   }

  //   // const req = https.request(options, res => res.on("data", data => process.stdout.write(data)))

  //   // req.on("error", error => console.log(error))

  //   // req.write(data)
  //   // req.end();

  // }
}
