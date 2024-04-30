import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule, Routes } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import configuration from 'config/configuration';
import { LoggerModule } from './logger/logger.module';
import { DatabaseModule } from './providers/database/db.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/filters/exceptionFilter';
import { GuardModule } from './guards/guards.module';
import { SegmentModule } from './modules/client/on-boarding/segment.module';

//for routing admin and app path separately
const routes: Routes = [
  {
    path: '/client',
    children: [
      {
        path: '/onboarding',
        module: SegmentModule,
      },
    ],
  },
];
@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    LoggerModule,
    RouterModule.register(routes),
    SegmentModule,
  ],
  providers: [
    // ...schemaProviders,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
