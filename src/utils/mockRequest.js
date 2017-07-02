import server from './mockServer';
import { withRouter } from 'react-router-dom';

var mockRequest = {
    post(endpoint, data, callback) {
        setTimeout(() => {
            switch (endpoint) {
                case '/':
                    server.getOrders(data.userToken, callback);
                    break;
                case '/delete':
                    server.deleteOrders(data.orderID, callback);
                    break;
                case '/set':
                    server.setStatus(data.orderID, callback);
                    break;
                default:
                    break;
            }
            }, (Math.random() * 2000) + 100);
    }


}


export default withRouter(mockRequest);
