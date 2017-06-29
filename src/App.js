import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Layout } from 'antd';
import './App.css';
import '../node_modules/antd/dist/antd.css';
import Routes from './Routes';
import { withRouter, Link } from 'react-router-dom';
import { CognitoUserPool, } from 'amazon-cognito-identity-js';
import config from './config.js';

// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
// const { Header, Footer, Sider, Content } = Layout;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userToken: null,
            isLoadingUserToken: true,
            current: 'home',
        };
    }

    async componentDidMount() {
      const currentUser = this.getCurrentUser();

      if (currentUser === null) {
        this.setState({isLoadingUserToken: false});
        return;
      }

      try {
        const userToken = await this.getUserToken(currentUser);
        this.updateUserToken(userToken);
      }
      catch(e) {
        alert(e);
      }

      this.setState({isLoadingUserToken: false});
    }

    updateUserToken = (userToken) => {
        this.setState({
            userToken: userToken
        });
    }

    handleClick = (e) => {

        this.setState({
            current: e.key,

        });
        this.props.history.push(e.to);
    }

    handleLogout = (event) => {
        const currentUser = this.getCurrentUser();

        if (currentUser !== null) {
          currentUser.signOut();
        }

        this.updateUserToken(null);
        this.props.history.push('/login');
    }

    getCurrentUser() {
      const userPool = new CognitoUserPool({
        UserPoolId: config.cognito.USER_POOL_ID,
        ClientId: config.cognito.APP_CLIENT_ID
      });
      return userPool.getCurrentUser();
    }

    getUserToken(currentUser) {
      return new Promise((resolve, reject) => {
        currentUser.getSession(function(err, session) {
          if (err) {
              reject(err);
              return;
          }
          resolve(session.getIdToken().getJwtToken());
        });
      });
    }

    //  <a href="/login" target="_blank" rel="noopener noreferrer">Log in</a>
    //<a href="/register" target="_blank" rel="noopener noreferrer">Log in</a>
    render() {
            const childProps = {
                userToken: this.state.userToken,
                updateUserToken: this.updateUserToken,
            };
            return ! this.state.isLoadingUserToken && (
              <div>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal">
                    <Menu.Item key="home">
                      <Link to="/">Home</Link>
                    </Menu.Item>
              { this.state.userToken

          ? <Menu.Item key="logout">
                <p onClick={this.handleLogout} >Log out</p>

            </Menu.Item>
          :[ <Menu.Item key="login">
                <Link to="/login">Log in</Link>

             </Menu.Item>,
              <Menu.Item key="register">
                  <Link to="/register">Register</Link>
              </Menu.Item> ] }
              </Menu>
        <Routes childProps={childProps} />

      </div>
    );
  }
}



export default withRouter(App);
