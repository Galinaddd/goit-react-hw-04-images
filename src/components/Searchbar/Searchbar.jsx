import { useState } from 'react';
import css from './Searchbar.module.css';
import { CgSearch } from 'react-icons/cg';
import PropTypes from 'prop-types';

export const SerchBar = ({ onSubmit }) => {
  const [serchQuery, setSerchQuery] = useState('');

  const handleOnChange = evt => {
    setSerchQuery(evt.currentTarget.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    console.log(onSubmit);
    console.log(serchQuery);

    onSubmit(serchQuery);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}></span>
          <CgSearch />
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleOnChange}
        />
      </form>
    </header>
  );
};

SerchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
