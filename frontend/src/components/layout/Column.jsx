import React from 'react';
import './Column.css';
import Item from './Item';

const Column = ({ items, name, category, onDrop }) => {
  const onDragOver = (event) => {
    event.preventDefault();
  };
  return (
    <div
      className='column'
      onDragOver={onDragOver}
      onDrop={(event) => {
        onDrop(event, category);
      }}
    >
      <h1>{name}</h1>
      {items.map((item) => (
        <Item item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Column;
