import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { deleteComment } from '../../actions/post'
import Moment from 'react-moment'

const CommentItem = ( {postId,
    comment: { _id, text, name, avatar, user, date},
    deleteComment, auth})=>{
    const deleteCommentHandler = ()=>{
        console.log('delete is clicked')
        console.log(postId)
        console.log(_id)
        deleteComment(postId, _id)
    }

    return(
        <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img
              className="round-img"
              src={avatar}
              alt={name}
            />
            <h4>{name}</h4>
            </Link>
        </div>
        <div>
            {_id}
          <p className="my-1">
           {text}
          </p>
           <p className="post-date">
              Posted on <Moment format="YYYY/MM/DD"> {date} </Moment>
          </p>
          {!auth.loading && user === auth.user._id && 
          (<button onClick={deleteCommentHandler} type="button" className="btn btn-danger">
              <i className="fas fa-times"></i>
          </button>)}
        </div>
      </div>
    )
}

CommentItem.propTypes={
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired

}

const mapStateToProps = state =>({
    auth: state.auth
})
export default connect(mapStateToProps, {deleteComment})(CommentItem)