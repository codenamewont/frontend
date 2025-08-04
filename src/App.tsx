import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import ScrollToTop from './components/ScrollToTop';
import { useAuthStore } from './stores/authStore';

const App = () => {
	useEffect(() => {
		const token = localStorage.getItem('token');
		const login = useAuthStore.getState().login;
		const logout = useAuthStore.getState().logout;

		if (token) {
			const dummyUser = { id: '1', email: 'restored@example.com' };
			login(dummyUser, token);
		} else {
			logout();
		}
	}, []);

	return (
		<>
			<ScrollToTop />
			<Routes>
				{routes.map((r) => (
					<Route key={r.path} path={r.path} element={r.element} />
				))}
			</Routes>
		</>
	);
};

export default App;
