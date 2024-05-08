import {BsSearch} from 'react-icons/bs'
import ProfileDetails from '../ProfileDetails'

import './index.css'

const FiltersGroup = props => {
  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event)
  }

  const onEnterSearchInput = event => {
    const {getJobs} = props
    if (event.key === 'Enter') {
      getJobs()
    }
  }

  const renderSearchInput = () => {
    const {getJobs, searchInput} = props

    return (
      <div className="mobile-search-input-conatiner">
        <input
          type="search"
          className="mobile-search-input"
          placeholder="Search"
          value={searchInput}
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <button
          type="button"
          className="mobile-search-btn"
          onClick={getJobs}
          data-testid="searchButton"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  const onSelectEmployeeType = event => {
    const {changeEmployeeList} = props
    changeEmployeeList(event.target.value)
  }

  const renderTypeOfEmployment = () => {
    const {employmentTypesList} = props

    return (
      <div className="employment-type-filter-container">
        <h1 className="employment-type-heading">Type of Employment</h1>
        <ul className="employment-type-list">
          {employmentTypesList.map(eachEmployeeType => (
            <li
              key={eachEmployeeType.employmentTypeId}
              className="employment-type-item"
            >
              <input
                type="checkbox"
                id={eachEmployeeType.employmentTypeId}
                value={eachEmployeeType.employmentTypeId}
                className="check-input"
                onChange={onSelectEmployeeType}
              />
              <label
                className="check-label"
                htmlFor={eachEmployeeType.employmentTypeId}
              >
                {eachEmployeeType.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const onChangeSalary = event => {
    const {changeSalary} = props
    changeSalary(event.target.value)
  }
  const renderSalaryRange = () => {
    const {salaryRangesList} = props

    return (
      <div className="salary-range-container">
        <h1 className="salary-range-heading">Salary Range</h1>
        <ul className="salary-range-list">
          {salaryRangesList.map(eachSalaryRange => (
            <li
              key={eachSalaryRange.salaryRangeId}
              className="salary-range-item"
            >
              <input
                type="radio"
                id={eachSalaryRange.salaryRangeId}
                className="check-input"
                value={eachSalaryRange.salaryRangeId}
                name="salary"
                onChange={onChangeSalary}
              />
              <label
                className="check-label"
                htmlFor={eachSalaryRange.salaryRangeId}
              >
                {eachSalaryRange.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  return (
    <div className="filters-group-container">
      {renderSearchInput()}
      <ProfileDetails />
      <hr className="horizontal-line" />
      {renderTypeOfEmployment()}
      <hr className="horizontal-line" />
      {renderSalaryRange()}
    </div>
  )
}

export default FiltersGroup
