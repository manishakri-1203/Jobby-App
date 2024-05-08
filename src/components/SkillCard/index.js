import './index.css'

const SkillCard = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails

  return (
    <li className="skills-item">
      <img src={imageUrl} alt={name} className="skills-img" />
      <p className="skills-name">{name}</p>
    </li>
  )
}

export default SkillCard
