import {
  LuTimer,
  LuXCircle,
  LuHelpCircle,
  LuCheckCircle2,
} from '@qwikest/icons/lucide';
import { type JSXOutput, component$ } from '@builder.io/qwik';
import { type ColumnDef } from '@/components/data-table';
import { type Task } from '@/server/tasks';
import { ColumnHeader } from '../../data-table/column-header';

const TASK_TYPE_MAPPER: Record<Task['type'], { title: string; color: string }> =
  {
    bug: { title: 'Bug', color: 'error' },
    task: { title: 'Task', color: 'info' },
    feat: { title: 'Feature', color: 'success' },
  };

const STATUS_MAPPER: Record<
  Task['status'],
  { icon: JSXOutput; title: string }
> = {
  'in-progress': { icon: <LuTimer class="h-5 w-5" />, title: 'In Progress' },
  backlog: { icon: <LuHelpCircle class="h-5 w-5" />, title: 'Backlog' },
  done: { icon: <LuCheckCircle2 class="h-5 w-5" />, title: 'Done' },
  canceled: { icon: <LuXCircle class="h-5 w-5" />, title: 'Canceled' },
};

export const columns: ColumnDef<Task>[] = [
  {
    id: 'checkbox',
    cell: component$((props) => (
      <label>
        <input
          type="checkbox"
          class="checkbox"
          checked={!!props.row.selected}
          onChange$={() => (props.row.selected = !props.row.selected)}
        />
      </label>
    )),
    header: component$((props) => (
      <label>
        <input
          type="checkbox"
          class="checkbox"
          checked={props.areAllSelected}
          onChange$={props.selectAll}
        />
      </label>
    )),
    class: 'w-2',
  },
  {
    id: 'code',
    cell: component$((props) => <span>{props.row.code}</span>),
    header: component$((props) => <ColumnHeader title="Code" header={props} />),
    class: 'w-36',
    isSortable: true,
    isHidable: true,
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
    header: component$((props) => <ColumnHeader title="Title" header={props} />),
    isSortable: true,
    class: 'w-[800px]',
  },
  {
    id: 'assignee',
    cell: component$((props) => <span>{props.row.assignee}</span>),
    header: component$((props) => <ColumnHeader title="Assignee" header={props} />),
    class: 'w-40',
    isSortable: true,
    isHidable: true,
  },
  {
    id: 'status',
    cell: component$((props) => (
      <span class="flex gap-2">
        {STATUS_MAPPER[props.row.status].icon}
        {STATUS_MAPPER[props.row.status].title}
      </span>
    )),
    header: component$((props) => <ColumnHeader title="Status" header={props} />),
    class: 'w-40',
    isHidable: true,
  },
  {
    id: 'dueDate',
    cell: component$((props) => (
      <span>
        {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(
          props.row.dueDate,
        )}
      </span>
    )),
    header: component$((props) => <ColumnHeader title="Due Date" header={props} />),
    class: 'w-40',
    isSortable: true,
    isHidable: true,
  },
];