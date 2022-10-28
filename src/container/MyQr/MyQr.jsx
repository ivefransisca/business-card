import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import './MyQr.scss';
import Loading from "../../component/Loading/Loading";

const MyQr = () =>{

	const [myQr, setMyQr] = useState('');
	const [showData, setShowData] = useState(false);
	let { id } = useParams();

	useEffect(() => {
		const getQr = async () => {
			await axios.get(`http://34.128.87.8:82/qrcode/profile/${id}`)
			.then(res => {
				setMyQr(res.data.data.qrcode_image);
				setShowData(true);
			})
		};
		getQr();
	}, [id]);

	return(
		<>
			{
				showData? <div className="qr-wrapper">
					<h2>My QR</h2>
					<img src={myQr} alt="QR User" />		
				</div>:
				<Loading/>
			}
		</>
	)
}

export default MyQr;