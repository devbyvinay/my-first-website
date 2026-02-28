export interface Todo {
    id: number;
    task: string;
    completed: boolean;
    date: string;
    category: 'Personal' | 'Work' | 'Urgent'; // New property
    priority: 'High' | 'Medium' | 'Low'; // Added this
  }