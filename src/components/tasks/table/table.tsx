import { component$ } from '@builder.io/qwik';
import { DataTable } from '@/components/data-table';
import { tasks } from '@/server/tasks';
import { columns } from './columns';

export const TasksTable = component$(() => {
  return (
    <>
      <DataTable
        columns={columns}
        data={tasks}
        container={{ class: 'border border-neutral w-fit' }}
      />
    </>
  );
});
