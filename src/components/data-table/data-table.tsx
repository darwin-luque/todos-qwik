import type {
  JSXOutput,
  CSSProperties,
  FunctionComponent,
} from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import { cn } from '@/lib/utils';

export type DataStructure<T> = {
  id: string;
} & T;

export type CellContext<T> = {
  row: DataStructure<T>;
};

export type ColumnDef<T> = {
  id: string;
  cell: FunctionComponent<CellContext<DataStructure<T>>>;
  header: FunctionComponent;
  colSpan?: number;
  style?: CSSProperties;
  class?: string;
};

export type DataTableProps = {
  columns: ColumnDef<any>[];
  data: any[];
  // initialTableState?: Partial<TableState>;
  toolbar?: JSXOutput;
  container?: {
    style?: CSSProperties;
    class?: string;
  };
};

export const DataTable = component$<DataTableProps>((props) => {
  return (
    <div class="w-fit space-y-4">
      {props.toolbar}
      <div
        class={cn(
          'min-w-[1024px] max-w-[1920px] overflow-x-auto',
          props.container?.class,
        )}
        style={props.container?.style}
      >
        <table class="table">
          <thead>
            <tr class="border-neutral">
              {props.columns.map((column) => {
                return (
                  <th
                    key={column.id}
                    class={column.class}
                    colSpan={column.colSpan ?? 1}
                    style={column.style}
                  >
                    <column.header />
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {props.data.length > 0 ? (
              props.data.map((row) => (
                <tr class="border-neutral" key={row.id}>
                  {props.columns.map((column) => {
                    return (
                      <td
                        key={column.id}
                        style={column.style}
                        class={column.class}
                        colSpan={column.colSpan ?? 1}
                      >
                        <column.cell row={row} />
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={props.columns.length} class="h-24 text-center">
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});
