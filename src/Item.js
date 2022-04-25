import React from 'react'
import {FaTrash, FaEdit} from 'react-icons/fa'

const Item = ({id, name, clearItem, editItem, setTypedItem}) => {
  return (
    <article className='item'>
        <p>{name}</p>
        <div className="button-container">
            <button
                onClick={() => {
                    editItem(id)
                }}
            >
                <FaEdit className='edit' />
            </button>

            <button
                onClick={() => {
                    clearItem(id)
                    setTypedItem('')
                }}
            >
                <FaTrash className='delete' />
            </button>
        </div>
    </article>
  )
}

export default Item