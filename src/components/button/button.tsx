import { ButtonHTMLAttributes, ReactNode } from 'react';
import classes from './button.module.scss';
import Loader from '../../assets/icons/loader';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  loading?: boolean;
}

export default function Button({
  icon,
  children,
  className,
  loading,
  disabled,
  ...rest
}: Props) {
  return (
    <button
      className={[
        classes.btn,
        !children ? classes.onlyIcon : '',
        className,
      ].join(' ')}
      {...rest}
      disabled={disabled || loading}
    >
      {icon}
      {children}
      {loading && (
        <div className={classes.loader}>
          <Loader />
        </div>
      )}
    </button>
  );
}
