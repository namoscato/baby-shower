import styles from "./AttendingInput.module.css";
import cn from "classnames";

interface Props {
  value?: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

export const AttendingInput = ({ value, onChange, disabled }: Props) => {
  return (
    <div>
      <button
        disabled={disabled}
        className={cn(styles.button, {
          [styles.selected]: value,
        })}
        type="button"
        onClick={() => onChange(true)}
      >
        Yes!
      </button>
      <button
        disabled={disabled}
        className={cn(styles.button, {
          [styles.selected]: false === value,
        })}
        type="button"
        onClick={() => onChange(false)}
      >
        No
      </button>
    </div>
  );
};
