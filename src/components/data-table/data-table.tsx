import type {
  CSSProperties,
  FunctionComponent,
  QRL,
  Component,
} from '@builder.io/qwik';
import { $, component$, useStore } from '@builder.io/qwik';
import { cn } from '@/lib/utils';

export type TableState = {
  hiddenColumns: string[];
  selectedColumns: (string | number)[];
};

export type DataStructure<T> = {
  id: string | number;
} & T;

export type CellContext<T> = {
  row: DataStructure<T>;
  state: TableState;
};

export type BaseColumnDef = {
  id: string;
  isSortable?: boolean;
  isHidable?: boolean;
  colSpan?: number;
  style?: CSSProperties;
  class?: string;
};

export type HeaderContext = {
  column: BaseColumnDef;
  state: TableState;
  areAllSelected: boolean;
  selectAll: QRL<() => void>;
};

export type ColumnDef<T> = BaseColumnDef & {
  cell: FunctionComponent<CellContext<DataStructure<T>>>;
  header: FunctionComponent<HeaderContext>;
};

export type ToolbarProps<T> = {
  columns: ColumnDef<T>[];
  state: TableState;
};

export type DataTableProps = {
  columns: ColumnDef<any>[];
  data: DataStructure<unknown>[];
  initialTableState?: Partial<TableState>;
  Toolbar?: Component<ToolbarProps<any>>;
  container?: {
    style?: CSSProperties;
    class?: string;
  };
};

const defaultInitialState: TableState = {
  hiddenColumns: [],
  selectedColumns: [],
};

export const DataTable = component$<DataTableProps>((props) => {
  const state = useStore<TableState>(() => ({
    ...defaultInitialState,
    ...props.initialTableState,
  }));
  const data = useStore(() => props.data);

  const selectAll = $(async () => {
    const areAllSelected = data.every((v) =>
      state.selectedColumns.includes(v.id),
    );
    state.selectedColumns = areAllSelected ? [] : data.map((v) => v.id);
  });

  return (
    <div class="w-fit space-y-4">
      {props.Toolbar ? (
        <props.Toolbar state={state} columns={props.columns} />
      ) : null}
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
              {props.columns
                .filter((c) => !state.hiddenColumns.includes(c.id))
                .map((column) => {
                  return (
                    <th
                      key={column.id}
                      class={column.class}
                      colSpan={column.colSpan ?? 1}
                      style={column.style}
                    >
                      <column.header
                        areAllSelected={data.every((v) =>
                          state.selectedColumns.includes(v.id),
                        )}
                        state={state}
                        selectAll={selectAll}
                        column={column}
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
                  {props.columns
                    .filter((c) => !state.hiddenColumns.includes(c.id))
                    .map((column) => {
                      return (
                        <td
                          key={column.id}
                          style={column.style}
                          class={column.class}
                          colSpan={column.colSpan ?? 1}
                        >
                          <column.cell row={row} state={state} />
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
