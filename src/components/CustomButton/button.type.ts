export interface ButtonUIProps {
  type: 'button' | 'submit' | 'reset';
  buttonText: string;
  className?: string;
  onClick: () => void;
  bgColor?: string;
  color?: string;
}
