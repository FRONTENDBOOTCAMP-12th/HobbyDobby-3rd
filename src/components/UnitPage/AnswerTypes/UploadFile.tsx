import './upload-file.css';
import { useRef, useState } from 'react';

interface UploadFileProps {
  key: string;
  name: string;
  setNextAnswers: (value: File, type: string) => void;
}

interface FilePreview {
  file: File;
  preview: string;
}

function UploadFile({ key, name, setNextAnswers }: UploadFileProps) {
  const [file, setFile] = useState<FilePreview | null>(null);
  const inputRef = useRef(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      const nextFile = {
        file: selectedFile,
        preview: URL.createObjectURL(selectedFile),
      };

      setFile(nextFile);
      setNextAnswers(nextFile.file, 'file');
    }
  };

  const removeFile = () => {
    setFile(null);

    (inputRef.current! as HTMLInputElement).value = '';
  };

  return (
    <div key={key} className="upload-file">
      {file ? (
        <img src={file?.preview} alt="preview" />
      ) : (
        <div className="upload-file__preview"></div>
      )}
      <div className="upload-file__input-wrapper">
        <label>
          <span role="button">파일 업로드</span>
          <input
            type="file"
            name={name}
            onChange={handleFileChange}
            ref={inputRef}
          />
        </label>

        <button type="button" onClick={removeFile}>
          삭제
        </button>
      </div>
    </div>
  );
}

export default UploadFile;
