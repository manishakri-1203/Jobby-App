import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {BsStarFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header'
import SkillCard from '../SkillCard'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}
class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobData: {},
    similarJobsData: [],
  }

  componentDidMount() {
    this.getJobsData()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
  })

  getFormattedSimilarData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    //console.log(this.props)
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    //console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      //console.log(fetchedData)
      const updatedData = this.getFormattedData(fetchedData.job_details)
      const updatedSimilarJobsData = fetchedData.similar_jobs.map(
        eachSimilarJob => this.getFormattedSimilarData(eachSimilarJob),
      )
      this.setState({
        jobData: updatedData,
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetailsView = () => {
    const {jobData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = jobData
    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="job-details-success-view">
        <div className="job-item-container">
          <div className="logo-title-location-container">
            <div className="logo-title-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div className="title-rating-container">
                <h1 className="company-title">{title}</h1>
                <div className="rating-container">
                  <BsStarFill className="rating-icon" />
                  <p className="company-rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-package-container">
              <div className="location-employment-type-container">
                <div className="location-container">
                  <MdLocationOn className="company-location-icon" />
                  <p className="company-location">{location}</p>
                </div>
                <div className="employment-type-container">
                  <BsFillBriefcaseFill className="brief-case-icon" />
                  <p className="employment-type-detail">{employmentType}</p>
                </div>
              </div>
              <p className="package-detail">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="line" />
          <div className="description-visit-container">
            <h1 className="description-heading">Description</h1>
            <div className="visit-container">
              <a
                href={companyWebsiteUrl}
                target="_blank"
                className="company-website-url"
              >
                Visit
              </a>
              <BiLinkExternal className="visit-icon" />
            </div>
          </div>
          <p className="job-description">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list">
            {skills.map(eachSkill => (
              <SkillCard key={eachSkill.name} skillDetails={eachSkill} />
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="life-at-company-description">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-company-img"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobsData.map(eachSimilarJob => (
            <SimilarJobItem
              key={eachSimilarJob.id}
              similarJobDetails={eachSimilarJob}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="job-details-loader-view-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="job-details-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="error-view-img"
      />
      <h1 className="job-details-failure-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="job-details-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="job-details-failure-button"
        onClick={this.getJobsData}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
