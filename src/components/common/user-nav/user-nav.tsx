import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Shortcut } from '../../ui/shortcut';

export const UserNav = component$(() => {
  return (
    <details class="dropdown dropdown-end">
      <summary class="list-none hover:cursor-pointer">
        <div class="avatar p-0">
          <div class="w-10 rounded-full">
            <img
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              width="844"
              height="844"
            />
          </div>
        </div>
      </summary>
      <div class="menu dropdown-content z-[1] w-52 rounded-lg border border-neutral bg-base-100 px-0">
        <div class="p-2">
          <div class="flex flex-col space-y-1">
            <p class="text-sm font-medium leading-none">example user</p>
            <p class="text-muted-foreground text-xs leading-none">
              m@example.com
            </p>
          </div>
        </div>
        <div class="divider m-0" />
        <ul class="menu p-0 [&_li>*]:rounded-none">
          <li>
            <Link
              href="/user/profile"
              class="prose btn btn-ghost btn-sm btn-block justify-start font-normal"
            >
              Profile
              <Shortcut>⇧⌘P</Shortcut>
            </Link>
          </li>
          <li>
            <Link
              href="/user/billing"
              class="prose btn btn-ghost btn-sm btn-block justify-start font-normal"
            >
              Billing
              <Shortcut>⌘B</Shortcut>
            </Link>
          </li>
          <li>
            <Link
              href="/user/settings"
              class="prose btn btn-ghost btn-sm btn-block justify-start font-normal"
            >
              Settings
              <Shortcut>⌘S</Shortcut>
            </Link>
          </li>
        </ul>
        <div class="divider m-0" />
        <div>
          <Link
            href="/user/logout"
            class="prose rounded-none btn btn-ghost btn-sm btn-block justify-start font-normal"
          >
            Logout
            <Shortcut>⇧⌘Q</Shortcut>
          </Link>
        </div>
      </div>
    </details>
  );
});
