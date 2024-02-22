import { component$ } from '@builder.io/qwik';
import { LuSlidersHorizontal } from '@qwikest/icons/lucide';
import { type ToolbarProps } from '@/components/data-table';
import { type Task } from '@/server/tasks';

export const TasksTableToolbarViewOptions = component$<ToolbarProps<Task>>(
  (props) => {
    return (
      <details class="dropdown-end dropdown">
        <summary class="btn btn-outline btn-sm hover:cursor-pointer">
          <LuSlidersHorizontal class="mr-2 h-4 w-4" /> View
        </summary>
        <div class="dropdown-content z-50 w-40 rounded-lg border border-neutral bg-base-100 px-0 shadow-sm pt-1">
          <h3 class="prose prose-sm font-semibold text-center">Toggle columns</h3>
          <div class="divider m-0" />
          <ul class="join join-vertical p-0 [&_li>*]:rounded-none">
            {props.columns
              .filter((c) => c.isHidable)
              .map((column) => (
                <li
                  key={column.id}
                  class="join-item flex items-center gap-2 p-1"
                >
                  <label>
                    <input
                      type="checkbox"
                      class="checkbox checkbox-xs border-none [--chkbg:oklch(var(--b1))] [--chkfg:oklch(var(--bc))]"
                      checked={!props.state.hiddenColumns.includes(column.id)}
                      onChange$={() => {
                        if (props.state.hiddenColumns.includes(column.id)) {
                          props.state.hiddenColumns =
                            props.state.hiddenColumns.filter(
                              (c) => c !== column.id,
                            );
                        } else {
                          props.state.hiddenColumns.push(column.id);
                        }
                      }}
                    />
                  </label>
                  <span class="text-sm capitalize">{column.id}</span>
                </li>
              ))}
          </ul>
        </div>
      </details>
    );
  },
);
