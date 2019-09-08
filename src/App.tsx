import React, { useEffect, useState } from 'react';
import { Story } from './story';

const App: React.FC = () => {
  const [topStoriesIds, setTopStoriesIds] = useState<number[]>();

  useEffect(() => {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(response => response.json())
      .then(setTopStoriesIds);
  }, []);

  return (
    <>
      <header></header>

      {topStoriesIds &&
        topStoriesIds.slice(0, 30).map((storyId, i) => {
          return <Story id={storyId} index={++i} key={storyId} />;
        })}
    </>
  );
};

export default App;
