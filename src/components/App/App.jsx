import { SerchBar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { useState, useEffect } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { getImges } from '../../api';
import css from './App.module.css';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';

export const App = () => {
  const [page, setPage] = useState(1);
  const [keyWord, setKeyWord] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const totalHits = page * 12;

  const getKeyWord = q => {
    setKeyWord(q.trim());
    setPage(1);
    setImages([]);
    setError(null);
  };

  useEffect(() => {
    async function fetchImages() {
      if (keyWord) {
        try {
          setIsLoading(true);

          const fetchImages = await getImges(keyWord, page);

          setImages(prevState => [...prevState, ...fetchImages.hits]);
        } catch (error) {
          setError('Something was happened, try again');
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchImages();
  }, [keyWord, page]);

  const loadMore = () => {
    setPage(prevState => (prevState += 1));
  };

  return (
    <div className={css.App}>
      <SerchBar onSubmit={getKeyWord} />
      {isLoading && (
        <div className={css.Loader}>
          <InfinitySpin width="200" color="#3f51b5" />
        </div>
      )}
      {images.length > 0 && keyWord && <ImageGallery images={images} />}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {keyWord && images.length === 0 && !isLoading && (
        <ErrorMessage>Nothing was found by your request</ErrorMessage>
      )}
      {!keyWord && <ErrorMessage>Enter keyword to search</ErrorMessage>}

      {images.length > 11 && totalHits <= 488 && keyWord && (
        <Button onButtonClick={loadMore}>Load more</Button>
      )}
    </div>
  );
};
