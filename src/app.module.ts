import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { CatsModule } from "./cats/cats.module";
import { HealthController } from "./core/health.controller";
import { EventsModule } from "./events/events.module";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    UsersModule,
    CatsModule,
    AuthModule,
    EventsModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [HealthController],
})
export class AppModule {}
