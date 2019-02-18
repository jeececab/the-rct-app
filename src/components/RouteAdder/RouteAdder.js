import React, { Component } from 'react';
import classes from './RouteAdder.module.css';
import Button from '../UI/Button/Button';

class RouteAdder extends Component {
  state = {
    routeName: this.props.data.routeName,
    routeGrade: this.props.data.routeGrade,
    routeStatus: this.props.data.routeStatus,
    routeNotes: this.props.data.routeNotes
  };

  onChange = () => {};

  deleteRouteHandler = event => {
    event.preventDefault();
    console.log(event.target);
  };

  render() {
    return (
      <div className={classes.RouteAdder} id={this.props.id}>
        <form>
          <div className={classes.Inputs}>
            <input
              value={this.state.routeName}
              onChange={this.onChange}
              type="text"
              className={classes.Route_name}
              name="route_name"
              placeholder="Route Name"
            />
            <input
              value={this.state.routeGrade}
              onChange={this.onChange}
              type="text"
              className={classes.Route_grade}
              name="route_grade"
              placeholder="Grade"
            />
            <select
              value={this.props.data.routeStatus}
              onChange={this.onChange}
              className={classes.Route_status}
              name="route_status"
            >
              <option value="Not tried yet">Not tried yet</option>
              <option value="Onsight">Onsight</option>
              <option value="Flash">Flash</option>
              <option value="Redpoint">Redpoint</option>
              <option value="Not sent yet">Not sent yet</option>
            </select>
            <textarea
              value={this.state.routeNotes}
              onChange={this.onChange}
              className={classes.Route_notes}
              name="route_notes"
              placeholder="Notes"
            />
          </div>
          <div>
            <Button btnType="Link-danger" clicked={this.deleteRouteHandler}>
              Delete route
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default RouteAdder;
