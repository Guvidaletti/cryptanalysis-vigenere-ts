import SortDownIcon from '../../assets/icons/sortDownIcon';
import SortUpIcon from '../../assets/icons/sortUpIcon';
import classes from './sortHeaderButton.module.scss';

interface Props {
  children?: React.ReactNode;
  keyName: string;
  actual?: { keyName: string; order: 'asc' | 'desc' };
  onChange: (keyName: string, order: 'asc' | 'desc') => void;
}

export default function SortHeaderButton({
  keyName,
  onChange,
  children,
  actual,
}: Props) {
  return (
    <div className={classes.wrapper}>
      {children}
      <div className={classes.buttons}>
        <button
          className={[
            classes.btn,
            actual?.keyName === keyName && actual.order === 'asc'
              ? classes.active
              : '',
          ].join(' ')}
          onClick={() => {
            onChange(keyName, 'asc');
          }}
        >
          <SortUpIcon />
        </button>
        <button
          className={[
            classes.btn,
            actual?.keyName === keyName && actual.order === 'desc'
              ? classes.active
              : '',
          ].join(' ')}
          onClick={() => {
            onChange(keyName, 'desc');
          }}
        >
          <SortDownIcon />
        </button>
      </div>
    </div>
  );
}
