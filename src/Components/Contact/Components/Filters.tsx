import React from 'react'
import { genderList } from '../../../Utils/global';
import { statusList } from '../../../Utils/global';
import MagnifyingGlassIcon from '/src/Assets/icon/MagnifyingGlass.png'
import ArrowIcon from '/src/Assets/icon/ArrowCounterClockwise.png'
import Dropdown from './Dropdown';
type Props = {
    search: string,
    gender: string,
    status: string,
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleGenderChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    handleStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    handleResetClick: () => void
}

function Filters(
  {
  search, 
  gender, 
  status, 
  handleSearchChange, 
  handleGenderChange, 
  handleStatusChange,
  handleResetClick
}: Props) {
  return (
    <div className='filter'>
      <div className='input-container'>
        <input
          type='text'
          placeholder='Search'
          value={search}
          onChange={handleSearchChange}
          className='input'
        />
        <div className='search-icon'>
          <img src={MagnifyingGlassIcon} alt='Search' />
        </div>
      </div>

      <div className='dropdown-container'>
      <Dropdown dropdownList={statusList} handleChange={handleStatusChange} state={status} name='Status' width='100px'/>
      <Dropdown dropdownList={genderList} handleChange={handleGenderChange} state={gender}  name='Gender' width='120px'/>
        {(gender !== '' || status !== '' || search !== '') && (
          <div >
            <button className='reset-button' onClick={handleResetClick}><img src={ArrowIcon}/></button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Filters  