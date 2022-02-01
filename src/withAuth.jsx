import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { URL } from './utilities/Constants';


function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    componentDidMount() {
      fetch(URL+'checkToken',{
        method: 'POST',
            body: JSON.stringify({
              token:localStorage.getItem('token')
            }),
            headers: {
              'Content-Type': 'application/json'
            } 
      })
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
          Navigate('/')
        });
    }


    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return null;
      }
      return <ComponentToProtect/>;
    }
  }
}

export default withAuth