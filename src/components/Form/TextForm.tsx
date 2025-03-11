import { useState } from 'react';
import './TextForm.css';

const TextForm = () => {
  const [ChallengeName, setChallengeName] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('진행할 챌린지 명', ChallengeName);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="25년 첫 독서 챌린지_"
            value={ChallengeName}
            onChange={(e) => setChallengeName(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default TextForm;
