import './form-input.css';
import { useId } from 'react';
import { RegisterFormInputData } from './RegisterForm';

type FormInputProps = Omit<
  React.ComponentProps<'input'>,
  'value' | 'onClick' | 'name'
> & {
  name: keyof RegisterFormInputData;
  label: string;
  regex: RegExp;
  value: string;
  alertMessage: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (name: keyof RegisterFormInputData) => Promise<void>;
  isLabelSrOnly?: boolean;
  checkDuplicateButton?: boolean;
};

function FormInput({
  name,
  label,
  alertMessage,
  regex,
  value,
  onChange,
  onClick,
  isLabelSrOnly = false,
  checkDuplicateButton = false,
  ...restProps
}: FormInputProps) {
  const id = useId();
  const labelSrOnly = isLabelSrOnly ? 'sr-only' : '';

  return (
    <div className="form-input">
      <>
        <label className={labelSrOnly} htmlFor={id}>
          {label}
        </label>
        <div className="form-input__wrapper">
          <input
            id={id}
            onChange={onChange}
            value={value}
            name={name}
            {...restProps}
          />
          {checkDuplicateButton ? (
            <button
              className="form-input__button"
              type="button"
              onClick={() => {
                void onClick?.(name);
              }}
            >
              중복 확인
            </button>
          ) : null}
        </div>
        {value === '' || regex.test(value) ? null : (
          <p className="form-input__alert">{alertMessage}</p>
        )}
      </>
    </div>
  );
}

export default FormInput;
