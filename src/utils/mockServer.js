import { withRouter } from 'react-router-dom';
let localStorage = global.window.localStorage;
let orders;

var server = {

    init() {
        if (localStorage.orders === undefined) {
            orders = [{
                orderID: 1,
                userID: "yadiy@andrew.cmu.edu",
                product: "iPhone7",
                number: 1,
                price: 800,
                total: 800,
                date: new Date()
            },
                {
                orderID: 2,
                userID: "yadiy@andrew.cmu.edu",
                product: "iPhone7",
                number: 1,
                price: 800,
                total: 800,
                    date: new Date()
            }]
            localStorage.orders = JSON.stringify(orders);
        } else {
            orders = JSON.parse(localStorage.orders);
        }

    },
    getOrders(callback) {

        if (callback) callback(true);

    },
    deleteOrders(orderID) {

    },
    setStatus(orderID) {

    }
}

server.init();

export default withRouter(server);