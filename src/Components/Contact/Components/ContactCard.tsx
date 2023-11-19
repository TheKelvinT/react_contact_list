import React from 'react'
import { ContactModel } from '../../../Types/Data/Contact'

type Props = {
    contact:ContactModel,
    handleCardClick: (id: number) => void,
    selectedCardId: number | null
}

const ContactCard = ({contact, handleCardClick, selectedCardId}: Props) => {
  return (
    <div className={`contact-card ${selectedCardId === contact.id ? 'selected' : ''}`} onClick={() => handleCardClick(contact.id)} key={contact.id}>
        <div className='left-container'>
            <img src={contact.image} alt={contact.name}/>
        </div>
        <div className='right-container'>
            <h3>{contact.name}</h3>
            <p>{contact.species}</p>
        </div>
    </div>
  )
}

export default ContactCard