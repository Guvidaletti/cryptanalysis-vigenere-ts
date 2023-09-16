import { InputHTMLAttributes, createElement } from 'react';
import styles from './inputText.module.scss';

type Props =
  | ({
      tag?: 'input';
    } & InputHTMLAttributes<HTMLInputElement>)
  | ({
      tag: 'textarea';
    } & InputHTMLAttributes<HTMLTextAreaElement>);

export default function InputText({
  tag,
  children,
  className,
  ...props
}: Props) {
  return createElement(
    tag ?? 'input',
    { ...props, className: [className, styles.input].join(' ') },
    children
  );
}
