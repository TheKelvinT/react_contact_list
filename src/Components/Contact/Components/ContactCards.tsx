import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import getCall from '../../../Services/getCall';
import ContactCard from './ContactCard';

type Props = {
  data: any,
  selectedCardId: number | null,
  handleCardClick: (id: number) => void
  loadMoreData: () => void
}

const ContactCards = ({data, selectedCardId, handleCardClick, loadMoreData}: Props) => {

  if (!data || !data.info || !data.results) {
    return null; 
  }

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
          <ContactCard contact={contact} handleCardClick={handleCardClick} selectedCardId={selectedCardId}/>
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default ContactCards