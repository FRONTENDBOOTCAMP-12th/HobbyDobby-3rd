export const hidePlaceholder = (
  event: React.FocusEvent<HTMLTextAreaElement>
) => {
  event.target.placeholder = '';
};

export const showPlaceholder = (
  event: React.FocusEvent<HTMLTextAreaElement>,
  placeholder: string
) => {
  event.target.placeholder = placeholder;
};
