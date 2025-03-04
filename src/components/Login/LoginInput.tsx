type LoginInputProps = React.ComponentProps<'input'> & {
  label: string;
  isLabelSrOnly?: boolean;
};

function LoginInput({
  id,
  label,
  isLabelSrOnly = false,
  ...restProps
}: LoginInputProps) {
  const labelSrOnly = isLabelSrOnly ? 'sr-only' : '';

  return (
    <div className="login-input">
      <label className={labelSrOnly} htmlFor={id}>
        {label}
      </label>
      <input id={id} {...restProps} />
    </div>
  );
}

export default LoginInput;
