import { Module } from '@nestjs/common';
import { GoalGateway } from './goal.gateway';

@Module({
    imports:[],
    providers:[GoalGateway],
    exports:[GoalGateway]
})

export class GatewayModule {}