import { useCallback, useId, useRef, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Icon } from '@/components/Icon';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useI18n } from '@/hooks/useI18n';
import { ui } from '@/i18n/ui';
import { useScrollLock } from '@/hooks/useScrollLock';
import { modalBackdrop, modalPanel } from '@/utils/motion';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Small label above the title. */
  eyebrow?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

/**
 * Accessible dialog: labelled, focus-trapped, Escape and backdrop close,
 * body scroll locked while open, focus restored on close.
 */
export const Modal = ({
  open,
  onClose,
  title,
  eyebrow,
  description,
  children,
  footer,
}: ModalProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const reduced = useReducedMotion();
  const { t } = useI18n();

  const handleEscape = useCallback(() => onClose(), [onClose]);

  useScrollLock(open);
  useFocusTrap(panelRef, open, handleEscape);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto overscroll-contain bg-[#06070A]/80 p-4 backdrop-blur-sm sm:items-center sm:p-6"
          variants={reduced ? undefined : modalBackdrop}
          initial={reduced ? false : 'hidden'}
          animate={reduced ? {} : 'visible'}
          exit={reduced ? {} : 'exit'}
          onMouseDown={(event) => {
            // Only close when the press starts on the backdrop itself.
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            tabIndex={-1}
            className="my-auto w-full max-w-4xl overflow-hidden rounded-card border border-line-strong bg-[#0E1116] shadow-[0_40px_120px_rgba(0,0,0,0.7)] focus:outline-none"
            variants={reduced ? undefined : modalPanel}
            initial={reduced ? false : 'hidden'}
            animate={reduced ? {} : 'visible'}
            exit={reduced ? {} : 'exit'}
          >
            <div className="flex items-start justify-between gap-6 border-b border-line px-6 py-6 sm:px-8">
              <div>
                {eyebrow ? <p className="eyebrow text-accent">{eyebrow}</p> : null}
                <h2
                  id={titleId}
                  className="mt-2.5 font-display text-xl font-semibold tracking-[-0.025em] sm:text-2xl"
                >
                  {title}
                </h2>
                {description ? (
                  <p id={descriptionId} className="mt-2 max-w-2xl text-sm text-muted">
                    {description}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t(ui.closeDialog)}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-control border border-line-strong bg-raised text-muted transition-colors hover:text-ink"
              >
                <Icon name="close" size={15} />
              </button>
            </div>

            <div className="px-6 py-7 sm:px-8">{children}</div>

            {footer ? (
              <div className="border-t border-line bg-[#0B0E12] px-6 py-5 sm:px-8">{footer}</div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
