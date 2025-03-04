import './login.css';

type LoginInputProps = React.ComponentProps<'input'> & {
  label: string;
};

function LoginInput({ id, label, ...restProps }: LoginInputProps) {
  return (
    <div className="login-input">
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <input id={id} {...restProps} />
    </div>
  );
}

export default LoginInput;
