import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import FiltersGroup from '../FiltersGroup'
import Header from '../Header'
import JobCard from '../JobCard'
import './index.css'

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'Failure',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    minimumSalary: '',
    employeeTypeList: [],
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }
  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {minimumSalary, employeeTypeList, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employeeTypeList.join()}&minimum_package=${minimumSalary}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const jobsData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({jobsList: jobsData, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderjobsList = () => {
    const {jobsList} = this.state
    const showJobsList = jobsList.length > 0

    return showJobsList ? (
      <div className="all-jobs-container">
        <ul className="jobs-list">
          {jobsList.map(eachJob => (
            <JobCard key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="jobs-loader-view" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="jobs-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="jobs-failure-button"
        onClick={this.getJobs}
      >
        Retry
      </button>
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderjobsList()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  enterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  changeSalary = salaryRangeId => {
    this.setState({minimumSalary: salaryRangeId}, this.getJobs)
  }

  changeEmployeeList = type => {
    const {employeeTypeList} = this.state

    const inputNotInList = employeeTypeList.filter(
      eachItem => eachItem === type,
    )
    //console.log(inputNotInList)
    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          employeeTypeList: [...prevState.employeeTypeList, type],
        }),
        this.getJobs,
      )
    } else {
      const filteredData = employeeTypeList.filter(
        eachItem => eachItem !== type,
      )
      //console.log(filteredData)
      this.setState({employeeTypeList: filteredData}, this.getJobs)
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="jobs-content">
            <FiltersGroup
              changeSearchInput={this.changeSearchInput}
              changeSalary={this.changeSalary}
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              getJobs={this.getJobs}
              searchInput={searchInput}
              changeEmployeeList={this.changeEmployeeList}
            />
            <div className="search-input-and-jobs-list-conatiner">
              <div className="desktop-search-input-container">
                <input
                  type="search"
                  className="desktop-search-input"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.changeSearchInput}
                  onKeyDown={this.enterSearchInput}
                />
                <button
                  type="button"
                  className="desktop-search-btn"
                  onClick={this.getJobs}
                  data-testid="searchButton"
                >
                  <BsSearch className="desktop-search-icon" />
                </button>
              </div>
              {this.renderAllJobs()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
