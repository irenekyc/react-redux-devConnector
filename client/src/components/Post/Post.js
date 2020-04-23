import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost } from '../../actions/post'
import Spinner from '../layout/spinner'
import PostItem from '../Posts/PostItem'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post =({ post:{post, loading}, getPost, match })=>{
    useEffect(()=>{
        getPost(match.params.id)
    }, [getPost])

    return loading || post === null ? <Spinner /> : <Fragment>
        <Link to="/posts" className="btn"> Back to Posts</Link>
        <PostItem post={post} />
        <CommentForm postId={post._id} />
        <div className="comments">
            {post.comments.map((comment=>{
               return  <CommentItem key={comment._id} comment={comment} postId={post._id} />
            }))}
        </div>
    </Fragment>
}

Post.propTypes ={
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    post: state.post
})
export default connect(mapStateToProps, { getPost})(Post)