import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { OrmModule } from "@/orm/orm.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		ThrottlerModule.forRoot([
			{
				ttl: 15 * 60 * 1000, // 15 minutos
				limit: 100, // X peticiones por tiempo según ttl
			},
		]),
		OrmModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
