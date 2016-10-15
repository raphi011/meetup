import React, { Component } from 'react';

class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: []
    };
  }

  render() {
    return (
      <div className="demo-card-event mdl-card mdl-shadow--2dp">
        <div className="mdl-card__title mdl-card--expand">
          <h4>
            {this.props.name}
          </h4>
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            Add to Calendar
          </a>
          <div className="mdl-layout-spacer"></div>
          <i className="material-icons">event</i>
        </div>
        <div className="mdl-card__menu">
          <button onClick={this.props.delete} className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
            <i className="material-icons">delete</i>
          </button>
        </div>
      </div>
    );
  }
}

Event.propTypes = {
  delete: React.PropTypes.func,
  name: React.PropTypes.string
};

export default Event;
