import React, { useEffect, useState } from 'react';
import { StoryTitle } from './storyTitle';
import { Row } from 'antd';
import { StoryInfo } from './storyInfo';

export interface StoryProps {
  id: number;
  index: number;
}

export interface StoryDetails {
  by: string;
  descendants: number;
  id: number;
  kids: number[] | undefined;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export const Story: React.FC<StoryProps> = props => {
  const [story, setStory] = useState<StoryDetails>();

  useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${props.id}.json`)
      .then(response => response.json())
      .then(setStory);
  }, [props.id]);

  return (
    <>
      {story && (
        <Row>
          <StoryTitle {...story} index={props.index} />
          <StoryInfo story={story} />
        </Row>
      )}
    </>
  );
};
