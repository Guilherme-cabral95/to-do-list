import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({cors:'*'})
export class GoalGateway{

    @WebSocketServer()
    server: Server;


    notifyUpdateGoal(goal: any) {
        this.server.emit('goal', goal);
    }
}