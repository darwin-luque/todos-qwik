import { component$ } from '@builder.io/qwik';
import { TasksTableToolbarViewOptions } from './view-options';
import { type ToolbarProps } from '@/components/data-table';
import { type Task } from '@/server/tasks';

export const TasksTableToolbar = component$<ToolbarProps<Task>>((props) => {
  return (
    <div class="flex items-center justify-between">
      <div class="flex flex-1">
        <div class="flex flex-1 items-center space-x-2">
          <input class="input input-bordered h-10 w-[150px] lg:w-[250px]" />
        </div>
      </div>
      <TasksTableToolbarViewOptions columns={props.columns} state={props.state} />
    </div>
  );
});
