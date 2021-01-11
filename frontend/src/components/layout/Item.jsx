import React from 'react';
import './Item.css';
import clock from '../../img/clock.png';

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
      <div className='item-footer'>
        <img src={clock} alt='clock' />{' '}
        <label htmlFor='date'>{item.date}</label>
      </div>
    </div>
  );
};

export default Item;
