export function splitText(input: string): string[] {
  // 빈칸 'ㅁ'을 기준으로 나누되, 나머지 글자는 그대로 두기
  const parts: string[] = [];
  let temp = '';

  for (const char of input) {
    if (char === 'ㅁ') {
      if (temp) {
        parts.push(temp); // 'ㅁ' 이전 텍스트가 있으면 배열에 추가
        temp = ''; // 텍스트 초기화
      }
      parts.push('ㅁ'); // 'ㅁ'을 빈칸으로 추가
    } else {
      temp += char; // 'ㅁ'이 아닌 문자는 temp에 누적
    }
  }

  if (temp) {
    parts.push(temp); // 남은 텍스트가 있으면 추가
  }

  return parts;
}
