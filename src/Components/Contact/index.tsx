import './styles.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react'
import getCall from '../../Services/getCall';
import Loading from '../Loading';
import ContactCards from './Components/ContactCards';
import Filters from './Components/Filters';
import { ContactListModel } from '../../Types/Data/Contact';
import { message } from 'antd';
const Contact = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [gender, setGender] = useState('')
  const [contactList, setContactList] = useState<ContactListModel | null>(null)
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  useEffect(() => {
    getContactList()
  }, [status, gender, search])

  useEffect(() => {
    if (selectedCardId !== null) {
      navigate(`/contact/${selectedCardId}`);
    }
  }, [selectedCardId]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch((prevSearch) => {
      const newSearch = e.target.value;
      return newSearch;
    });
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };
  
  const getContactList = async() => {
  setIsLoading(true)
  setError(null);
  try {
    const res = await getCall(`/character?name=${search}&status=${status}&gender=${gender}`)
    if(res){
      setIsLoading(false)
      setContactList(res)
      if(res.data === ''){
        setContactList(null)
        setError('No data found')
      }
    }
  } catch (err) {
      setIsLoading(false)
      setError('An error occurred while fetching data.');
      if(error){
        message.error(error)
      }
    }
  }

  const handleCardClick: any = (id: number) => {
    setSelectedCardId(id);
  };

  const loadMoreData = async() => {
    try {
      if(contactList && contactList.info.next){
        const res = await getCall(contactList.info.next, false)
        if(res){
          setContactList((prevState) => ({
            ...prevState!,
            results: [...prevState!.results, ...res.results],
            info: res.info,
          }));
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleResetClick: any = (id: number) => {
    setStatus('');  
    setSearch('');
    setGender('');
    setSelectedCardId(null);
  };

  return (
    <div className = 'main-container'>
      <div className='contact-container'>
          <h2>Contact</h2>
          <Filters 
            gender={gender} 
            search={search} 
            status={status} 
            handleSearchChange={handleSearchChange} 
            handleGenderChange={handleGenderChange}
            handleStatusChange={handleStatusChange} 
            handleResetClick={handleResetClick}/>
            {
              isLoading? <Loading/> : error ? 
              (
                <p>{error}</p>
              )   
              :  
              (<ContactCards 
                data={contactList} 
                selectedCardId={selectedCardId} 
                handleCardClick={handleCardClick} 
                loadMoreData={loadMoreData}
                />
              )
            }
      </div>
      <Outlet/>
    </div>
  );
};

export default Contact;
