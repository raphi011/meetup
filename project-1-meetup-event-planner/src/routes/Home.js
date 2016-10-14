import React, {Component} from 'react';
import EventList from '../components/EventList';
import NewEventForm from '../components/NewEventForm';
import Base from '../core/firebase';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    Base.onAuth(this.onLogin.bind(this));
  }

  onLogin(user) {
    this.setState({user});
  }

  render() {
    let content;
    if (this.state.user === null) {
      content = <h1>Please login</h1>;
    } else {
      content = (
        <section>
          <NewEventForm user={this.state.user} />
          <EventList user={this.state.user} />
        </section>
      );
    }

    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--12-col">
          {content}
        </div>
      </div>
    );
  }
}

export default Home;
