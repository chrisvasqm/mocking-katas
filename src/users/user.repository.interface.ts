import { User } from './user.model.ts';

export interface UserRepository {
  findByUsername(username: string): Promise<User | undefined>;
}
