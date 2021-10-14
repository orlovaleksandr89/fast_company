import React from 'react'
import { PropTypes } from 'prop-types'
import TableHeader from './tableHeader'
import TableBody from './tableBody'
import Bookmark from './Bookmark'
import QualityList from './qualityList'
import Table from './table'

const UsersTable = ({
  users,
  currentSort,
  setSortBy,
  toggleBookMarkHanble,
  deleteUserHandler,
  ...rest
}) => {
  const columns = {
    name: { iter: 'name', name: 'Имя' },
    qualities: {
      name: 'Качество',
      component: (user) => <QualityList qualities={user.qualities} />
    },
    professions: { iter: 'profession.name', name: 'Профессия' },
    completedMeetings: {
      iter: 'completedMeetings',
      name: 'Встретился раз'
    },
    rate: { iter: 'rate', name: 'Оценка' },
    bookmark: {
      iter: 'status',
      name: 'Избранное',
      component: (user) => (
        <Bookmark
          toggleBookMarkHanble={toggleBookMarkHanble}
          id={user._id}
          status={user.status}
        />
      )
    },
    delete: {
      component: (user) => (
        <button
          className="btn btn-danger"
          onClick={() => {
            deleteUserHandler(user._id)
          }}
        >
          Delete
        </button>
      )
    }
  }
  return (
    <Table
      currentSort={currentSort}
      setSortBy={setSortBy}
      columns={columns}
      users={users}
    >
      <TableHeader
        currentSort={currentSort}
        setSortBy={setSortBy}
        columns={columns}
      />
      <TableBody {...{ columns, users }} />
    </Table>
  )
}

export default UsersTable
UsersTable.propTypes = {
  users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  toggleBookMarkHanble: PropTypes.func,
  currentSort: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  setSortBy: PropTypes.func,
  deleteUserHandler: PropTypes.func
}
