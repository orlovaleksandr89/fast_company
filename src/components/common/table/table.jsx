import React from 'react'
import PropTypes from 'prop-types'
import TableHeader from './tableHeader'
import TableBody from './tableBody'

const Table = ({ users, currentSort, setSortBy, columns, children }) => {
  return (
    <table className="table">
      {children || (
        <>
          <TableHeader
            currentSort={currentSort}
            setSortBy={setSortBy}
            columns={columns}
          />
          <TableBody {...{ columns, users }} />
        </>
      )}
    </table>
  )
}
Table.propTypes = {
  children: PropTypes.array,
  users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  currentSort: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  setSortBy: PropTypes.func,
  columns: PropTypes.object
}
export default Table
