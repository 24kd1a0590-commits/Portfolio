import { forwardRef, ReactNode } from 'react';
import { useMagnetic } from '@/hooks/useInteractions';

type Props = {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'ghost';
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

const MagneticButton = forwardRef<HTMLAnchorElement | HTMLButtonElement, Props>(
  ({ children, className = '', variant = 'primary', onClick, href, target, rel, ariaLabel }, _ref) => {
    const magneticRef = useMagnetic<HTMLElement>(0.25);
    const base = variant === 'primary' ? 'btn-primary' : 'btn-ghost';

    if (href) {
      return (
        <a
          ref={magneticRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          aria-label={ariaLabel}
          onClick={onClick}
          className={`${base} will-change-transform transition-transform duration-200 ease-out ${className}`}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={magneticRef as React.RefObject<HTMLButtonElement>}
        onClick={onClick}
        aria-label={ariaLabel}
        className={`${base} will-change-transform transition-transform duration-200 ease-out ${className}`}
      >
        {children}
      </button>
    );
  }
);

MagneticButton.displayName = 'MagneticButton';
export default MagneticButton;
