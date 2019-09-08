import React, { useState } from 'react';
import { Drawer, Icon } from 'antd';
import { StoryDetails } from './story';
import moment from 'moment';
import { Comment } from './comment';

export interface StoryInfoProps {
  story: StoryDetails;
}

export const StoryInfo: React.FC<StoryInfoProps> = ({ story }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div style={{ padding: '3px 5px 7px 5px' }}>
        <span>
          <Icon type="like" />
          &nbsp;
          {story.score}
          &nbsp; &nbsp;
          <Icon type="clock-circle" />
          &nbsp;
          {moment.unix(story.time).fromNow()}
          &nbsp; &nbsp;
          <span onClick={() => setIsOpen(true)}>
            <Icon type="message" />
            &nbsp;
            {story.descendants}
          </span>
        </span>
      </div>
      <Drawer
        title={story.title}
        placement="left"
        closable={false}
        onClose={() => setIsOpen(false)}
        visible={isOpen}
        bodyStyle={{ padding: 0 }}
        width={'95%'}
      >
        {story.kids && story.kids.map(c => <Comment commentId={c} key={c} />)}
      </Drawer>
    </>
  );
};
