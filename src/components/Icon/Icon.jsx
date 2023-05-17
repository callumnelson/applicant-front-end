//assets
import edit from '../../assets/icons/edit.svg'
import file from '../../assets/icons/file.svg'
import filledstar from '../../assets/icons/filledstar.svg'
import star from '../../assets/icons/star.svg'
import trash from '../../assets/icons/trash.svg'
import check from '../../assets/icons/check.svg'
import cancel from '../../assets/icons/cancel.svg'
import uparrow from '../../assets/icons/uparrow.svg'
import downarrow from '../../assets/icons/downarrow.svg'



const Icon = ({ category }) => {
  const icons = {
    Edit: edit,
    File: file,
    FilledStar: filledstar,
    Star: star,
    Trash: trash,
    Check: check,
    Cancel: cancel,
    UpArrow: uparrow,
    DownArrow: downarrow,
  }

  return (
    <img className="icon" src={icons[category]} alt={`A ${category} icon.`}/>
  )
}

export default Icon