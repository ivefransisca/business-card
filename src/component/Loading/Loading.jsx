import React from "react";
import './Loading.scss';

const Loading = () =>{
	return(
		<div className="loading-wrapper">
			<div className="loading-spinner">
				<div></div>
			</div>
			Loading...
		</div>
	)
};

export default Loading;