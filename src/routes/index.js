import React, { Component } from 'react';
import { HashRouter,Route, Switch } from 'react-router-dom';
import App from '../App';

class MRoute extends Component {
	render() {
		return (
			<HashRouter >
				<Switch>
					<Route exact path="/" component={App}/>
				 </Switch>
			</HashRouter>
		);
	}
}
export default MRoute;