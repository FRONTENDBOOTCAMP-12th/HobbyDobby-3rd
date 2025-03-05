import { useId } from 'react';

type LoginInputProps = Omit<React.ComponentProps<'input'>, 'value'> & {
  label: string;
  alertMessage: string;
  regex: RegExp;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLabelSrOnly?: boolean;
};

function LoginInput({
  label,
  alertMessage,
  regex,
  onChange,
  value,
  isLabelSrOnly = false,
  ...restProps
}: LoginInputProps) {
  const id = useId();
  const labelSrOnly = isLabelSrOnly ? 'sr-only' : '';

  return (
    <div className="login-input">
      <label className={labelSrOnly} htmlFor={id}>
        {label}
      </label>
      <input id={id} onChange={onChange} value={value} {...restProps} />
      {value === '' || regex.test(value) ? null : <p>{alertMessage}</p>}
    </div>
  );
}

export default LoginInput;
