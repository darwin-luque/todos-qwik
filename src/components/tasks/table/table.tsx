import { Resource, component$ } from '@builder.io/qwik';
import { DataTable } from '@/components/data-table';
import { getTasks } from '@/server/tasks';
import { columns } from './columns';
import { LuLoader2 } from '@qwikest/icons/lucide';

export const TasksTable = component$(() => {
  const tasks = getTasks();

  return (
    <Resource
      value={tasks}
      onPending={() => (
        <div>
          <LuLoader2 class="h-5 w-5 animate-spin" />
        </div>
      )}
      onResolved={(resolvedTasks) => (
        <DataTable
          columns={columns}
          data={resolvedTasks}
          container={{ class: 'border border-neutral w-fit' }}
        />
      )}
      onRejected={(error) => <div>{error.message}</div>}
    />
  );
});
