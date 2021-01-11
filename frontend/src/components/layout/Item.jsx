import React, { useState } from 'react';
import CategoryService from '../../services/CategoryService';
import TaskService from '../../services/TaskService';
import './Item.css';

const Item = ({ item, category, setColumns }) => {
  const [name, setName] = useState(item.text);

  const onDragStart = (event, item, category) => {
    event.dataTransfer.setData('category', JSON.stringify(category));
    event.dataTransfer.setData('item', JSON.stringify(item));
  };

  return (
    <div
      className='item'
      draggable={true}
      onDragStart={(event) => onDragStart(event, item, category)}
    >
      <input
        className='edit-task'
        type='text'
        value={name}
        onKeyDown={(event) => {
          if (event.keyCode === 13) {
            TaskService.editTask(category, { ...item, text: name }).then(() => {
              CategoryService.getCategories().then((categories) => {
                setColumns(categories);
              });
            });
          }
        }}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <button
        onClick={() => {
          TaskService.deleteTask(category, item).then(() => {
            CategoryService.getCategories().then((categories) => {
              setColumns(categories);
            });
          });
        }}
      >
        X
      </button>
    </div>
  );
};

export default Item;
