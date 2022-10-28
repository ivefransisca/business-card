import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FileSaver from "file-saver";
import axios from 'axios';
import './Profile.scss';
import logo from '../../assets/img/logo-indocyber.png';
import linkedinIcon from '../../assets/img/linkedin-icon.png';
import instagramIcon from '../../assets/img/instagram-icon.png';
import phoneIcon from '../../assets/img/phone-icon.png';
import mailIcon from '../../assets/img/mail-icon.png';
import addressIcon from '../../assets/img/address-icon.png';
import websiteIcon from '../../assets/img/website-icon.png';
import Loading from "../../component/Loading/Loading";

const Profile = () =>{
	const [showData, setShowData] = useState(false);
	const [data, setData] = useState({})
	let { id } = useParams();

	useEffect(()=>{
		const getData = async () => {
			await axios.get(`http://34.128.87.8:82/profile/${id}`)
			.then(res => {
				setData(res.data.data)
				setShowData(true)
			})
		};
		getData();
	},[id]);

	const saveVcf = ()=> {
		var file = new Blob(
			[
				`BEGIN:VCARD
VERSION:3.0
N:${data.lastname};${data.firstname};;;
FN:${data.firstname} ${data.lastname}
TITLE:${data.position};
EMAIL;type=INTERNET;type=pref:${data.email}
TEL;type=MAIN:${data.work}
TEL;type=CELL;type=VOICE;type=pref:${data.phonenumber}
ADR;type=WORK;type=pref:;;;${data.address};;;
END:VCARD
`
			],
			{ type: "text/vcard;charset=utf-8" }
		);
		FileSaver.saveAs(
			file,
			`${data.firstname}${data.lastname}.vcf`,
			true
		);
	};

	return (
		<>
			{ showData ? 
					<>
						<div className="profile-header">
							<div className="profile-header-wrapper">
								<img src={logo} alt="Logo Indocyber" />
							</div>
						</div>
						<div className="profile-headline-data">
							<div className="profile-img-wrapper">
								<img src={data.foto} alt="Profile foto" />
							</div>
							<h3 className="profile-headline-name">{data.firstname} {data.lastname}</h3>
							<p className="profile-headline-position">{data.position}</p>
						</div>
						<div className="profile-data">
							<div className="profile-data-list">
								<div className="profile-data-icon">
									<img src={phoneIcon} alt="Phone Icon" />
								</div>
								<a className="profile-data-value" href={`tel:${data.phonenumber}`}>{data.phonenumber}</a>
							</div>
							<div className="profile-data-list">
								<div className="profile-data-icon">
									<img src={mailIcon} alt="Mail Icon" />
								</div>
								<a className="profile-data-value" href={"mailto:" + data.email}>{data.email}</a>
							</div>
							<div className="profile-data-list">
								<div className="profile-data-icon">
									<img src={addressIcon} alt="Address Icon" />
								</div>
								<span className="profile-data-value">{data.address}</span>
							</div>
							<div className="profile-data-list">
								<div className="profile-data-icon">
									<img src={websiteIcon} alt="Website Icon" />
								</div>
								<a className="profile-data-value" href={data.website}>{data.website}</a>
							</div>
							<button className="profile-save-button" onClick={saveVcf}>Save Contact</button>
						</div>
						<div className="profile-footer">
							<div className="profile-footer-sosmed">
								<img src={linkedinIcon} alt="Linkedin Icon" />
								<a href={data.linkedin} className="profile-footer-value">{data.linkedin}</a>
							</div>
							<div className="profile-footer-sosmed">
								<img src={instagramIcon} alt="Instagram Icon" />
								<a href={data.instagram} className="profile-footer-value">{data.instagram}</a>
							</div>
						</div>
					</>
				: <Loading/>
			}

		</>
	);
}

export default Profile;
