import { User, UserRole } from '../types';

export class AuthService {
  static async login(role: UserRole): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      id: role === 'HR_ADMIN' ? 'ADMIN-2026' : 'EMP-1045',
      name: role === 'HR_ADMIN' ? 'Ananya Sharma' : 'Rahul Varma',
      avatar: role === 'HR_ADMIN' ? 'https://i.pravatar.cc/150?u=1' : 'https://i.pravatar.cc/150?u=2',
      role,
      department: role === 'HR_ADMIN' ? 'HR' : 'TECH',
    };
  }

  static async logout(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 200));
  }
}
