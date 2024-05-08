import {Link} from 'react-router-dom'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {BsStarFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item">
        <div className="logo-title-location-container">
          <div className="logo-title-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="comapany-logo"
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
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
