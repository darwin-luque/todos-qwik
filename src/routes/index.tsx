import type { DocumentHead } from '@builder.io/qwik-city';
import { component$ } from '@builder.io/qwik';
import { TasksTable } from '@/components/tasks/table';
import { UserNav } from '@/components/common/user-nav';

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
        <TasksTable />
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Task Manager',
  meta: [
    {
      name: 'description',
      content: 'This is a mock website to test Qwik features.',
    },
  ],
};
