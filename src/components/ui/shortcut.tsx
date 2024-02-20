import { Slot, component$ } from '@builder.io/qwik';
import { cn } from '../../lib/utils/tailwind-helpers';

type ShortcutProps = {
  class?: string;
};

export const Shortcut = component$<ShortcutProps>((props) => {
  return (
    <span class={cn('ml-auto text-xs tracking-widest opacity-60', props.class)}>
      <Slot />
    </span>
  );
});
