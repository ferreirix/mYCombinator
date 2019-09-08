import React, { useState, useEffect } from 'react';
import { Collapse } from 'antd';
import moment from 'moment';
const { Panel } = Collapse;

export interface CommentProps {
  commentId: number;
}

export interface IComment {
  by: string;
  id: number;
  kids: number[];
  parent: number | undefined;
  text: string;
  time: number;
  type: string;
}

export const Comment: React.FC<CommentProps> = props => {
  const [comment, setComment] = useState<IComment>();

  useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${props.commentId}.json`)
      .then(response => response.json())
      .then(setComment);
  }, [props.commentId]);

  return (
    <Collapse defaultActiveKey={[props.commentId]} bordered={false}>
      {comment && (
        <Panel header={`${comment.by || 'anonymous'} - ${moment.unix(comment.time).fromNow()}`} key={props.commentId}>
          <div dangerouslySetInnerHTML={{ __html: comment.text }}></div>
          {comment.kids && comment.kids.map(c => <Comment commentId={c} key={c} />)}
        </Panel>
      )}
    </Collapse>
  );
};
