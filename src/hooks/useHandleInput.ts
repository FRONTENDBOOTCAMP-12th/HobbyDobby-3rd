import { ChangeEvent, useCallback, useState } from 'react';

interface UseHandleInputProps {
  maxLength: number;
}

export function useHandleInput({ maxLength }: UseHandleInputProps) {
  const [inputCount, setInputCount] = useState(0);

  const handleInput = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value.slice(0, maxLength);

      // 값이 변경된 경우에만 상태 업데이트
      setInputCount((prevCount) => {
        if (prevCount !== newValue.length) {
          return newValue.length;
        }
        return prevCount;
      });

      // 값이 변했는지 확인
      if (e.target.value !== newValue) {
        e.target.value = newValue;
      }
    },
    [maxLength]
  );

  return { inputCount, handleInput };
}
