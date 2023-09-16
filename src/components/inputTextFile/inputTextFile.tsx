import {
  ButtonHTMLAttributes,
  Fragment,
  ReactNode,
  createRef,
  useState,
} from 'react';
import Button from '../button/button';
import CloseIcon from '../../assets/icons/closeIcon';
import classes from './inputTextFile.module.scss';

interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  onChange: (str: string) => void;
  icon?: ReactNode;
}

export default function InputTextFile({
  onChange,
  icon,
  children,
  ...rest
}: Props) {
  const iref = createRef<HTMLInputElement>();
  const [file, setFile] = useState<File>();

  return (
    <Fragment>
      <input
        ref={iref}
        hidden
        type='file'
        accept='.txt'
        onChange={(f) => {
          const ff = f.target.files?.[0];
          setFile(ff);

          ff?.text().then((r) => {
            onChange(r);
          });
        }}
      />
      <Button onClick={() => iref.current?.click()} {...rest}>
        {icon}
        {children}
      </Button>
      {file && file.name?.length > 0 && (
        <div className={classes.label}>
          {file.name}
          <button
            onClick={() => {
              setFile(undefined);
              onChange('');
            }}
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </Fragment>
  );
}
