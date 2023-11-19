import React from 'react'
import { ContactModel } from '../../../Types/Data/Contact'
import { formatDate } from '../../../Utils/formateDate'


type Props = {
    contact: ContactModel
}

const PersonalInfo = ({contact}: Props) => {
    
  /* PERSONAL INFO SECTION */
  const content = [
    {
      label: 'Status',
      content: contact && contact.status
    },
    {
      label: 'Last Known Location',
      content: contact && contact.location.name
    },
    {
      label: 'Gender',
      content: contact && contact.gender
    },
    {
      label: 'Origin',
      content: contact && contact.origin.name
    },
    {
      label: 'Species',
      content: contact && contact.species
    },
    {
      label: 'Created Date',
      content: formatDate(contact && contact.created)
    }
  ]

  return (
    <div className='personal-info'>
        <h2>Personal Info</h2>
        <div className='info-container'>
        {content.map((item) => (
        <div key={item.label} className='info'>
        <p className='label'>{item.label}</p>
        <h3>{item.content}</h3>
        </div>
        ))}
  </div>
  </div>
  )
}

export default PersonalInfo