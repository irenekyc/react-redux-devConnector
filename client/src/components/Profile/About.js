import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const About = ({profile: {bio, skills, user:{name}}})=>{

    return (
        <Fragment>

        
        {bio && (<Fragment> 
            <h2 className="text-primary"> {name.trim().split(" ")[0]} </h2>
             <p>
                {bio}
            </p>
            <div className="line"></div></Fragment>)}
        {skills.length>0 &&
            <Fragment>
                <h2 className="text-primary">Skill Set</h2>
                <div className="skills">
            { skills.map((s, index)=>{
                return <div key={index} className="p-1"><i className="fa fa-check"></i>{s}</div>
            }) }
            </div>

            </Fragment>
        }      
         
          </Fragment>
    )

}
About.propTypes={
    profile: PropTypes.object.isRequired
}


export default About