import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const NotFound = (props: Props) => {
  return (
    <div className='details-container no-scroll'>
    <div className="background-img">
		<div className="space"></div>
			<div className="wrapper">
				<div className="img-wrapper">
					<span>44</span>
				</div>
				<p>The contact you are trying to search has been <br/> moved to another universe.</p>
                <Link to='/contact'>
				<button type="button">Search Again</button>
                </Link>
			</div>
		</div>
        </div>
  )
}

export default NotFound