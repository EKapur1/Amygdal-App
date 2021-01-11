import React, { useState } from 'react';
import './Column.css';
import CategoryService from '../../services/CategoryService';
import Item from './Item';

const Column = ({ category, onDrop, setColumns }) => {
  const [name, setName] = useState(category.name);

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
        <input
          type='text'
          name='task'
          className='add-task-input'
          placeholder='Edit task...'
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.keyCode === 13) {
              CategoryService.editCategory({ ...category, name }).then(() => {
                CategoryService.getCategories().then((categories) => {
                  setColumns(categories);
                });
              });
            }
          }}
        />
        <div className='col-btns'>
          <button
            className='del-col-btn'
            onClick={() => {
              CategoryService.deleteCategory(category).then(() => {
                CategoryService.getCategories().then((categories) => {
                  setColumns(categories);
                });
              });
            }}
          >
            Delete
          </button>
        </div>
      </div>
      {category.tasks.map((item) => (
        <Item item={item} key={item.id} />
      ))}
      <input
        type='text'
        name='task'
        className='add-task-input'
        placeholder='Add new task...'
      />
    </div>
  );
};

export default Column;
