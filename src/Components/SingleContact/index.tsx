import { useEffect, useRef, useState } from 'react';
import getCall from '../../Services/getCall';
import './style.scss'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ContactModel,EpisodeModel } from '../../Types/Data/Contact';
import { formatDate } from '../../Utils/formateDate';
import { Table,Tag } from 'antd';
import type { ColumnsType, TablePaginationConfig, TableProps } from 'antd/es/table';
import { TableDataType } from '../../Types/PropsTypes';
import { SorterResult } from 'antd/es/table/interface';
import { paginationInit } from '../../Utils/paginationConfig';

const SingleContact = () => {
  const scrollableRef = useRef<HTMLDivElement | null>(null);;
  const {id} = useParams()
  const location = useLocation();
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState<string|null>(null)
const [contact, setContact] = useState<ContactModel >()
const [episodeList, setEpisodeList] =  useState<any>([])
const [episodeIds, setEpisodeIds] =  useState<number[]>([])
const [pagination, setPagination] = useState<TablePaginationConfig>(paginationInit)
const [sortOrderName, setSortOrderName] = useState<'ascend' | 'descend' | null>(null);
const [sortOrderCreated, setSortOrderCreated] = useState<'ascend' | 'descend' | null>(null);
useEffect(() => {
  setPagination(paginationInit);
  setSortOrderName(null);
  setSortOrderCreated(null);
  getContact()


  
}, [id])



useEffect(() => {
  if(episodeIds.length > 0){
    
  getEpisodeList()}

}, [id,episodeIds])

const extractEpisodeId = (url: string) => {
  const parts = url.split("/");
  return parseInt(parts[parts.length - 1], 10);
};
const getContact = async() => {
    setIsLoading(true)
    setError(null);
    try {
      const res = await getCall(`/character/${id}`)
      if(res){
       setIsLoading(false)
       setContact(res)
      
   //if res.episode is array, proceed. else if its a string, push the string value into singleEpisodeId
      const episodeURLs = res.episode
      // const singleEpisodeId = ''
      const episodeIds = []

      for (const episodeURL of episodeURLs) {
        const episodeId = extractEpisodeId(episodeURL); // Extract episode ID from URL
  
        episodeIds.push(episodeId);
        
        }
        setEpisodeIds(episodeIds)

      }
      
      }
     catch (error) {
      setIsLoading(false)
      setError('An error occurred while fetching data.');
    }
  
    }

  const getEpisodeList = async() => {
      try {
        const res: EpisodeModel | EpisodeModel[] = await getCall(`/episode/${episodeIds}`)
       if(res){
        if(episodeIds.length === 1){
          const newList = []
          newList.push(res)
          setEpisodeList(newList)
        } else{
          setEpisodeList(res)
        } 
       }
     
       requestAnimationFrame(() => {
        if (scrollableRef.current) {
          scrollableRef.current.scrollTo(0, 0);
        }
      });
      } catch (error) {
        setError('An error occurred while fetching data.');
      }
  }
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

const columns: ColumnsType<TableDataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: "40%",
    showSorterTooltip: false,
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortOrder: sortOrderName,

   },
  {
    title: 'Air Date',
    dataIndex: 'air_date',
    key: 'name',
    width: "20%",
    showSorterTooltip: false,
    
    render: (text: any) => (text ? formatDate(text,false) : "-"),
  },
  {
    title: 'Episode',
    dataIndex: 'episode',
    width: "20%",
    key: 'name',
    showSorterTooltip: false,
    render: (text: any) => (text ? <Tag color="#FFFFFF33">{text}</Tag> : "-"),

  },
  {
    title: 'Created Date',
    dataIndex: 'created',
    key: 'created',
    width: "20%",
    showSorterTooltip: false,
    sorter: (a, b) => {
      const dateA = new Date(a.created).getTime();
      const dateB = new Date(b.created).getTime();
  
      return dateA - dateB;
    },
    sortOrder: sortOrderCreated,
   
    render: (text: any) => (text ? formatDate(text) : "-"),
  },
];

const onChange: TableProps<TableDataType>['onChange'] = (pagination, filters, sorter: any , extra: any) => {
  setPagination(pagination);
  if (sorter.columnKey === 'name') {
    setSortOrderName(sorter.order);
    setSortOrderCreated(null);
  } else if (sorter.columnKey === 'created') {
    setSortOrderCreated(sorter.order);
    setSortOrderName(null);
  }
};

  return (
      <div className='details-container' ref={scrollableRef}>
     
      <div className='header'>
        <img src={contact && contact.image} alt={contact && contact.name} />
        <h1>{contact && contact.name}</h1>
      </div>
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
      <div className='episodes'>
      <h2>Episodes</h2>
      
{episodeList.length > 0 && <Table columns={columns} dataSource={episodeList && episodeList} pagination={pagination}  onChange={onChange} className='table'/>}
      </div>
 
    </div>
  );
};

export default SingleContact;
