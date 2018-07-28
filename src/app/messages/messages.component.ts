import { Component, ViewChild, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppState } from '../app.state';
import { MessagesService } from './messages.service';
import { NgxAutoScroll } from 'ngx-auto-scroll';

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
  private partnerImg: string;
  private messages: Array<Object>;
  private sendMessage: string;
  private appState = new AppState();
  @Input() selectedUser: Object;
  @Output() toStoreFromMessages = new EventEmitter();

  @ViewChild(NgxAutoScroll) ngxAutoScroll: NgxAutoScroll;

  public forceScrollDown(): void {
    this.ngxAutoScroll.forceScrollDown();
  }

  ngOnChanges(change: SimpleChanges) {
    this.showMessages();
    this.messagesService.getMyInfo().subscribe(response => {
      this.myInfo = response['Me'][0];
    });
  }

  showMessages(): void {
    this.appState.loadStart();
    this.messages = new Array();
    this.partnerId = this.selectedUser['USER_ID'];
    this.partnerName = this.selectedUser['USER_NAME'];
    this.partnerImg = this.selectedUser['PROFILE_IMAGE'];
    this.messagesService.getMessages(this.partnerId)
    .subscribe(response => {
      if (response['MESSAGES'].length !== 0) {
        for (let i = 0; i < response['MESSAGES'].length; i++) {
          this.messages.push(response['MESSAGES'][i]);
        }
        this.appState.loadEnd();
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
