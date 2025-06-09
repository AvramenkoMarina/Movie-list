import React, { ChangeEvent } from 'react';
import styles from './FileUpload.module.scss';
import { UploadedFile } from '../../types/UploadedFile';

type Props = {
  onFilesUpload: (files: UploadedFile[]) => void;
};
const FileUploader: React.FC<Props> = ({ onFilesUpload }) => {
  const processFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        const newFile: UploadedFile = {
          name: file.name,
          content: result,
        };
        onFilesUpload([newFile]);
      }
    };

    reader.readAsText(file);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) processFile(selectedFile);
  };

  return (
    <form className={styles.fileUpload}>
      <label htmlFor="file-loader-button" className={styles.fileUpload__customButton}>
        Завантажити текстовий файл
      </label>

      <input id="file-loader-button" type="file" accept=".txt" onChange={handleOnChange} />
    </form>
  );
};
export default FileUploader;
