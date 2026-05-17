/**
 * 2COMS Connect - Shared Type Definitions
 * Mirroring Web Console Architecture for extreme consistency.
 */

export type UserRole = 'EMPLOYEE' | 'HR_ADMIN';

export type Department = 'TECH' | 'HR' | 'SALES' | 'GLOBAL';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  department: Department;
  avatar: string;
}

export type ContentCategory = 
  | 'VISION' 
  | 'LEADERSHIP_MESSAGE' 
  | 'PROJECT_WIN' 
  | 'ANNOUNCEMENT' 
  | 'RECOGNITION' 
  | 'NEW_JOINEE' 
  | 'MILESTONE';

export interface IntranetContent {
  id: string;
  type: ContentCategory;
  title: string;
  content: string;
  authorId: string;
  department: Department;
  timestamp: string;
  likes: number;
  reactions: string[];
}
