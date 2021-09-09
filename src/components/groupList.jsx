import React from 'react'
import PropTypes from 'prop-types'

const GroupList = ({
  professions,
  onItemSelect,
  valueProperty,
  contentProperty,
  selectedProf,
  resetProfessionsHandler
}) => {
  console.log(Array.isArray(professions))
  return (
    <div className="d-flex flex-column flex-shrink-0">
      <ul className="list-group mt-2">
        {!Array.isArray(professions) &&
          Object.keys(professions).map((key) => {
            return (
              <li
                key={professions[key][valueProperty]}
                onClick={() => {
                  onItemSelect(professions[key])
                }}
                className={
                  selectedProf === professions[key]
                    ? 'list-group-item active'
                    : 'list-group-item '
                }
                role="button"
              >
                {professions[key][contentProperty]}
              </li>
            )
          })}

        {Array.isArray(professions) &&
          professions.map((item) => {
            return (
              <li
                key={item[valueProperty]}
                onClick={() => {
                  onItemSelect(item)
                }}
                className={
                  selectedProf === item
                    ? 'list-group-item active'
                    : 'list-group-item '
                }
                role="button"
              >
                {item[contentProperty]}
              </li>
            )
          })}
      </ul>
      <div className="d-flex align-items-center justify-content-center">
        <button
          className="btn btn-outline-primary mt-2 "
          onClick={resetProfessionsHandler}
        >
          Reset
        </button>
      </div>
    </div>
  )
}
GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
}
GroupList.propTypes = {
  professions: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onItemSelect: PropTypes.func,
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  selectedProf: PropTypes.object,
  resetProfessionsHandler: PropTypes.func
}
export default GroupList
