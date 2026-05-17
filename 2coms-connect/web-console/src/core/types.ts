/**
 * 2COMS Connect - Shared Type Definitions
 * Following SOLID principles and SaaS multi-tenancy logic.
 */

export type UserRole = 'EMPLOYEE' | 'HR_ADMIN';

export type Department = 'TECH' | 'HR' | 'SALES' | 'GLOBAL';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  department: Department;
  avatar?: string;
  skills: string[];
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
  department: Department; // For visibility isolation (Multi-tenancy)
  timestamp: string;
  mediaUrl?: string;
  likes: number;
  reactions: string[];
}

export interface Recognition extends IntranetContent {
  receiverId: string;
  badgeType: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  category: 'ENGAGEMENT' | 'MILESTONE' | 'HOLIDAY';
}
