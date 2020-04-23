import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExperience = ({experience: {
    company, title, from, to, current, description
}})=>{


   
    return (
       
        <Fragment>
             <h3 className="text-dark">{company}</h3>

            <p><Moment format="YYYY/MM/DD"> {from} </Moment> - {current? "Now" :
            <Moment format="YYYY/MMM/DD">{to} </Moment> }</p>
            <p><strong>Position: </strong>{title}</p>
            <p>
              <strong>Description: </strong>{description}
            </p>
        </Fragment>
    )

}
ProfileExperience.propTypes={
    experience: PropTypes.object.isRequired
}


export default ProfileExperience