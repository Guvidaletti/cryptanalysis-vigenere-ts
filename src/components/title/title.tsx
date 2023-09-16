import { HTMLAttributes } from 'react';
import style from './title.module.scss';
import ChevronLeftIcon from '../../assets/icons/chevronLeftIcon';

interface Props extends HTMLAttributes<HTMLDivElement> {
  showBack?: boolean;
  onClickBack?: () => void;
}

export default function Title({
  showBack,
  onClickBack,
  children,
  ...props
}: Props) {
  return (
    <div {...props} className={style.title}>
      {showBack && (
        <button onClick={onClickBack}>
          <ChevronLeftIcon />
        </button>
      )}
      {children}
    </div>
  );
}
