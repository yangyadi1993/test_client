import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  PageHeader,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import './Home.css';
import mockRequest from '../utils/mockRequest';
let localStorage = global.window.localStorage;

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
          isLoading: false,
          orders: [],
        };
      }

    async componentDidMount() {
      if (this.props.userToken === null) {
        return;
      }

      this.setState({ isLoading: true });

      try {
        const results = await this.orders();
        this.setState({ orders: results });
      }
      catch(e) {
        alert(e);
      }

      this.setState({ isLoading: false });
    }

    orders() {

        return JSON.parse(localStorage.orders);

      //   mockRequest.post('/', this.props.userToken, (success, err) => {
      //       if (success === true) {
      //           this.state.
      //       }
      //   });
      //   console.log(localStorage.orders + "orderlistoutside");
      //   return this.state.orders;
      // // return invokeApig({ path: '/orders' }, this.props.userToken);
    }

      renderOrdersList(orders) {
          return orders.map((order, i) => (
            <ListGroupItem
                    key={order.orderID}
                    href={`/orders/${order.orderID}`}
                    onClick={this.handleOrderClick}
                 >
                {order.orderID + "\t"  + order.userID + "\t" + order.product + "\t" + order.date}

                  </ListGroupItem> )

          );
        }

        handleOrderClick = (event) => {
          event.preventDefault();
          this.props.history.push(event.currentTarget.getAttribute('href'));
        }

      renderLander() {
        return (
          <div className="lander">
              <h1>Wirelessbro Order System</h1>
              <p>A order management system.</p>
          </div>
        );
      }

      renderOrders() {
        return (
          <div className="orders">
            <PageHeader>Orders</PageHeader>
            <ListGroup>
              { ! this.state.isLoading
                && this.renderOrdersList(this.state.orders) }
            </ListGroup>
          </div>
        );
      }

  render() {
    return (
      <div className="Home">
        { this.props.userToken === null
          ? this.renderLander()
          : this.renderOrders() }
      </div>
    );
  }
}

export default withRouter(Home);