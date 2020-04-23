import axios from 'axios'
import {setAlert} from './alert'

import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    DELETE_ACCOUNT,
    CLEAR_PROFILE,
    GET_PROFILES,
    GET_REPOS
} from './types'

//get current user profile

export const getCurrentProfile = ()=> async dispatch =>{

    try {
        const res = await axios.get('/api/profile/me')
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    }
    catch (err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: "loading error"}
            // payload: { msg: err.response.statusText, status: err.response.status}
        })

    }

}
// GET ALL PROFILES
export const getProfiles = ()=> async dispatch =>{
    try {
        const res = await axios.get('/api/profile')
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    }
    catch (err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: "loading error"}
            // payload: { msg: err.response.statusText, status: err.response.status}
        })

    }

}

// GET PROFILE BY ID
export const getProfileById = userId => async dispatch =>{
    try {
        const res = await axios.get(`/api/profile/user/${userId}`)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    }
    catch (err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: "loading error"}
            // payload: { msg: err.response.statusText, status: err.response.status}
        })

    }

}
// GET GITHUBREPO
export const getGithubRepos = username => async dispatch =>{
    try {
        const res = await axios.get(`/api/profile/github/${username}`)
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    }
    catch (err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: "loading error"}
            // payload: { msg: err.response.statusText, status: err.response.status}
        })

    }

}

//Create / update profile

//history is the route the user visit before , it is better for redirect
export const createProfile = (formData, history, edit=false) => async dispatch =>{

    try{
        const config = {
            headers: {
                'Content-Type': 'application/JSON'
            }
        }

        const res = await axios.post('/api/profile', formData, config)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit? 'Profile Updated' : 'Profile Created'))
        if (!edit) {
            history.push('/dashboard')
        }

    }
    catch(err){
        const errors = err.response.data.errors
    
        if(errors){
            errors.forEach(e=> dispatch(setAlert(e.msg, "danger")))

        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })


    }

}

//Add Experience

export const addExperience = (formData, history) => async dispatch=>{
    try{
        const config = {
            headers: {
                'Content-Type': 'application/JSON'
            }
        }

        const res = await axios.put('/api/profile/experience', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience added', "success"))
 
        history.push('/dashboard')
        

    }
    catch(err){
        const errors = err.response.data.errors
    
        if(errors){
            errors.forEach(e=> dispatch(setAlert(e.msg, "danger")))

        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

//Add Education

export const addEducation = (formData, history) => async dispatch=>{
    try{
        const config = {
            headers: {
                'Content-Type': 'application/JSON'
            }
        }

        const res = await axios.put('/api/profile/education', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education added', "success"))
 
        history.push('/dashboard')
        

    }
    catch(err){
        const errors = err.response.data.errors
    
        if(errors){
            errors.forEach(e=> dispatch(setAlert(e.msg, "danger")))

        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

//Delete Experience 
// route: api/profile/experience/:id

export const deleteExperience = (id)=> async dispatch=>{
    try{
        const res = await axios.delete(`/api/profile/experience/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience removed', "danger"))

    }
    catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })

    }
}

//Delete Education
// route: api/profile/education/:id

export const deleteEducation = (id)=> async dispatch=>{
    try{
        const res = await axios.delete(`/api/profile/education/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education removed', "danger"))

    }
    catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })

    }
}


//Delete Account and profile
export const deleteAccount = ()=> async dispatch=>{
    if(window.confirm('Are you sure? This CAN NOT be undone')){
        try{
            const res = await axios.delete(`/api/profile`)
            dispatch({
                type: CLEAR_PROFILE,
            })
            dispatch({
                type: DELETE_ACCOUNT,
            })
            dispatch(setAlert('Account is deleted', "danger"))
    
        }
        catch(err){
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status}
            })
    
        }
    }
    
}