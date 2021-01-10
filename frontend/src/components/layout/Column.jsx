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
      <div className='head-col'>
        <label>
          <strong>{name}</strong>
        </label>
        <div className='col-btns'>
          <button className='add-task-btn'>Add</button>
          <button className='del-col-btn'>✖</button>
        </div>
      </div>
      {items.map((item) => (
        <Item item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Column;
