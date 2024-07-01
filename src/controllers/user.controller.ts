import {
  Controller,
  Body,
  Param,
  Post,
  Get,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseDto } from 'src/dtos/response.dto';
import { UserService } from 'src/services/user.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';

@ApiTags('user')
@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully',
    type: ResponseDto,
  })
  @Get()
  async getAllUsers(): Promise<ResponseDto> {
    try {
      const users = await this.userService.getAllUsers();

      return {
        timestamp: new Date().getTime(),
        status: HttpStatus.OK,
        message: 'Users retrieved successfully',
        data: users,
      };
    } catch (error) {
      console.error('Error retrieving users:', error);

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error.message,
      });
    }
  }

  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully',
    type: ResponseDto,
  })
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<ResponseDto> {
    try {
      const user = await this.userService.getUserById(id);

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return {
        timestamp: new Date().getTime(),
        status: HttpStatus.OK,
        message: 'User retrieved successfully',
        data: user,
      };
    } catch (error) {
      console.error(`Error retrieving user with ID ${id}:`, error);

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error.message,
      });
    }
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: ResponseDto,
  })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<ResponseDto> {
    try {
      const user = await this.userService.createUser(createUserDto);

      return {
        timestamp: new Date().getTime(),
        status: HttpStatus.CREATED,
        message: 'User created successfully',
        data: user,
      };
    } catch (error) {
      console.error('Error creating user:', error);

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error.message,
      });
    }
  }

  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: ResponseDto,
  })
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseDto> {
    try {
      const user = await this.userService.updateUser(id, updateUserDto);

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return {
        timestamp: new Date().getTime(),
        status: HttpStatus.OK,
        message: 'User updated successfully',
        data: user,
      };
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error.message,
      });
    }
  }

  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    type: ResponseDto,
  })
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<ResponseDto> {
    try {
      const user = await this.userService.deleteUser(id);

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return {
        timestamp: new Date().getTime(),
        status: HttpStatus.OK,
        message: 'User deleted successfully',
        data: null,
      };
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error.message,
      });
    }
  }
}
