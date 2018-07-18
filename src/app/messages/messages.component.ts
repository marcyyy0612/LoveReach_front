import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MessagesService } from './messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

export class MessagesComponent implements OnChanges {

  constructor(private messagesService: MessagesService) { }

  private myInfo;
  private partnerId: number;
  private partnerName: string;
  private messages: Array<Object>;
  private sendMessage: string;
  @Input() selectedUser: Object;
  @Output() toStoreFromMessages = new EventEmitter();

  ngOnChanges(change: SimpleChanges) {
    this.showMessages();
    this.messagesService.getMyInfo().subscribe(response => {
      this.myInfo = response['Me'][0];
      console.log(this.myInfo);
    });
  }

  showMessages(): void {
    this.messages = new Array();
    this.partnerId = this.selectedUser['USER_ID'];
    this.partnerName = this.selectedUser['USER_NAME'];
    this.messagesService.getMessages(this.partnerId)
    .subscribe(response => {
      if (response['MESSAGES'].length !== 0) {
        for (let i = 0; i < response['MESSAGES'].length; i++) {
          this.messages.push(response['MESSAGES'][i]);
        }
      }
    });
  }

  onSendClick(): void {
    this.messagesService.sendMessages(this.sendMessage, this.partnerId)
    .subscribe(response => {
      this.showMessages();
    });
  }

  onBackClick(): void {
    this.toStoreFromMessages.emit(true);
  }
}
