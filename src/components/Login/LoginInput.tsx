import { useId } from 'react';

type LoginInputProps = React.ComponentProps<'input'> & {
  label: string;
  alertMessage: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValidInput: boolean;
  isLabelSrOnly?: boolean;
};

function LoginInput({
  label,
  alertMessage,
  onChange,
  isValidInput,
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
      <input id={id} onChange={onChange} {...restProps} />
      <p style={isValidInput ? { display: 'none' } : {}}>{alertMessage}</p>
    </div>
  );
}

export default LoginInput;
