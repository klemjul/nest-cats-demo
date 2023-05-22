import { Injectable } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { Cat } from "src/cats/cat.interface";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class EventsService {
  private readonly catSubscribers: Socket[] = [];

  addCatSubscripion(client: Socket) {
    const index = this.catSubscribers.indexOf(client);
    if (index == -1) {
      this.catSubscribers.push(client);
    }
  }
  removeCatSubscription(client: Socket) {
    const index = this.catSubscribers.indexOf(client);
    if (index !== -1) {
      this.catSubscribers.splice(index, 1);
    }
  }

  @OnEvent("cat.created")
  handleCatCreated(newCat: Cat) {
    this.catSubscribers.forEach((clientSocket) => {
      clientSocket.emit("cat.created", newCat);
    });
  }
}
