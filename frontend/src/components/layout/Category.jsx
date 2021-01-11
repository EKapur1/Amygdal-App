import React, { useState, useEffect } from 'react';
import Column from '../layout/Column';
import { Link, Redirect } from 'react-router-dom';
import './Category.css';
import CategoryService from '../../services/CategoryService';

const Category = () => {
  const [hasToken, setHasToken] = useState(
    localStorage.getItem('token') ? true : false
  );

  useEffect(() => {
    if (!localStorage.getItem('token')) setHasToken(false);
    else setHasToken(true);
  }, [hasToken]);

  const [addCatName, setAddCatName] = useState('');

  const [items, setItems] = useState([]);

  const [columns, setColumns] = useState([]);

  useEffect(() => {
    CategoryService.getCategories().then((categories) => {
      setColumns(categories);
    });
  }, []);

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
    CategoryService.addCategory(column).then(() => {
      setAddCatName('');
      CategoryService.getCategories().then((categories) => {
        setColumns(categories);
      });
    });
  };

  return (
    <div className='category-wrapper'>
      <div className='navbar'>
        <label className='heading'>Lottery Display</label>
        <div className='logout-btn-cat'>
          <Link
            style={{
              boxShadow: ' 0 3px 8px 0 rgba(0,0,0,0.19)',
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
              boxShadow: ' 0 3px 8px 0 rgba(0,0,0,0.19)',
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
      {hasToken ? (
        <>
          <div className='controlbar'>
            <input
              value={addCatName}
              onChange={(event) => {
                setAddCatName(event.target.value);
              }}
              type='text'
              placeholder='Add new list'
              className='add-input'
            />
            <button
              type='submit'
              className='add-btn'
              onClick={() =>
                addColumn({
                  name: addCatName,
                })
              }
            >
              Add List
            </button>
          </div>
          <div className='container'>
            {columns.map((column) => (
              <Column
                category={column}
                onDrop={onDrop}
                key={column._id}
                setColumns={setColumns}
              />
            ))}
          </div>
        </>
      ) : (
        <Redirect to='/' />
      )}
    </div>
  );
};

export default Category;
