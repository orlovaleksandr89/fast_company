import React from 'react'
import { PropTypes } from 'prop-types'
import _ from 'lodash'

const TableBody = ({ users, columns }) => {
  const renderContent = (item, column) => {
    if (columns[column].component) {
      const component = columns[column].component
      if (typeof component === 'function') {
        return component(item)
      }
      return component
    }
    return _.get(item, columns[column].iter)
  }

  return (
    <tbody>
      {users.map((item) => (
        <tr key={item._id}>
          {Object.keys(columns).map((column) => (
            <td key={column}>{renderContent(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
TableBody.propTypes = {
  users: PropTypes.array,
  columns: PropTypes.object
}
export default TableBody
