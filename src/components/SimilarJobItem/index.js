import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {BsStarFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    rating,
    title,
    jobDescription,
    location,
  } = similarJobDetails

  return (
    <li className="similar-jobs-item">
      <div className="logo-title-location-container">
        <div className="logo-title-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
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
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJobItem
