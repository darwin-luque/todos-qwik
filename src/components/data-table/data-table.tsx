import type {
  JSXOutput,
  CSSProperties,
  FunctionComponent,
  QRL,
} from '@builder.io/qwik';
import { $, component$, useStore } from '@builder.io/qwik';
import { cn } from '@/lib/utils';

export type DataStructure<T> = {
  id: string | number;
  selected?: boolean;
} & T;


export type CellContext<T> = {
  row: DataStructure<T>;
};

export type HeaderContext = {
  areAllSelected: boolean;
  selectAll: QRL<() => void>;
};

export type ColumnDef<T> = {
  id: string;
  cell: FunctionComponent<CellContext<DataStructure<T>>>;
  header: FunctionComponent<HeaderContext>;
  colSpan?: number;
  style?: CSSProperties;
  class?: string;
};

export type DataTableProps = {
  columns: ColumnDef<any>[];
  data: DataStructure<unknown>[];
  // initialTableState?: Partial<TableState>;
  toolbar?: JSXOutput;
  container?: {
    style?: CSSProperties;
    class?: string;
  };
};

export const DataTable = component$<DataTableProps>((props) => {
  const data = useStore(() =>
    props.data.map((v) => ({ ...v, selected: false })),
  );

  const selectAll = $(async () => {
    const areAllSelected = data.every((v) => !!v.selected);
    data.forEach((v) => (v.selected = !areAllSelected));
  });

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
                    <column.header
                      areAllSelected={data.every((v) => !!v.selected)}
                      selectAll={selectAll}
                    />
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row) => (
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
