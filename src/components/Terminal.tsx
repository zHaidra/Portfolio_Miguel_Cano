import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { Icon } from '@/components/Icon';
import { cn } from '@/utils/cn';
import { buildCommands, terminalBanner, terminalStrings } from '@/data/terminal';
import { cvHref, site } from '@/data/site';
import { useI18n } from '@/hooks/useI18n';
import { commandCount, ui } from '@/i18n/ui';

type LineKind = 'banner' | 'dim' | 'command' | 'output' | 'error' | 'gap';

interface Line {
  id: number;
  kind: LineKind;
  text: string;
}

const lineClass: Record<LineKind, string> = {
  banner: 'text-ink',
  dim: 'text-subtle',
  command: 'text-signal-soft',
  output: 'text-ink-soft',
  error: 'text-warm-soft',
  gap: 'h-2',
};

/**
 * Levenshtein distance, used only to suggest a command when the user
 * mistypes one. Small inputs, so the simple DP table is plenty.
 */
const distance = (a: string, b: string): number => {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const table: number[] = new Array<number>(rows * cols).fill(0);

  for (let i = 0; i < rows; i += 1) table[i * cols] = i;
  for (let j = 0; j < cols; j += 1) table[j] = j;

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      table[i * cols + j] = Math.min(
        (table[(i - 1) * cols + j] ?? 0) + 1,
        (table[i * cols + j - 1] ?? 0) + 1,
        (table[(i - 1) * cols + j - 1] ?? 0) + cost,
      );
    }
  }

  return table[rows * cols - 1] ?? 0;
};

