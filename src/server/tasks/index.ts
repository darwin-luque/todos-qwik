import { server$ } from "@builder.io/qwik-city";

export const tasks = [
  {
    id: 1,
    code: 'TASK-1021',
    type: 'bug' as const,
    title: 'Design a new website',
    assignee: 'John Doe',
    status: 'in-progress' as const,
    dueDate: new Date('2021-10-01'),
  },
  {
    id: 2,
    code: 'TASK-1022',
    type: 'task' as const,
    title: 'Create a new logo',
    assignee: 'John Doe',
    status: 'backlog' as const,
    dueDate: new Date('2021-10-01'),
  },
  {
    id: 3,
    code: 'TASK-1023',
    type: 'feat' as const,
    title: 'Code up a homepage',
    assignee: 'John Doe',
    status: 'done' as const,
    dueDate: new Date('2021-10-01'),
  },
  {
    id: 4,
    code: 'TASK-1024',
    type: 'bug' as const,
    title: 'Write a blog post',
    assignee: 'John Doe',
    status: 'canceled' as const,
    dueDate: new Date('2021-10-01'),
  },
];

export type Task = (typeof tasks)[number];

export const getTasks = server$(async () => tasks);
