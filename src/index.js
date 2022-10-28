import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyQr from './container/MyQr/MyQr';
import HelloPage from './container/HelloPage/HelloPage';
import Profile from './container/Profile/Profile';
import reportWebVitals from './reportWebVitals';
import './index.css';

const router = createBrowserRouter([
	{
		path: "/",
		element: <HelloPage />,
	},
	{
		path: "/:id",
		element: <Profile />,
	},
	{
		path: "/qr/:id",
		element: <MyQr />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<div className='container'>
			<RouterProvider router={router} />
		</div>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
