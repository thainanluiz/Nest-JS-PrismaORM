import { UserController } from 'src/controllers/user.controller';
import { Module } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
