import { Component, signal, OnInit } from '@angular/core';
import { Topbar } from '../topbar/topbar';
import { Button } from '../button/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-page-contract-summary',
  imports: [Topbar, Button, FormsModule],
  templateUrl: './page-contract-summary.html',
})
export class PageContractSummary implements OnInit {
  chatHistory = signal<string[]>([]);

  messageInput = signal<string>('');

  ngOnInit() {
    this.addMessage('Hola, ¿qué me puedes decir acerca de este contrato?');
  }

  async processAddMessage() {
    const msg = this.messageInput();
    this.messageInput.set('');
    this.chatHistory.set([...this.chatHistory(), msg, '...']);
    await this.addMessage(msg);
  }

  async addMessage(msg: string) {
    const query = await fetch(
      window.location.origin +
        '/contract-chatbot?' +
        new URLSearchParams({ message: msg }).toString(),
    );
    const answer = await query.json();
    this.chatHistory.set(answer);
  }
}
