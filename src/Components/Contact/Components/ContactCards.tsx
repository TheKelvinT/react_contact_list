import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import {Skeleton, Divider} from 'antd';
import getCall from '../../../Services/getCall';

type Props = {
  data: any,
  selectedCardId: number | null,
  handleCardClick: (id: number) => void
  loadMoreData: () => void
}

const ContactCards = ({data, selectedCardId, handleCardClick, loadMoreData}: Props) => {
  console.log('ContactCards component re-rendered');

  if (!data || !data.info || !data.results) {
    return null; 
  }

  console.log(data)
  return (
    <div id='contact-list'  className='contact-list'> 
    <InfiniteScroll
        dataLength={data.results.length} 
        next={loadMoreData}
        hasMore={data.info.next}
        loader={<p className='end'>Loading...</p>}
        endMessage={<p className='end'>It is all, nothing more 🤐</p>}
        scrollableTarget="contact-list"
      >
   
        {data.results && data.results.map((contact: any) => (
          
          <div  className={`contact-card ${selectedCardId === contact.id ? 'selected' : ''}`} onClick={() => handleCardClick(contact.id)} key={contact.id}>
                <div className='left-container'>
              <img src={contact.image} alt={contact.name}/>
                </div>
                <div className='right-container'>
                    <h3>{contact.name}</h3>
                    <p>{contact.species}</p>
                </div>
              </div>
            ))}
    
      </InfiniteScroll>
      </div>
  
  )
}

export default ContactCards