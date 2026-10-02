import { Fragment } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Architecture, ArchitectureNode } from '@/types';
import { Icon, type IconName } from '@/components/Icon';
import { cn } from '@/utils/cn';
import { toneClasses } from '@/utils/tone';
import { useI18n } from '@/hooks/useI18n';
import { childReveal, staggerChildren } from '@/utils/motion';

/**
 * Layer name → icon. Matched against the ENGLISH name so the icon does
 * not change when the language does.
 */
const iconFor = (name: string): IconName => {
  const key = name.toLowerCase();
  if (key.includes('frontend') || key.includes('client')) return 'monitor';
  if (key.includes('api')) return 'server';
  if (key.includes('logic') || key.includes('backend')) return 'layers';
  if (key.includes('database') || key.includes('data')) return 'database';
  if (key.includes('automation')) return 'bolt';
  if (key.includes('external') || key.includes('service')) return 'globe';
  return 'layers';
};

const Node = ({ node }: { node: ArchitectureNode }) => {
  const tone = toneClasses(node.tone);
  const { t } = useI18n();

  return (
    <motion.li
      variants={childReveal}
      className={cn(
        'flex min-w-0 flex-1 flex-col gap-2.5 rounded-xl p-5',
        node.external
          ? 'border border-dashed border-line-strong bg-[#0F1115]'
          : 'border bg-[#131720]',
        node.emphasis ? cn(tone.border, 'bg-accent/[0.07]') : !node.external && 'border-line-strong',
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className={tone.text}>
          <Icon name={iconFor(node.name.en)} size={15} strokeWidth={1.9} />
        </span>
        <h4 className="font-display text-[0.95rem] font-semibold">{t(node.name)}</h4>
      </div>
      <p className="text-[0.8rem] leading-relaxed text-muted">{t(node.summary)}</p>
      {node.detail ? <p className="font-mono text-[0.66rem] text-subtle">{t(node.detail)}</p> : null}
    </motion.li>
  );
};

/**
 * Connector between two layers. Points right on wide screens where the
 * nodes sit in a row, and down on narrow ones where they stack.
 */
const Connector = () => (
  <li
    aria-hidden="true"
    className="flex items-center justify-center py-1 text-line-strong sm:w-12 sm:shrink-0 sm:py-0"
  >
    <span className="hidden sm:block">
      <Icon name="arrow-right" size={18} strokeWidth={1.6} />
    </span>
    <span className="sm:hidden">
      <Icon name="arrow-down" size={16} strokeWidth={1.6} />
    </span>
  </li>
);

/**
 * The architecture view. Built from composed elements rather than a
 * single image or one flat <svg>, so it reflows on small screens and
 * every layer name is real, selectable text.
 */
export const ArchitectureDiagram = ({ architecture }: { architecture: Architecture }) => {
  const reduced = useReducedMotion();
  const { nodes } = architecture;

  // Split into two rows on wide screens so six layers stay readable.
  const half = Math.ceil(nodes.length / 2);
  const rows = nodes.length > 3 ? [nodes.slice(0, half), nodes.slice(half)] : [nodes];

  return (
    <motion.div
      className="flex flex-col gap-3"
      variants={reduced ? undefined : staggerChildren(0.05)}
      initial={reduced ? false : 'hidden'}
      animate={reduced ? {} : 'visible'}
    >
      {rows.map((row, rowIndex) => (
        <Fragment key={rowIndex}>
          <ol className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-0">
            {row.map((node, index) => (
              <Fragment key={node.name.en}>
                {index > 0 ? <Connector /> : null}
                <Node node={node} />
              </Fragment>
            ))}
          </ol>
          {rowIndex < rows.length - 1 ? (
            <div aria-hidden="true" className="flex justify-center py-0.5 text-line-strong">
              <Icon name="arrow-down" size={18} strokeWidth={1.6} />
            </div>
          ) : null}
        </Fragment>
      ))}
    </motion.div>
  );
};
