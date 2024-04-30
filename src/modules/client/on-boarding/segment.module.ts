import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as Joi from 'joi';
import { SegmentController } from './segment.controller.ts';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from 'src/providers/database';
import { SegmentService } from './segment.service.';
@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
      }),
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [SegmentController],
  providers: [SegmentService],
})
export class SegmentModule {}
