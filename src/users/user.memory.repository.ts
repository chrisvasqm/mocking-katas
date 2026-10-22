import { User } from './user.model.ts';
import { UserRepository } from './user.repository.interface.ts';

export class InMemoryUserRepository implements UserRepository {
  private readonly users: User[] = [
    { username: 'mosh', isPremium: true },
    { username: 'john', isPremium: false },
  ];

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
