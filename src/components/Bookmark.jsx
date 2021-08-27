import React from 'react'

const Bookmark = ({ toggleBookMarkHanble, id, status }) => {
  return (
    <button
      className='btn btn-lg  '
      onClick={() => {
        toggleBookMarkHanble(id)
      }}
    >
      {!status ? (
        <i className='bi bi-bookmark'></i>
      ) : (
        <i className='bi bi-bookmark-fill'></i>
      )}
    </button>
  )
}

export default Bookmark
