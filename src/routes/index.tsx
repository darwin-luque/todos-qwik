import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { type ColumnDef, DataTable } from '@/components/data-table';
import { UserNav } from '@/components/common/user-nav';

const tasks = [
  {
    id: 1,
    code: 'TASK-1021',
    type: 'bug' as const,
    title: 'Design a new website',
    assignee: 'John Doe',
    status: 'In Progress',
    dueDate: '2021-10-01',
  },
  {
    id: 2,
    code: 'TASK-1022',
    type: 'task' as const,
    title: 'Create a new logo',
    assignee: 'John Doe',
    status: 'In Progress',
    dueDate: '2021-10-01',
  },
  {
    id: 3,
    code: 'TASK-1023',
    type: 'feat' as const,
    title: 'Code up a homepage',
    assignee: 'John Doe',
    status: 'In Progress',
    dueDate: '2021-10-01',
  },
  {
    id: 4,
    code: 'TASK-1024',
    type: 'bug' as const,
    title: 'Write a blog post',
    assignee: 'John Doe',
    status: 'In Progress',
    dueDate: '2021-10-01',
  },
];

const TASK_TYPE_MAPPER: Record<
  (typeof tasks)[number]['type'],
  { title: string; color: string }
> = {
  bug: { title: 'Bug', color: 'error' },
  task: { title: 'Task', color: 'info' },
  feat: { title: 'Feature', color: 'success' },
};

const columns: ColumnDef<(typeof tasks)[number]>[] = [
  {
    id: 'checkbox',
    cell: component$(() => (
      <label>
        <input type="checkbox" class="checkbox" />
      </label>
    )),
    header: component$(() => (
      <label>
        <input type="checkbox" class="checkbox" />
      </label>
    )),
    class: 'w-2',
  },
  {
    id: 'code',
    cell: component$((props) => <span>{props.row.code}</span>),
    header: component$(() => <span>Code</span>),
    class: 'w-36',
  },
  {
    id: 'title',
    cell: component$((props) => (
      <span>
        <span
          class={`badge badge-outline badge-sm mr-2 opacity-50 badge-${TASK_TYPE_MAPPER[props.row.type].color}`}
        >
          {TASK_TYPE_MAPPER[props.row.type].title}
        </span>
        {props.row.title}
      </span>
    )),
    header: component$(() => <span>Title</span>),
    class: 'w-[800px]',
  },
  {
    id: 'assignee',
    cell: component$((props) => <span>{props.row.assignee}</span>),
    header: component$(() => <span>Assignee</span>),
    class: 'w-40',
  },
  {
    id: 'status',
    cell: component$((props) => <span>{props.row.status}</span>),
    header: component$(() => <span>Status</span>),
    class: 'w-40',
  },
  {
    id: 'dueDate',
    cell: component$((props) => <span>{props.row.dueDate}</span>),
    header: component$(() => <span>Due Date</span>),
    class: 'w-40',
  },
];

export default component$(() => {
  return (
    <>
      <div class="flex min-w-full items-center justify-between space-y-2">
        <div>
          <h2 class="m-0 text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p class="m-0">Here&apos;s a list of your tasks for this month!</p>
        </div>
        <div class="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>
      <div class="flex w-full flex-col items-center">
        <DataTable
          columns={columns}
          data={tasks}
          container={{ class: 'border border-neutral w-fit' }}
        />
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
