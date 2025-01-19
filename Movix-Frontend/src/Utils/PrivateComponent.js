
import { Route, Navigate } from 'react-router-dom';

const PrivateComponent = ({ children, loggedIn, }) => {
	return loggedIn ? children : <Navigate to="/trending" />;
};

export default PrivateComponent;
