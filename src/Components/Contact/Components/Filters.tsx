import React from 'react'
import { genderList } from '../../../Utils/global';
import { statusList } from '../../../Utils/global';
import MagnifyingGlassIcon from '/src/Assets/icon/MagnifyingGlass.png'
import ArrowIcon from '/src/Assets/icon/ArrowCounterClockwise.png'
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

      <div className='select-container'>
        <select value={status} onChange={handleStatusChange}>
          {statusList.map((statusOption) => (
            <option key={statusOption.value} value={statusOption.value}>
              {statusOption.label}
            </option>
          ))}
        </select>
      
        <select value={gender} onChange={handleGenderChange}>
          {genderList.map((genderOption) => (
            <option key={genderOption.value} value={genderOption.value}>
              {genderOption.label}
            </option>
          ))}
        </select>

        {(gender !== '' || status !== '' || search !== '') && (
          <div>
            <button className='reset-button' onClick={handleResetClick}><img src={ArrowIcon}/></button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Filters  