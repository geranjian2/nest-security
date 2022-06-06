import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos';
import { User } from './entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async getMany() {
    return await this.userRepository.find();
  }
  async getOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('user dont exist');
    return user;
  }
  async getOneEmail(email: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where({ email })
      .addSelect('user.password')
      .getOne();
    if (!user) throw new NotFoundException('user dont exist');
    return user;
  }
  async createOne(dto: CreateUserDto) {
    const newUser = await this.userRepository.create(dto);
    return await this.userRepository.save(newUser);
  }
  //   async editOne() {
  //       return await
  //   }
  //   async deleteOne() {
  //       return await
  //   }
}
