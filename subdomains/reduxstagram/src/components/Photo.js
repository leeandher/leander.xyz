import React from 'react'
import { Link } from 'react-router'
import CSSTransitionGroup from 'react-addons-css-transition-group'

const Photo = p => (
  <figure className="grid-figure">
    <div className="grid-photo-wrap">
      <Link to={`/view/${p.post.code}`}>
        <img
          src={p.post.display_src}
          alt={p.post.caption}
          className="grid-photo"
        />
      </Link>
      <CSSTransitionGroup
        transitionName="like"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        <span key={p.post.likes} className="likes-heart">
          {p.post.likes}
        </span>
      </CSSTransitionGroup>
    </div>
    <figcaption>
      <p>{p.post.caption}</p>
      <div className="control-buttons">
        <button onClick={() => p.increment(p.index)} className="likes">
          ❤ {p.post.likes}
        </button>
        <Link className="button" to={`/view/${p.post.code}`}>
          <span className="comment-count">
            <span className="speech-bubble" />
            {p.comments[p.post.code]
              ? ` ${p.comments[p.post.code].length}`
              : ` ${0}`}
          </span>
        </Link>
      </div>
    </figcaption>
  </figure>
)

export default Photo
