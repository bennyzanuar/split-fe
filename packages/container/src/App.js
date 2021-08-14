import React, { useState, lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Progress from './components/Progress';
import Header from './components/Header';
import {
	StylesProvider,
	createGenerateClassName,
} from '@material-ui/core/styles';

const MarketingLazzy = lazy(() => import('./components/MarketingApp'));
const AuthLazzy = lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({
	productionPrefix: 'co',
});

export default () => {
	const [isSignedIn, setIsSignedIn] = useState(false);

	return (
		<BrowserRouter>
			<StylesProvider generateClassName={generateClassName}>
				<div>
					<Header
						onSignOut={() => setIsSignedIn(false)}
						isSignedIn={isSignedIn}
					/>
					<Suspense fallback={<Progress />}>
						<Switch>
							<Route path='/auth'>
								<AuthLazzy onSignIn={() => setIsSignedIn(true)} />
							</Route>
							<Route path='/' component={MarketingLazzy} />
						</Switch>
					</Suspense>
				</div>
			</StylesProvider>
		</BrowserRouter>
	);
};
