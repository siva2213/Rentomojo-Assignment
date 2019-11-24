import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { List, Button, Icon } from "antd";
import postDetails from "../actions/postDetailsActions";

class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComments: false,
      postId: {
        id: props.match.params.id
      }
    };
  }
  componentDidMount() {
    this.props.getPostDetails(this.state.postId);
  }
  onComments = () => {
    this.props.getComments(this.state.postId);
    this.setState({
      isComments: true
    });
  };
  onHideComments = () => {
    this.setState({
      isComments: false
    });
  };
  onDeletePost = () => {
    this.props.deletePost(this.state.postId).then(resp => {
      if (resp) {
        this.props.history.push(`/post/${this.props.postDetails.userId}`);
      }
    });
  };
  render() {
    return (
      <div className="card">
        <div className="card-header">
          <div className="postDetails-container">
            <div className="postName">{this.props.postDetails.title}</div>
            <div className="deletePost">
              <Button onClick={this.onDeletePost}><Icon type="delete" />Delete</Button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="postBody">{this.props.postDetails.body}</div>
          <hr/>
          <div className="commnets-container">
            <div>
              <Button onClick={this.onComments} type="link">
                Comments
              </Button>
            </div>
            <div>
              <Button onClick={this.onHideComments}>Hide Comments</Button>
            </div>
          </div>
          {this.state.isComments ? (
            <div className="comments-section">
              <List
                itemLayout="vertical"
                size="small"
                dataSource={this.props.comments}
                renderItem={item => (
                  <List.Item key={item.id}>
                    <List.Item.Meta title={<span style={{color: "grey"}}>{item.body}</span>} />
                  </List.Item>
                )}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    postDetails: store.reducer.postDetails,
    comments: store.reducer.comments
  };
};
const mapActionsToProps = {
  getPostDetails: postDetails.getPostDetails,
  getComments: postDetails.getComments,
  deletePost: postDetails.deletePost
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(PostDetails));
