import React, { useState } from 'react';
import { Drawer, Icon } from 'antd';
import './storyTitle.css';

export interface StoryTitleProps {
  url: string;
  title: string;
  index: number;
}

export const StoryTitle: React.FC<StoryTitleProps> = props => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const parseHostname = (urlStr: string) => {
    try {
      const url = new URL(urlStr);
      return (
        <>
          {`(${url.hostname.replace('www.', '')})`}
          &nbsp;
          <Icon type="link" />
        </>
      );
    } catch (err) {
      return null;
    }
  };
  return (
    <>
      <div style={{ display: 'inline' }}>
        <span>{props.index}</span>
        &nbsp;
        <h3 style={{ display: 'inline', color: 'gray', cursor: 'pointer' }} onClick={() => setIsOpen(true)}>
          {props.title}
        </h3>
        <a href={props.url}>
          &nbsp;
          {parseHostname(props.url)}
        </a>
      </div>
      <Drawer
        title="Basic Drawer"
        placement="left"
        closable={false}
        onClose={() => setIsOpen(false)}
        visible={isOpen}
        bodyStyle={{ padding: 0 }}
        width={'95%'}
      >
        <iframe
          title={props.url}
          is="x-frame-bypass"
          style={{ position: 'absolute', top: 0, left: 0 }}
          src={props.url}
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen={true}
        />
      </Drawer>
    </>
  );
};
