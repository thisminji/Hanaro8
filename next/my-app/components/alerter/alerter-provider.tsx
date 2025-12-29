'use client';

import { useMemo, useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import {
  AlerterContext,
  type AlertOptions,
  type ConfirmOptions,
  type PromptOptions,
} from './use-alerter';

type Mode = 'confirm' | 'alert' | 'prompt' | null;

export function AlerterProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>(null);
  const [opts, setOpts] = useState<any>({});
  const [promptValue, setPromptValue] = useState('');

  const resolverRef = useRef<(v: any) => void>(() => {});

  const closeWith = (value: any) => {
    setOpen(false);
    const r = resolverRef.current;
    resolverRef.current = () => {};
    r(value);
  };

  const confirm = (options: ConfirmOptions) =>
    new Promise<boolean>((resolve) => {
      setMode('confirm');
      setOpts(options);
      resolverRef.current = resolve;
      setOpen(true);
    });

  const alert = (options: AlertOptions) =>
    new Promise<void>((resolve) => {
      setMode('alert');
      setOpts(options);
      resolverRef.current = resolve;
      setOpen(true);
    });

  const prompt = (options: PromptOptions) =>
    new Promise<string | null>((resolve) => {
      setMode('prompt');
      setOpts(options);
      setPromptValue('');
      resolverRef.current = resolve;
      setOpen(true);
    });

  const ctxValue = useMemo(() => ({ confirm, alert, prompt }), []);

  const isDestructive = opts?.variant === 'destructive';

  return (
    <AlerterContext.Provider value={ctxValue}>
      {children}

      <AlertDialog
        open={open}
        onOpenChange={(next) => {
          // ESC / 바깥 클릭으로 닫히면 "취소" 처리
          if (!next) {
            if (mode === 'alert') closeWith(undefined);
            else if (mode === 'prompt') closeWith(null);
            else closeWith(false);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{opts?.title}</AlertDialogTitle>
            {opts?.description ? (
              <AlertDialogDescription>
                {opts.description}
              </AlertDialogDescription>
            ) : null}
          </AlertDialogHeader>

          {mode === 'prompt' ? (
            <Input
              autoFocus
              placeholder={opts?.placeholder ?? ''}
              value={promptValue}
              onChange={(e) => setPromptValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  closeWith(promptValue);
                }
              }}
            />
          ) : null}

          <AlertDialogFooter>
            {mode !== 'alert' ? (
              <AlertDialogCancel
                onClick={() => {
                  if (mode === 'prompt') closeWith(null);
                  else closeWith(false);
                }}
              >
                {opts?.cancelText ?? '취소'}
              </AlertDialogCancel>
            ) : null}

            <AlertDialogAction
              className={isDestructive ? 'bg-red-500 hover:bg-red-600' : ''}
              onClick={() => {
                if (mode === 'alert') closeWith(undefined);
                else if (mode === 'prompt') closeWith(promptValue);
                else closeWith(true);
              }}
            >
              {opts?.okText ?? '확인'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AlerterContext.Provider>
  );
}
