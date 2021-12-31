import React from 'react'
import { PropTypes } from 'prop-types'

import Bookmark from '../common/Bookmark'
import QualityList from './qualities'
import Table, { TableHeader, TableBody } from '../../components/common/table'
import Profession from '../ui/profession'

const UsersTable = ({
  users,
  currentSort,
  setSortBy,
  toggleBookMarkHanble,
  ...rest
}) => {
  const columns = {
    name: { iter: 'name', name: 'Имя' },
    qualities: {
      name: 'Качество',
      component: (user) => <QualityList qualities={user.qualities} />
    },
    professions: {
      iter: 'profession',
      name: 'Профессия',
      component: (user) => <Profession id={user.profession} />
    },
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
    }
    // delete: {
    //   component: (user) => (
    //     <button
    //       className="btn btn-danger"
    //       onClick={() => {
    //         deleteUserHandler(user._id)
    //       }}
    //     >
    //       Delete
    //     </button>
    //   )
    // }
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
  setSortBy: PropTypes.func
}
