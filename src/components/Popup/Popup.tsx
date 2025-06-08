import { Form } from '../Form';
import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addMovie } from '../../features/getMoviesSlice';
import styles from './Popup.module.scss';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    cast: '',
    format: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newMovie = {
      title: formData.name,
      releaseYear: formData.year,
      format: formData.format,
      stars: formData.cast.split(',').map(s => s.trim()),
    };

    dispatch(addMovie(newMovie));
    onClose();
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popup__container}>
        <div className={styles.popup__content}>
          <button className={styles.popup__closeButton} onClick={onClose}>
            <img src="images/icons/close-icon.svg" alt="close" />
          </button>
          <div className={styles.popup__form}>
            <form onSubmit={handleSubmit} className={styles.popup__form}>
              <Form formData={formData} onChange={handleChange} />
              <button type="submit" className={styles.popup__button}>
                Add movie
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
