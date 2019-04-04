import React, { Component } from "react";

import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { FEED_QUERY } from "./LinkList";
import { LINKS_PER_PAGE } from "../constants";

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    postLink(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

class CreateLink extends Component {
  state = {
    description: "",
    url: ""
  };

  _handleUpdate = (store, { data: { postLink } }) => {
    const first = LINKS_PER_PAGE;
    const skip = 0;
    const orderBy = "createdAt_DESC";
    const data = store.readQuery({
      query: FEED_QUERY,
      variables: {
        first,
        skip,
        orderBy
      }
    });
    data.feed.links.unshift(postLink);
    store.writeQuery({
      query: FEED_QUERY,
      data,
      variables: {
        first,
        skip,
        orderBy
      }
    });
  };

  render() {
    const { description, url } = this.state;
    return (
      <>
        <h4 className="mv3">submit</h4>
        <div className="flex flex-column mt3">
          <input
            type="text"
            name="description"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            placeholder="description"
            autoComplete="off"
          />
          <input
            type="text"
            name="url"
            value={url}
            onChange={e => this.setState({ url: e.target.value })}
            placeholder="url"
            autoComplete="off"
          />
        </div>
        <div className="flex mt3">
          <Mutation
            mutation={POST_MUTATION}
            variables={{ description, url }}
            onCompleted={() => this.props.history.push("/new/1")}
            update={this._handleUpdate}
          >
            {postMutation => (
              <button className="pointer button" onClick={postMutation}>
                submit
              </button>
            )}
          </Mutation>
        </div>
      </>
    );
  }
}

export default CreateLink;
