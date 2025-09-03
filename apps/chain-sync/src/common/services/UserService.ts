import { User } from '@common/entities/User';
import { UserRepository } from '@common/repositories/UserRepository';

class UserServiceImpl {
  public async getUserByAddress(address: string) {
    return UserRepository.findByAddress(address);
  }

  public async insertUser(user: User) {
    return UserRepository.insertMany([user]);
  }
}

const UserService = new UserServiceImpl();
export default UserService;
