import './form-input.css';
import { useId } from 'react';

type FormInputProps = Omit<React.ComponentProps<'input'>, 'value'> & {
  label: string;
  alertMessage: string;
  regex: RegExp;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLabelSrOnly?: boolean;
  isCheckDuplication?: boolean;
};

function FormInput({
  label,
  alertMessage,
  regex,
  value,
  onChange,
  isLabelSrOnly = false,
  isCheckDuplication = false,
  ...restProps
}: FormInputProps) {
  const id = useId();
  const labelSrOnly = isLabelSrOnly ? 'sr-only' : '';

  const handleClick = () => {
    value = '';
  };

  return (
    <div className="form-input">
      <>
        <label className={labelSrOnly} htmlFor={id}>
          {label}
        </label>
        <div className="form-input__wrapper">
          <input id={id} onChange={onChange} value={value} {...restProps} />
          {isCheckDuplication ? (
            <button
              className="form-input__button"
              type="button"
              onClick={handleClick}
            >
              중복 확인
            </button>
          ) : null}
        </div>
        {value === '' || regex.test(value) ? null : <p>{alertMessage}</p>}
      </>
    </div>
  );
}

export default FormInput;
