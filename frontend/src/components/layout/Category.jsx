import React, { useState, useEffect } from 'react';
import Column from '../layout/Column';
import { Link } from 'react-router-dom';
import AuthenticationHelper from '../../helpers/AuthenticationHelper';
import './Category.css';

const Category = () => {
  const [hasToken, setHasToken] = useState(
    localStorage.getItem('token') ? true : false
  );

  let config = {
    headers: {
      'x-auth-token': AuthenticationHelper.getToken(),
    },
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) setHasToken(false);
    else setHasToken(true);
  }, [hasToken]);

  const [columns, setColumns] = useState([
    {
      name: 'Prva kategorija',
      tasks: [],
      date: '',
    },
  ]);

  const [items, setItems] = useState([
    { id: 0, text: 'Play footbal', category: 0 },
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
        <div className='logout-btn-cat'>
          <Link
            style={{
              backgroundColor: 'white',
              textDecoration: 'none',
              color: 'black',
              padding: '5px 10px 8px 10px',
              borderRadius: '5px',
              marginRight: '5px',
            }}
            to='/profile'
          >
            Profile
          </Link>
          <Link
            onClick={logout}
            style={{
              backgroundColor: 'white',
              textDecoration: 'none',
              color: 'black',
              padding: '5px 10px 8px 10px',
              borderRadius: '5px',
            }}
            to='/'
          >
            Logout
          </Link>
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
