import React, { useEffect, useState } from 'react'
import ArrowIcon from '../../../Assets/icon/dropdownArrow.png'

type Props = {
    dropdownList: {value: string, label: string}[],
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    name: string,
    width: string,
    state: string,
}

const Dropdown = ({dropdownList, handleChange,state, name, width}: Props) => {
    const [open, setOpen] = useState(false)
    const [maxLabelWidth, setMaxLabelWidth] = useState<number>(0);

    const handleRadioChange = (e: any) => {
      setOpen(false);
      handleChange(e);
    };

  
  return (
    <div className='dropdown' >
        <div className='dropdown-display' onClick={() => setOpen(!open)} style={{ width: width }}>
{state === ''? <span>{name}</span> : <span>{state}</span>}<span><img src={ArrowIcon} className={open ? 'rotated-arrow' : ''} /></span>
        </div>
        {open? 
   <div className='options'>
   {dropdownList.map((option) => (
     <div key={option.value} className='option'>
       <input
         type="radio"
         id={option.value}
         name="gender"
         value={option.value}
         checked={state === option.value}
         onChange={handleRadioChange}
       />
       <label htmlFor={option.value}>{option.label}</label>
     </div>
   ))}

  
 </div>: null}

   
  </div>
  )
}

export default Dropdown