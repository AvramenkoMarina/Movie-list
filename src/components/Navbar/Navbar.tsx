import { useState, useMemo, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { Popup } from '../Popup';
import { useAppDispatch } from '../../app/hooks';
import { setSearchQuery, sortByTitle } from '../../features/getMoviesSlice';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(setSearchQuery(value));
      }, 300),
    [dispatch]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleSortClick = () => {
    dispatch(sortByTitle());
  };

  return (
    <div className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <img className={styles.navbar__logo} src="images/logo.svg" alt="logo" />

      {openPopup && <Popup isOpen={openPopup} onClose={() => setOpenPopup(false)} />}
      <div className={styles.navbar__options}>
        <button onClick={() => setOpenPopup(true)} className={styles.navbar__addMovie}>
          Add movie
        </button>
        <div className={styles.navbar__search}>
          <input type="text" placeholder="Search" onChange={handleSearch} />
          <img src="images/icons/search-icon.svg" alt="search" />
        </div>
        <div className={styles.navbar__sort}>
          <img onClick={handleSortClick} src="images/icons/sort-icon.svg" alt="sort" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
