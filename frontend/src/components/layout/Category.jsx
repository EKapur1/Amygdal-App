import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Column from '../layout/Column';
import { Link } from 'react-router-dom';
import './Category.css';

const Category = () => {
  const [hasToken, setHasToken] = useState(
    localStorage.getItem('token') ? true : false
  );

  useEffect(() => {
    if (!localStorage.getItem('token')) setHasToken(false);
    else setHasToken(true);
  });

  const [columns, setColumns] = useState([
    {
      id: 0,
      name: 'Column 1',
    },
    {
      id: 1,
      name: 'Column 2',
    },
  ]);

  const [items, setItems] = useState([
    { id: 0, text: 'Item 1', category: 0 },
    { id: 1, text: 'Item 2', category: 0 },
    { id: 2, text: 'Item 3', category: 1 },
    { id: 3, text: 'Item 4', category: 1 },
    { id: 4, text: 'Item 5', category: 1 },
  ]);

  const logout = () => {
    localStorage.removeItem('token');
    // setHasToken(false);
  };

  const onDrop = (event, category) => {
    let draggedItemID = JSON.parse(event.dataTransfer.getData('itemID'));

    let newItems = items.filter((item) => {
      if (item.id === draggedItemID) {
        item.category = category;
      }
      return item;
    });

    setItems(newItems);
  };

  const addColumn = (column) => {
    setColumns([...columns, column]);
  };

  return (
    <div className='category-wrapper'>
      <div className='navbar'>
        <label className='heading'>Lottery Display</label>
        <div className='logout-btn' onClick={logout}>
          <Link to='/'>Logout</Link>
        </div>
      </div>
      {hasToken && (
        <>
          <div className='controlbar'>
            <button
              className='add-btn'
              onClick={() =>
                addColumn({
                  id: Math.max(...columns.map((col) => col.id)) + 1,
                  name:
                    'Column ' + (Math.max(...columns.map((col) => col.id)) + 2),
                })
              }
            >
              Add new category
            </button>
          </div>
          <div className='container'>
            {columns.map((column) => (
              <Column
                items={items.filter((item) => item.category === column.id)}
                category={column.id}
                name={column.name}
                onDrop={onDrop}
                key={column.id}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Category;
