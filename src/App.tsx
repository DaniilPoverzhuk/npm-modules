import { useEffect } from 'react';
import useDocumentVisibility from './hooks/useDocumentVisibility';
import MediaQuery from './components/MediaQuery';

const App = () => {
  const { count, visible, onChangeVisibility } = useDocumentVisibility();
  // const isMobile = useMediaQuery({ query: '(max-width: 500px)' });

  useEffect(() => {
    onChangeVisibility(visible => {
      console.log('first handler', visible);
    });

    const onsubscribe = onChangeVisibility(visible => {
      console.log('second handler', visible);
    });

    setTimeout(() => {
      onsubscribe();
    }, 5000);
  }, []);

  return (
    <div>
      <span>
        <MediaQuery minWidth={700}>MediaQuery test</MediaQuery>
        Вы покинули страницу: {count} раз. <br />
        Вкладка активна? {visible ? 'да' : 'нет'}
      </span>
    </div>
  );
};

export default App;
