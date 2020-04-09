import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActionMediator } from '../actions/action.mediator';
import { filter, map } from 'rxjs/operators';

export interface Room {
  id: string;
  name: string;
  players: object[];
}

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private url = 'http://127.0.0.1:4000';
  private socket: any;

  private currentRoom: Room = null;
  private rooms: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>([]);
  public rooms$ = this.rooms.asObservable();

  constructor(private action: ActionMediator) {
    this.socket = io(this.url);
  }

  public updateRoomsFromServer(rooms: Room[]) {
    this.rooms.next(rooms);
  }

  setCurrentRoom(room: Room) {
    this.currentRoom = room;
  }

  public getCurrentRoom() {
    return this.currentRoom;
  }

  public getOtherRooms() {
    return this.rooms$.pipe(map(items => {
      if (this.currentRoom == null) {
        return items;
      }

      return items.filter(item => item.id != this.currentRoom.id);
    }));
  }


  getIo() {
    return this.socket;
  }

  joinRoom(id: string, name = '') {
    //this.socket.nsp = '/director';
    this.socket.emit('joinRoom', { id: id, username: name });
  }

  createRoom(room: string) {
    //this.socket.nsp = '/director';
    this.socket.emit('createRoom', {
      name: room
    });
  }

  leaveRoom(id: string, playerId: string) {
    this.socket.emit('leaveRoom', {
      'id': id,
      'player_id': playerId
    });
    this.setCurrentRoom(null);
    // this.rooms.next(this.rooms.getValue());
  }

  on(socketEvent: any) {
    return new Observable((observer) => {
      this.socket.on(socketEvent, (data) => {
        if (data) {
          observer.next(data);
        } else {
          observer.error('Unable To Reach Server');
        }
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  mockOn(socketEvent: any, payload: any) {
    return new Observable((observer) => {
      observer.next(payload);
      return () => {
        observer.complete();
      };
    });
  }

  send(socketEvent: any, payload: any) {
    if(this.currentRoom){
      payload['room'] = this.currentRoom;
    }
    this.socket.emit(socketEvent, payload);
  }

  mockSend(socketEvent: any, payload: object) {
    this.action.do(payload['event'], payload['payload']);
  }
}
