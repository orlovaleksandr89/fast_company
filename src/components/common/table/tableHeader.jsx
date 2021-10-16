import React from 'react'
import PropTypes from 'prop-types'

const TableHeader = ({ currentSort, setSortBy, columns }) => {
  const handleSort = (name) => {
    if (currentSort.iter === name) {
      setSortBy({
        ...currentSort,
        order: currentSort.order === 'asc' ? 'desc' : 'asc'
      })
    } else {
      setSortBy({ iter: name, order: 'asc' })
    }
  }

  const renderSortArrow = (currentSort, currentPath) => {
    if (currentSort.iter === currentPath) {
      if (currentSort.order === 'asc') {
        return <i className="bi bi-caret-down-fill"></i>
      }
      return <i className="bi bi-caret-up-fill"></i>
    }
    return null
  }

  return (
    <thead className="border-bottom border-dark">
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            onClick={
              columns[column].iter
                ? () => handleSort(columns[column].iter)
                : undefined
            }
            {...{ role: columns[column].iter && 'button' }}
            scope="col"
            className="text-start align-middle "
            key={column}
          >
            <div className="justify-content-center d-flex">
              {columns[column].name}{' '}
              {renderSortArrow(currentSort, columns[column].iter)}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  )
}
TableHeader.propTypes = {
  handleSort: PropTypes.func,
  currentSort: PropTypes.object,
  setSortBy: PropTypes.func,
  columns: PropTypes.object
}
export default TableHeader
