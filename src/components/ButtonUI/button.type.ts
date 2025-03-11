export interface ButtonUIProps {
  type: 'button' | 'submit' | 'reset';
  content: string;
  className?: string;
  onClick: () => void;
  bgColor?: string;
  color?: string;
}
