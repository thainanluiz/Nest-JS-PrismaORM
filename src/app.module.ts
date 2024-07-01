import { Module } from '@nestjs/common';
import { UserModule } from './modules/user.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
