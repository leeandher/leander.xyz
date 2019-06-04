// React dependencies
import React, { Component } from "react";
import Link from "./Link";

// GraphQL dependencies
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { LINKS_PER_PAGE } from "../constants";

// GQL Calls
export const FEED_QUERY = gql`
  query FeedQuery($first: Int, $skip: Int, $orderBy: LinkOrderByInput) {
    feed(first: $first, skip: $skip, orderBy: $orderBy) {
      count
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;

const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      id
      link {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

class LinkList extends Component {
  state = {
    isNewPage: this.props.location.pathname.includes("new"),
    page: parseInt(this.props.match.params.page) || 1,
    skip: 0,
    first: 100,
    orderBy: null
  };

  componentDidMount() {
    this._generatePage(this.state.page);
  }

  // Auto update the your own votes live
  _updateCacheAfterVote = (store, createVote, linkId) => {
    // Read the cached data for FEED_QUERY from the store
    const { first, skip, orderBy } = this.state;
    const data = store.readQuery({
      query: FEED_QUERY,
      variables: {
        first,
        skip,
        orderBy
      }
    });

    // Get the link the user just voted on, and modify the votes on them
    const votedLink = data.feed.links.find(link => link.id === linkId);
    votedLink.votes = createVote.link.votes;

    // Write the new vote quantity back to the store as FEED_QUERY
    store.writeQuery({ query: FEED_QUERY, data });
  };

  // Audo update link addition live
  _subscribeToNewLinks = async subscribeToMore => {
    subscribeToMore({
      document: NEW_LINKS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const newLink = subscriptionData.data.newLink;
        // Modify the return data to add the newLink
        return Object.assign({}, prev, {
          feed: {
            links: [...prev.feed.links, newLink],
            count: prev.feed.links.length + 1,
            __typename: prev.feed.__typename
          }
        });
      }
    });
  };

  // Auto update other people's votes live
  _subscribeToNewVotes = subscribeToMore => {
    subscribeToMore({
      document: NEW_VOTES_SUBSCRIPTION
    });
  };

  // Get the links to be rendered as a list
  _getLinksToRender = data => {
    // Normal page
    if (this.props.location.pathname.includes("new")) {
      return data.feed.links;
    }
    // Top page
    const rankedLinks = data.feed.links.slice();
    rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length);
    return rankedLinks;
  };

  // Go to the previous page
  _previousPage = () => {
    if (this.state.page > 1) {
      const previousPage = this.state.page - 1;
      this._generatePage(previousPage);
    }
  };

  // Go to the next page
  _nextPage = data => {
    if (this.state.page <= data.feed.count / LINKS_PER_PAGE) {
      const nextPage = this.state.page + 1;
      this._generatePage(nextPage);
    }
  };

  _generatePage = page => {
    this.props.history.push(`/new/${page}`);
    this.setState({
      page,
      skip: this.state.isNewPage ? (page - 1) * LINKS_PER_PAGE : 0,
      first: this.state.isNewPage ? LINKS_PER_PAGE : 100,
      orderBy: this.state.isNewPage ? "createdAt_DESC" : null
    });
  };

  render() {
    const { isNewPage, page, skip, first, orderBy } = this.state;
    return (
      <Query query={FEED_QUERY} variables={{ skip, first, orderBy }}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) {
            return (
              <div className="indicator">
                <span role="img" aria-label="flexing">
                  💪
                </span>
                Fetching...
                <span role="img" aria-label="flexing">
                  💪
                </span>
              </div>
            );
          }
          if (error) {
            console.error(error);
            return (
              <div className="indicator">
                <span role="img" aria-label="nope">
                  ❌
                </span>
                An error has occured!
                <span role="img" aria-label="nope">
                  ❌
                </span>
              </div>
            );
          }
          if (data.feed.links.length === 0) {
            return (
              <div className="indicator">
                <span role="img" aria-label="nope">
                  😵
                </span>
                Nothing! Try lowering that page number a bit eh?
                <span role="img" aria-label="nope">
                  😵
                </span>
              </div>
            );
          }

          this._subscribeToNewLinks(subscribeToMore);
          this._subscribeToNewVotes(subscribeToMore);

          const linksToRender = this._getLinksToRender(data);
          const pageIndex = page ? (page - 1) * LINKS_PER_PAGE : 0;

          return (
            <>
              {linksToRender.map((link, i) => (
                <Link
                  key={link.id}
                  link={link}
                  index={i + pageIndex}
                  updateStoreAfterVote={this._updateCacheAfterVote}
                />
              ))}
              {isNewPage && (
                <div className="flex ml4 mv3 gray pagination">
                  <div className="pointer mr2" onClick={this._previousPage}>
                    previous
                  </div>
                  <div className="pointer" onClick={() => this._nextPage(data)}>
                    next
                  </div>
                </div>
              )}
            </>
          );
        }}
      </Query>
    );
  }
}

export default LinkList;
