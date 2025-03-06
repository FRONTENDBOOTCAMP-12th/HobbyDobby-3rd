import { useId } from 'react';

type LoginInputProps = Omit<React.ComponentProps<'input'>, 'value'> & {
  label: string;
  alertMessage: string;
  regex: RegExp;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLabelSrOnly?: boolean;
  isCheckDuplication?: boolean;
};

function LoginInput({
  label,
  alertMessage,
  regex,
  onChange,
  value,
  isLabelSrOnly = false,
  isCheckDuplication = false,
  ...restProps
}: LoginInputProps) {
  const id = useId();
  const labelSrOnly = isLabelSrOnly ? 'sr-only' : '';

  return (
    <div className="login-input">
      {isCheckDuplication ? (
        <>
          <div>
            <label className={labelSrOnly} htmlFor={id}>
              {label}
            </label>
            <input id={id} onChange={onChange} value={value} {...restProps} />
            {value === '' || regex.test(value) ? null : <p>{alertMessage}</p>}
          </div>
          <button type="button">중복 확인</button>
        </>
      ) : (
        <>
          <label className={labelSrOnly} htmlFor={id}>
            {label}
          </label>
          <input id={id} onChange={onChange} value={value} {...restProps} />
          {value === '' || regex.test(value) ? null : <p>{alertMessage}</p>}
        </>
      )}
    </div>
  );
}

export default LoginInput;
