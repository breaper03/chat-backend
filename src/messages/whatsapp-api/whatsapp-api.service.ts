import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';

@Injectable()
export class WhatsappApiService {
  constructor(private readonly httpService: HttpService) {}

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

  sendMessagesWhatsapp(textResponse: string, number: string): Observable<any> {
    const data = JSON.stringify({
      messaging_product: 'whatsapp',
      to: number,
      text: {
        body: textResponse,
      },
      type: 'text',
    });

    const url = 'https://graph.facebook.com/v18.0/221851531013038/messages';
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer EAAFFFrIkr5EBO9FDTZAiyzGvg3jZALCLVMmrsHZAL2EYW7lbXzFjPnKeCyc6WdXQVpZBLHUmEurZCqIuDYFZA79GcQwRria2le5BxU4ZCvZAbRYdSfZCOKgr6dAyn99ZCGZB9maQk0xhpiG2BVN9lK2qxeWot0nHBKIOc6J81tjgtCqm6WO3mZAvv0EFvtyPs2Rc52OZA',
    };

    return this.httpService
      .post(url, data, { headers })
      .pipe
      // Puedes realizar transformaciones adicionales aquí si es necesario
      ();
  }
}
