import { createContext, useState } from 'react';

const AuthContext = createContext({
	state: {
		isAuthed: false,
		user: [],
	},
	actions:{
		setIsAuthed: () => {},
		setUser: () => {},
	},
});

export const AuthProvider = ({ children }) => {
	/*상태 목록*/
	const [user, setUser] = useState();
	const [isAuthed, setIsAuthed] = useState(false);
	
	const value = {
		authState: { user, isAuthed },
		authActions: { setUser, setIsAuthed },
	};
	
	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};

export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;