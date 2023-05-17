//assets
import edit from '../../assets/icons/edit.svg'
import file from '../../assets/icons/file.svg'
import filledstar from '../../assets/icons/filledstar.svg'

const Icon = ({ category }) => {
  const icons = {
    Edit: edit,
    File: file,
    FilledStar: filledstar,
  }

  return (
    <img className="icon" src={icons[category]} alt={`A ${category} icon.`}/>
  )
}

export default Icon