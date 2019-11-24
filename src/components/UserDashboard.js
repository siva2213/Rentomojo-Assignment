import React, { Component } from "react";
import { connect } from "react-redux";
import userDetails from "../actions/userDetailActions";
import "antd/dist/antd.css";
import { Table } from "antd";
import { withRouter } from "react-router-dom";

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Company",
        dataIndex: `company.name`,
        key: "address"
      },
      {
        title: "Blog Post",
        key: "action",
        render: params => {
          return (
            <span>
              <a href={params.id}
                onClick={val => {
                  this.props.setUserName({
                    name: `${params.name} - ${params.company.name}`
                  });
                  this.props.history.push(`/userPost/${params.id}`);
                }}
              >
                {" "}
                Blog Post
              </a>
            </span>
          );
        }
      }
    ];
  }
  componentDidMount() {
    this.props.getUserDetails();
  }

  render() {
    return (
      <div>
        <div className="card">
          <Table columns={this.columns} dataSource={this.props.userDetails} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    userDetails: store.reducer.userDetails
  };
};
const mapActionsToProps = {
  getUserDetails: userDetails.getUserDetails,
  setUserName: userDetails.setUserName
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(UserDashboard));
