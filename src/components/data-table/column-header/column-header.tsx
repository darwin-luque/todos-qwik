import {
  type HTMLAttributes,
  type JSXOutput,
  component$,
} from '@builder.io/qwik';
import { type HeaderContext } from '../data-table';
import { cn } from '@/lib/utils';
import {
  LuChevronDown,
  LuChevronUp,
  LuChevronsUpDown,
  LuEyeOff,
} from '@qwikest/icons/lucide';

type ColumnHeaderProps = HTMLAttributes<HTMLDivElement> & {
  header: HeaderContext;
  title: string | JSXOutput;
};

export const ColumnHeader = component$<ColumnHeaderProps>((props) => {
  if (!props.header.column.isSortable && !props.header.column.isHidable) {
    return <div class={cn(props.class)}>{props.title}</div>;
  }

  return (
    <div class={cn('flex items-center space-x-2', props.class)}>
      <div class="dropdown">
        <div
          tabIndex={0}
          role="button"
          class="btn btn-ghost h-8 min-h-fit gap-0 p-0"
        >
          <span>{props.title}</span>
          <LuChevronsUpDown class="ml-2 h-4 w-4" />
        </div>
        <ul class="menu dropdown-content z-50 w-28 rounded-md border border-neutral bg-base-100 p-0">
          {props.header.column.isSortable ? (
            <>
              <li>
                <div class="btn btn-ghost m-1 h-fit min-h-fit justify-start gap-0 rounded-sm px-1 py-2">
                  <LuChevronUp class="mr-2 h-3.5 w-3.5 text-gray-600/70" />
                  Asc
                </div>
              </li>
              <li>
                <div class="btn btn-ghost m-1 h-fit min-h-fit justify-start gap-0 rounded-sm px-1 py-2">
                  <LuChevronDown class="mr-2 h-3.5 w-3.5 text-gray-600/70" />
                  Desc
                </div>
              </li>
            </>
          ) : null}
          {props.header.column.isSortable && props.header.column.isHidable ? (
            <div class="divider m-0 h-2" />
          ) : null}
          {props.header.column.isHidable ? (
            <li>
              <div class="btn btn-ghost m-1 h-fit min-h-fit justify-start gap-0 rounded-sm px-1 py-2">
                <LuEyeOff class="mr-2 h-3.5 w-3.5 text-gray-600/70" />
                Hide
              </div>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
});
