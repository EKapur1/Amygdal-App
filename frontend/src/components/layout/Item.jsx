import React from 'react';
import './Item.css';

const Item = ({ item }) => {
  const onDragStart = (event, id) => {
    event.dataTransfer.setData('itemID', id);
  };

  return (
    <div
      className='item'
      draggable={true}
      onDragStart={(event) => onDragStart(event, item.id)}
    >
      <p>{item.text}</p>
    </div>
  );
};

export default Item;
