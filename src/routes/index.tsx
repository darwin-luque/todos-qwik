import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
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
      {/* <DataTable data={tasks} columns={columns} /> */}
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
