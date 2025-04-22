import {
	ErrorBoundary,
	LocationProvider,
	Route,
	Router,
} from "preact-iso";
import routes from "./routes";

export const App = () => (
	<LocationProvider>
		<ErrorBoundary>
			<Router>
				{routes.map(props => <Route {...props} />)}
			</Router>
		</ErrorBoundary>
	</LocationProvider>
);
