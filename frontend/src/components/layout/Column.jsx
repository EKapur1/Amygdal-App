import React, { useState } from 'react';
import './Column.css';
import CategoryService from '../../services/CategoryService';
import Item from './Item';
import TaskService from '../../services/TaskService';

const Column = ({ category, setColumns }) => {
  const [name, setName] = useState(category.name);
  const [newTaskName, setNewTaskName] = useState('');

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event, category) => {
    let draggedItem = JSON.parse(event.dataTransfer.getData('item'));
    let draggedCategory = JSON.parse(event.dataTransfer.getData('category'));

    TaskService.switchCategories(draggedCategory, category, draggedItem).then(
      () => {
        CategoryService.getCategories().then((categories) => {
          setColumns(categories);
        });
      }
    );
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
            X
          </button>
        </div>
      </div>
      {category.tasks.map((item) => (
        <Item
          setColumns={setColumns}
          category={category}
          item={item}
          key={item._id}
        />
      ))}
      <input
        type='text'
        name='task'
        className='add-task-input'
        placeholder='Add new task...'
        value={newTaskName}
        onChange={(event) => {
          setNewTaskName(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.keyCode === 13) {
            TaskService.addTask(category, { text: newTaskName }).then(() => {
              setNewTaskName('');
              CategoryService.getCategories().then((categories) => {
                setColumns(categories);
              });
            });
          }
        }}
      />
    </div>
  );
};

export default Column;
