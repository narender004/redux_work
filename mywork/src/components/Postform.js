import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost ,fetchPostsbyId,updateposts,inputtextval} from '../actions/postActions';

class PostForm extends Component {
  constructor(props) {
    console.log('props',props);
    super(props);
    // this.state = {
    //   title: ''
    // };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
   
    console.log('value',e.target.value);
    const value = e.target.value;
    this.props.inputtextval(value);
   //this.setState({ [e.target.name]: e.target.value });
  }

  // componentDidUpdate() {
  //   const newProps = this.props
  //   console.log('newProps',newProps);
  //   console.log('newProps title' ,newProps.newPost.title);
  //  // this.setState({ title: newProps.newPost.title})
    
  // }




// componentWillReceiveProps(nextProps) {
// console.log('ddddddddddddddddddddddd',nextProps.newPost.title);
//   if(nextProps.newPost.title !== '') {
//     console.log('welcome new value');
//     this.setState({title:nextProps.newPost.title })
//   }
// }

  onSubmit(e) {
    e.preventDefault();
    let post;
    if(this.props.newPost._id) {
      post = {
        title: this.props.newPost.title
      };
      console.log('update post',post);
     this.props.updateposts(this.props.newPost._id,post);
  
    } else {
      post = {
        title: this.state.title
      };
      this.props.createPost(post);
    }
   
  }

  render() {
    return (
      <div>
        <h1>Add Post</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Title: </label>
            <br />
            <input
              type="text"
              name="title"
              onChange={this.onChange}
              value={this.props.item}
            />
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired
};

const mapStateToProps = state => (
  console.log('state',state),
  {
  newPost: state.posts.item
});

export default connect(mapStateToProps, { createPost,fetchPostsbyId,updateposts,inputtextval})(PostForm);