import React, { Component } from "react";
import PropTypes from 'prop-types';
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import './board-admin.component.css';



import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export class TutoresListado extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
    };

    
  }

  componentDidMount = async () =>  {
    await UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
        
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
        
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  

  render() {
    
    return (
      <div></div>
    );
  }
}

TutoresListado.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (TutoresListado);