import React, { useEffect, useState, useRef } from 'react'
import ArrowIcon from '../../../Assets/icon/DropdownArrow.png'

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
    const dropdownRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
    
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setOpen(false);
        }
      };
  
      document.addEventListener('click', handleClickOutside);
  
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [dropdownList]);

    const handleRadioChange = (e: any) => {
      setOpen(false);
      handleChange(e);
    };

  
  return (
    <div className='dropdown' ref={dropdownRef}>
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