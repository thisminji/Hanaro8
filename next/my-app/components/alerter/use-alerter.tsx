'use client';

import { createContext, useContext } from 'react';

export type ConfirmOptions = {
  title: string;
  description?: string;
  okText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
};

export type AlertOptions = {
  title: string;
  description?: string;
  okText?: string;
  variant?: 'default' | 'destructive';
};

export type PromptOptions = {
  title: string;
  description?: string;
  placeholder?: string;
  okText?: string;
  cancelText?: string;
};

export type AlerterContextType = {
  confirm: (opts: ConfirmOptions) => Promise<boolean>;
  alert: (opts: AlertOptions) => Promise<void>;
  prompt: (opts: PromptOptions) => Promise<string | null>;
};

export const AlerterContext = createContext<AlerterContextType | null>(null);

export function useAlerter() {
  const ctx = useContext(AlerterContext);
  if (!ctx)
    throw new Error('useAlerter must be used within <AlerterProvider />');
  return ctx;
}
