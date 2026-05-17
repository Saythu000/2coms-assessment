import { IntranetContent, User, Event } from '../core/types';

/**
 * Seeded Mock Data for 2COMS Connect
 * Used to demonstrate "Dynamic & Interactive" UI with realistic scenarios.
 */

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Ananya Sharma',
    role: 'HR_ADMIN',
    department: 'HR',
    avatar: 'https://i.pravatar.cc/150?u=1',
    skills: ['Talent Management', 'Culture Building']
  },
  {
    id: '2',
    name: 'Rahul Varma',
    role: 'EMPLOYEE',
    department: 'TECH',
    avatar: 'https://i.pravatar.cc/150?u=2',
    skills: ['React', 'TypeScript', 'AI']
  }
];

export const MOCK_NEW_JOINEES = [
  { name: 'Amit Patel', role: 'Designer', dept: 'Tech' },
  { name: 'Sarah Jenkins', role: 'Lead', dept: 'Sales' },
  { name: 'Michael Chen', role: 'Dev', dept: 'Tech' }
];

export const MOCK_ROADMAP = [
  { id: 1, title: 'Q3 2026: AI Integration', description: 'Deploying GenAI models across all delivery verticals.' },
  { id: 2, title: 'Q4 2026: Global Expansion', description: 'Opening new footprints in EMEA and APAC regions.' }
];

export const MOCK_THREADS = [
  { 
    id: 't1', 
    title: 'Best AI tools for daily productivity?', 
    content: 'I have been using some GPT models lately, but I want to know what the rest of the tech team is using for coding assistance.',
    author: 'Rahul Varma', 
    replies: 12, 
    likes: 45, 
    category: 'Tech',
    timestamp: '3 hours ago',
    comments: [
      { user: 'Amit Patel', text: 'GitHub Copilot is a game changer for me!', time: '1 hour ago' },
      { user: 'Ananya Sharma', text: 'Have you tried Claude? Its reasoning is top-tier.', time: '45 mins ago' }
    ]
  },
  { 
    id: 't2', 
    title: 'Any suggestions for the next office lunch?', 
    content: 'HR is planning a team lunch next Friday. Should we go with Italian or Pan-Asian?',
    author: 'Ananya Sharma', 
    replies: 8, 
    likes: 20, 
    category: 'Culture',
    timestamp: '5 hours ago',
    comments: [
      { user: 'Priya Das', text: 'Definitely Pan-Asian!', time: '2 hours ago' }
    ]
  }
];

export const MOCK_CONTENT: IntranetContent[] = [
  {
    id: 'v1',
    type: 'VISION',
    title: 'Management Vision 2026',
    content: 'Our mission is to empower every individual through AI-first innovation and collaborative excellence.',
    authorId: '1',
    department: 'GLOBAL',
    timestamp: new Date().toISOString(),
    likes: 120,
    reactions: ['🚀', '👏']
  },
  {
    id: 'l1',
    type: 'LEADERSHIP_MESSAGE',
    title: 'CEO Monthly Meet Outcomes',
    content: 'Key focus for this quarter: Cross-department synergy and scaling our AI delivery models.',
    authorId: '1',
    department: 'GLOBAL',
    timestamp: new Date().toISOString(),
    likes: 85,
    reactions: ['💡', '👍']
  },
  {
    id: 'p1',
    type: 'PROJECT_WIN',
    title: 'Project Apollo 11 Launch Success',
    content: 'The Tech team successfully deployed the Apollo 11 dashboard ahead of schedule. Huge impact on client visibility!',
    authorId: '2',
    department: 'TECH',
    timestamp: new Date().toISOString(),
    likes: 250,
    reactions: ['🔥', '🎯']
  }
];

export const MOCK_EVENTS: Event[] = [
  { id: 'e1', title: 'Tech Innovation Summit', date: '2026-06-15', category: 'ENGAGEMENT' },
  { id: 'e2', title: 'Annual Gala Night', date: '2026-12-20', category: 'MILESTONE' }
];
