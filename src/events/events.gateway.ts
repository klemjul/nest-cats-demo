import { Logger } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { EventsService } from "./events.service";

@WebSocketGateway()
export class EventsGateway {
  constructor(private eventsService: EventsService) {}
  private readonly logger = new Logger(EventsGateway.name);

  @WebSocketServer()
  server: Server;

  @SubscribeMessage("cat.subscribe")
  subToCatEvents(@ConnectedSocket() socket: Socket) {
    this.eventsService.addCatSubscripion(socket);
    this.logger.log(`${socket.id} subsribe to cats events`);
  }

  @SubscribeMessage("cat.unsubscribe")
  unsubToCatEvents(@ConnectedSocket() socket: Socket) {
    this.eventsService.removeCatSubscription(socket);
    this.logger.log(`${socket.id} unsubsribe cats events`);
  }
}