export const Terminal = () => {
  const { t, locale } = useI18n();

  const commands = useMemo(() => buildCommands(locale), [locale]);
  const commandNames = useMemo(() => commands.map((command) => command.name), [commands]);

  const nextId = useRef(0);
  const makeLines = useCallback(
    (entries: Array<[LineKind, string]>): Line[] =>
      entries.map(([kind, text]) => {
        nextId.current += 1;
        return { id: nextId.current, kind, text };
      }),
    [],
  );

  const [lines, setLines] = useState<Line[]>([]);
  const [showBanner, setShowBanner] = useState(true);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const paneRef = useRef<HTMLDivElement>(null);

  // The banner is derived from the current language rather than stored, so
  // switching languages retranslates it while leaving the visitor's own
  // session output exactly where it was.
  const banner = useMemo(() => terminalBanner(locale), [locale]);

  const clear = useCallback(() => {
    setLines([]);
    setShowBanner(false);
  }, []);

  // Keep the newest output in view without yanking the whole page around.
  useEffect(() => {
    const pane = paneRef.current;
    if (pane) pane.scrollTop = pane.scrollHeight;
  }, [lines]);

  // Clicking anywhere in the pane focuses the prompt. Bound natively so
  // no click handler lands on a non-interactive element.
  useEffect(() => {
    const pane = paneRef.current;
    if (!pane) return;

    const focusPrompt = (event: MouseEvent) => {
      // Let text selection and real links behave normally.
      if (window.getSelection()?.toString()) return;
      if ((event.target as HTMLElement).closest('a,button')) return;
      inputRef.current?.focus();
    };

    pane.addEventListener('click', focusPrompt);
    return () => pane.removeEventListener('click', focusPrompt);
  }, []);

  const append = useCallback(
    (entries: Array<[LineKind, string]>) => {
      setLines((current) => [...current, ...makeLines(entries)]);
    },
    [makeLines],
  );

  const run = useCallback(
    (raw: string) => {
      const input = raw.trim();
      append([['command', `→ ${input}`]]);

      if (input) {
        setHistory((current) => [...current, input]);
      }
      setValue('');
      setCursor(-1);

      if (!input) return;

      const name = input.split(/\s+/)[0]?.toLowerCase() ?? '';
      const command = commands.find((entry) => entry.name === name);

      if (name === 'clear') {
        clear();
        return;
      }

      if (!command) {
        const suggestion = commandNames
          .map((candidate) => ({ candidate, score: distance(name, candidate) }))
          .sort((a, b) => a.score - b.score)
          .find((entry) => entry.score <= 3);

        append([
          ['error', `${terminalStrings.notFound[locale]} ${name}`],
          [
            'dim',
            suggestion
              ? `${terminalStrings.didYouMean[locale]} "${suggestion.candidate}"?`
              : terminalStrings.tryHelp[locale],
          ],
          ['gap', ''],
        ]);
        return;
      }

      if (command.name === 'cv') {
        // Trigger the same download the hero button does.
        const anchor = document.createElement('a');
        anchor.href = cvHref();
        anchor.download = site.cv.file;
        anchor.rel = 'noopener';
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
      }

      append([
        ...command.output.map((text): [LineKind, string] => [text ? 'output' : 'gap', text]),
        ['gap', ''],
      ]);
    },
    [append, clear, commandNames, commands, locale],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      run(value);
      return;
    }

    // Ctrl+L clears, the way a real shell does.
    if (event.key.toLowerCase() === 'l' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      clear();
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      const prefix = value.trim().toLowerCase();
      if (!prefix) return;

      const matches = commandNames.filter((name) => name.startsWith(prefix));
      if (matches.length === 1 && matches[0]) {
        setValue(matches[0]);
      } else if (matches.length > 1) {
        append([
          ['command', `→ ${value}`],
          ['output', matches.join('   ')],
          ['gap', ''],
        ]);
      }
      return;
    }

    if (event.key === 'ArrowUp' && history.length > 0) {
      event.preventDefault();
      const index = cursor < 0 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(index);
      setValue(history[index] ?? '');
      return;
    }

    if (event.key === 'ArrowDown' && history.length > 0) {
      event.preventDefault();
      if (cursor < 0) return;
      const index = cursor + 1;
      if (index >= history.length) {
        setCursor(-1);
        setValue('');
      } else {
        setCursor(index);
        setValue(history[index] ?? '');
      }
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-[#0C0E12] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
      <div className="flex h-11 shrink-0 items-center gap-2.5 border-b border-line bg-[#12151B] px-4">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="ml-2 font-mono text-xs text-subtle">
          {site.shortName.toLowerCase().replace(/\s+/g, '')}@portfolio — zsh
        </span>
      </div>

      <div
        ref={paneRef}
        className="scrollbar-slim min-h-[20rem] flex-1 overflow-y-auto px-5 py-5 font-mono text-[0.8rem] leading-[1.75] sm:px-6"
      >
        {/* Output is announced politely so screen-reader users hear results. */}
        <div role="log" aria-live="polite" aria-label={t(ui.terminalOutputLabel)}>
          {showBanner ? (
            <>
              <div className="whitespace-pre-wrap break-words text-ink">{banner[0]}</div>
              <div className="whitespace-pre-wrap break-words text-subtle">{banner[1]}</div>
              <div className="h-2" />
            </>
          ) : null}
          {lines.map((line) => (
            <div
              key={line.id}
              className={cn('whitespace-pre-wrap break-words', lineClass[line.kind])}
            >
              {line.kind === 'gap' ? ' ' : line.text}
            </div>
          ))}
        </div>

        <div className="mt-1.5 flex items-center gap-2.5">
          <span aria-hidden="true" className="shrink-0 text-signal-soft">
            →
          </span>
          <label htmlFor="terminal-input" className="sr-only">
            {t(ui.terminalInputLabel)}
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder={t(ui.terminalPlaceholder)}
            aria-describedby="terminal-hint"
            className="-mx-1 h-8 min-w-0 flex-1 rounded-sm border-0 bg-transparent px-1 font-mono text-[0.8rem] text-ink caret-signal-soft outline-none placeholder:text-subtle focus-visible:ring-1 focus-visible:ring-accent/70 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      <div className="flex h-10 shrink-0 items-center justify-between border-t border-line bg-[#0B0E12] px-5 font-mono text-[0.68rem] text-subtle sm:px-6">
        <span>{commandCount(locale, history.length)}</span>
        <span id="terminal-hint" className="hidden sm:inline">
          {t(ui.terminalHint)}
        </span>
        <span className="sm:hidden">
          <Icon name="terminal" size={13} />
        </span>
      </div>
    </div>
  );
};
