/**
 * Unified Mock Data for 2COMS Connect Mobile
 */

export const MOCK_USERS = [
  {
    id: 'ADMIN-2026',
    name: 'Ananya Sharma',
    role: 'HR_ADMIN',
    department: 'HR',
    avatar: 'https://i.pravatar.cc/150?u=1',
    skills: ['Talent Management', 'Culture Building']
  },
  {
    id: 'EMP-1045',
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
  { id: 't1', title: 'Best AI tools for productivity?', content: 'What is everyone using for AI-assisted development?', category: 'Tech', author: 'Rahul Varma', likes: 45, replies: 2, hasVoted: false, comments: [{user: 'Amit', text: 'Copilot is great!', time: '1h ago'}] },
  { id: 't2', title: 'Team Lunch Suggestions?', content: 'Planning a lunch for the whole office. Suggestions?', category: 'Culture', author: 'Ananya Sharma', likes: 20, replies: 0, hasVoted: false, comments: [] }
];
