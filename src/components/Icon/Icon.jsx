//assets
import edit from '../../assets/icons/edit.svg'

const Icon = ({ category }) => {
  const icons = {
    Edit: edit,
  }

  return (
    <img className="icon" src={icons[category]} alt={`A ${category} icon.`}/>
  )
}

export default Icon