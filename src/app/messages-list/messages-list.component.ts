import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessagesListService } from './messages-list.service';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {

  matchUsers: Array<Object> = new Array();
  constructor(private messagesListService: MessagesListService) { }
  @Output() messageToSelectedUser = new EventEmitter();

  ngOnInit() {
    this.setMatchUsers();
  }

  setMatchUsers() {
    this.messagesListService.fetchMatchUsers().subscribe(response => {
      for (let i = 0; i < response['MatchUser'].length; i++) {
        this.matchUsers.push(response['MatchUser'][i]);
      }
    });
  }

  onSelectUser(user) {
    this.messageToSelectedUser.emit(user);
  }
}
