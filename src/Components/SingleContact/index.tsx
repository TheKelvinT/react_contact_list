import { useEffect, useRef, useState } from 'react';
import getCall from '../../Services/getCall';
import './style.scss'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ContactModel,EpisodeModel } from '../../Types/Data/Contact';
import { Table, Tag, message } from 'antd';
import type { ColumnsType, TablePaginationConfig, TableProps } from 'antd/es/table';
import { TableDataType } from '../../Types/PropsTypes';
import { SorterResult } from 'antd/es/table/interface';
import { paginationInit } from '../../Utils/paginationConfig';
import PersonalInfo from './Components/PersonalInfo';
import { formatDate } from '../../Utils/formateDate';
import NotFound from './Components/NotFound';
import Background from './Components/NotFound';

const SingleContact = () => {
  const scrollableRef = useRef<HTMLDivElement | null>(null);;
  const {id} = useParams()
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string|null>(null)
  const [contact, setContact] = useState<ContactModel|null >(null)
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
      getEpisodeList()
    }
  }, [id,episodeIds])

/* GET SINGLE CONTACT API */
  const getContact = async() => {
    setIsLoading(true)
    setError(null);
    try {
      const res = await getCall(`/character/${id}`)
      if(res){
        if(res.data === ''){
          setContact(null)
          setError('No data found')
          if(error){
            message.error(error)
          }
        } else if (res.error){
          message.error(res.error)
          setError(res.error)
        } else {
          setIsLoading(false)
          setContact(res)
        }
     
        const episodeURLs = res.episode
        const episodeIds = []

        for (const episodeURL of episodeURLs) {
          const episodeId = extractEpisodeId(episodeURL); 
          episodeIds.push(episodeId);
        }
        setEpisodeIds(episodeIds)

      } else {
        setError('No data found')
        if(error){
          message.error(error)
        }
      }
    }
    catch (err) {
      setIsLoading(false)
      setError('An error occurred while fetching data.');
      if(error){
        message.error(error)
      }  
    }
  }

  /* FUNCTION TO EXTRACT EPISODE ID FROM SINGLE CONTACT RESPONSE AND PASS TO GET EPISODE LIST */
  const extractEpisodeId = (url: string) => {
    const parts = url.split("/");
    return parseInt(parts[parts.length - 1], 10);
  };

  /* GET MULTIPLE EPISODE LIST */
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
    } catch (err) {
      setError('An error occurred while fetching data.');
      message.error(error)
    }
  }

  /* TABLE COLUMNS CONFIG */
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
    <>
      {error ? (
        <NotFound/>
      ) : 
      (contact && episodeList) ?  (
    <div className='details-container ' ref={scrollableRef}>
          <div className='header'>
            <img src={contact && contact.image} alt={contact && contact.name} />
            <h1>{contact && contact.name}</h1>
          </div>
      <PersonalInfo contact={contact} />
      <div className='episodes'>
        <h2>Episodes</h2>
        {episodeList.length > 0 && 
        <Table 
          columns={columns} 
          dataSource={episodeList && episodeList} 
          pagination={pagination}  
          onChange={onChange} 
          className='table'
          />}
      </div>
    </div>
    ): null }
    </>  
  );
};

export default SingleContact;
