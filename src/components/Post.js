import React, { Component } from "react";
import userDetails from "../actions/userDetailActions";
import posts from "../actions/postActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { List } from "antd";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    let payload = {
      id: this.props.match.params.id,
      skip: 0,
      limit: 5
    };
    this.props.getPosts(payload);
    if (!this.props.userName) {
      this.props.getUserDetails()
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userDetails !== this.props.userDetails) {
      let userDetails = this.props.userDetails.filter(userObj => parseInt(this.props.match.params.id) === userObj.id)
      this.props.setUserName({
        name: `${userDetails[0].name} - ${userDetails[0].company.name}`
      });
    }
  }
  render() {
    return (
      <div className="card">
        <div className="card-header">
          <label> {this.props.userName}</label>
        </div>
        <hr/>
        <div className="card-body">
          <div className="post-container">
            <div className="post-body">
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  onChange: page => {
                    console.log(page);
                  },
                  pageSize: 5
                }}
                dataSource={this.props.posts}
                renderItem={item => (
                  <List.Item key={item.title}>
                    <List.Item.Meta
                      title={
                        <a
                          onClick={val => {
                            this.props.history.push(`/postDetails/${item.id}`);
                          }}
                          href={item.href}
                        >
                          {<span style={{fontSize: "18px", color: "#1890FF"}}>{item.title}</span>}
                        </a>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    posts: store.reducer.posts,
    userName: store.reducer.userName,
    userDetails: store.reducer.userDetails
  };
};
const mapActionsToProps = {
  getPosts: posts.getPosts,
  getUserDetails: userDetails.getUserDetails,
  setUserName: userDetails.setUserName
};

export default connect(mapStateToProps, mapActionsToProps)(withRouter(Posts));
