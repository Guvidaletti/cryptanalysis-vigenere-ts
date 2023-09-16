import { ButtonHTMLAttributes, ReactNode } from 'react';
import style from './bigBlockButton.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
}
export default function BigBlockButton({ className, icon, ...props }: Props) {
  return (
    <button className={[style.btn, className].join(' ')} {...props}>
      {icon}
      <div>{props.children}</div>
    </button>
  );
}
