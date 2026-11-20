'use client';

import type { ComponentProps } from 'react';
import { Button } from './Button';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';

type WithoutChildren<T> = T extends unknown ? Omit<T, 'children'> : never;
type BookDemoButtonProps = WithoutChildren<ComponentProps<typeof Button>>;

/** One booking action and native label; callers retain destination, tracking and presentation. */
export function BookDemoButton(props: BookDemoButtonProps) {
  const { messages } = useWebsiteI18n();
  return <Button {...props}>{messages.navbar.bookDemo}</Button>;
}
