import React, { useEffect, useState } from "react";
import axiosClient from "../../axios/axiosClient";
import { useParams } from "react-router-dom";
import { ApartmentType } from "../../types/types";
import parser from "html-react-parser";
import Map from "../../components/Map/Map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../components/Loading/Loading";
import { Helmet } from 'react-helmet-async';

const About: React.FC = () => {
    const [apartmentData, setApartmentData] = useState<ApartmentType>();
    const { apartment } = useParams<string>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchApartment();
    }, [])

    const fetchApartment = async () => {
        setLoading(true);

        try {
            const response = await axiosClient.post('apartment', {
                name: apartment
            })

            if (response.status === 200) {
                setApartmentData(response.data.apartment);
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <Helmet>
                <title>{apartment} | Ohrid Apartments</title>
                <meta name="description" content={apartmentData?.description} />
                <meta name="keywords" content="Ohrid apartments, lake view apartments Ohrid, White Lake apartment, Boulevard Ohrid, Casa Norvegia Ohrid, Ohrid accommodation, Ohrid rentals, vacation rentals Ohrid, apartments near Old Town Ohrid, Ohrid lakefront, holiday homes Ohrid, Ohrid stay, cheap apartments Ohrid, luxury apartments Ohrid, family friendly Ohrid apartments, apartment with balcony Ohrid, apartment with parking Ohrid, Ohrid lodging, Ohrid booking, North Macedonia travel, travel Ohrid, Ohrid rooms, places to stay in Ohrid, Ohrid hotels, guesthouse Ohrid, apartment by lake Ohrid, The ohrid apartments, white lake, Boulevard, Casa Norvegia, Vili Ohrid, Apartmani Ohrid" />
                <meta name="robots" content="index, follow" />

                <meta property="og:title" content={`${apartment} | Ohrid Apartments`} />
                <meta property="og:description" content={apartmentData?.description}/>
                <meta property="og:image" content="https://www.theohridapartments.com/logo.png" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${apartment} | Ohrid Apartments`} />
                <meta name="twitter:description" content={apartmentData?.description} />
                <meta name="twitter:image" content="https://www.theohridapartments.com/logo.png" />

                <link rel="canonical" href="https://www.theohridapartments.com" />
            </Helmet>
            {loading && <Loading />}
            <div className="about">
                <div className="about-content">
                    <h1>{apartmentData?.name}</h1>
                    <div>
                        {parser(apartmentData?.description ?? "")}
                    </div>
                    <div>
                        {apartmentData?.check_in && (
                            <p>Check In: From {JSON.parse(apartmentData.check_in)[0]} to {JSON.parse(apartmentData.check_in)[1]}</p>
                        )}
                        {apartmentData?.check_out && (
                            <p>Check Out: From {JSON.parse(apartmentData.check_out)[0]} to {JSON.parse(apartmentData.check_out)[1]}</p>
                        )}
                    </div>
                    <div className="facilities">
                        {apartmentData?.top_facilities.map((item, index) => (
                            <div className="top-facility-card" key={index}>{item.name}</div>
                        ))}
                    </div>
                </div>
                <div className="map">
                    <Map lat={apartmentData?.location.latitude!} lng={apartmentData?.location.longitude!} zoom={15} />
                    <div className="contact">
                        {apartmentData?.email && <div><FontAwesomeIcon icon={faEnvelope} /> : {apartmentData?.email}</div>}
                        {apartmentData?.phone_number && <div className="contact-number"><FontAwesomeIcon icon={faPhone} /> / <svg className="svg-social" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                            <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path>
                        </svg> / <svg className="svg-social" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                <path fill="#fff" d="M24,5C21.361,5,13.33,5,8.89,9.054C6.246,11.688,5,15.494,5,21v3c0,5.506,1.246,9.312,3.921,11.976 c1.332,1.215,3.148,2.186,5.368,2.857L15,39.047v5.328C15,45,15.181,45,15.241,45c0.123,0,0.32-0.039,0.694-0.371 c0.09-0.089,0.75-0.803,3.96-4.399l0.324-0.363l0.485,0.031C21.779,39.965,22.888,40,24,40c2.639,0,10.67,0,15.11-4.055 C41.753,33.311,43,29.505,43,24v-3c0-5.506-1.246-9.312-3.921-11.976C34.67,5,26.639,5,24,5z"></path><path fill="#7e57c2" d="M33.451 28.854c-1.111-.936-1.624-1.219-3.158-2.14C29.654 26.331 28.68 26 28.169 26c-.349 0-.767.267-1.023.523C26.49 27.179 26.275 28 25.125 28c-1.125 0-3.09-1.145-4.5-2.625C19.145 23.965 18 22 18 20.875c0-1.15.806-1.38 1.462-2.037C19.718 18.583 20 18.165 20 17.816c0-.511-.331-1.47-.714-2.109-.921-1.535-1.203-2.048-2.14-3.158-.317-.376-.678-.548-1.056-.549-.639-.001-1.478.316-2.046.739-.854.637-1.747 1.504-1.986 2.584-.032.147-.051.295-.057.443-.046 1.125.396 2.267.873 3.234 1.123 2.279 2.609 4.485 4.226 6.455.517.63 1.08 1.216 1.663 1.782.566.582 1.152 1.145 1.782 1.663 1.97 1.617 4.176 3.103 6.455 4.226.958.472 2.086.906 3.2.874.159-.005.318-.023.477-.058 1.08-.238 1.947-1.132 2.584-1.986.423-.568.74-1.406.739-2.046C33.999 29.532 33.827 29.171 33.451 28.854zM34 24c-.552 0-1-.448-1-1v-1c0-4.962-4.038-9-9-9-.552 0-1-.448-1-1s.448-1 1-1c6.065 0 11 4.935 11 11v1C35 23.552 34.552 24 34 24zM27.858 22c-.444 0-.85-.298-.967-.748-.274-1.051-1.094-1.872-2.141-2.142-.535-.139-.856-.684-.718-1.219.138-.534.682-.855 1.219-.718 1.748.453 3.118 1.822 3.575 3.574.139.535-.181 1.08-.715 1.22C28.026 21.989 27.941 22 27.858 22z"></path><path fill="#7e57c2" d="M31,23c-0.552,0-1-0.448-1-1c0-3.188-2.494-5.818-5.678-5.986c-0.552-0.029-0.975-0.5-0.946-1.051 c0.029-0.552,0.508-0.976,1.051-0.946C28.674,14.241,32,17.748,32,22C32,22.552,31.552,23,31,23z"></path><path fill="#7e57c2" d="M24,4C19.5,4,12.488,4.414,8.216,8.316C5.196,11.323,4,15.541,4,21c0,0.452-0.002,0.956,0.002,1.5 C3.998,23.043,4,23.547,4,23.999c0,5.459,1.196,9.677,4.216,12.684c1.626,1.485,3.654,2.462,5.784,3.106v4.586 C14,45.971,15.049,46,15.241,46h0.009c0.494-0.002,0.921-0.244,1.349-0.624c0.161-0.143,2.02-2.215,4.042-4.481 C21.845,40.972,22.989,41,23.999,41c0,0,0,0,0,0s0,0,0,0c4.5,0,11.511-0.415,15.784-4.317c3.019-3.006,4.216-7.225,4.216-12.684 c0-0.452,0.002-0.956-0.002-1.5c0.004-0.544,0.002-1.047,0.002-1.5c0-5.459-1.196-9.677-4.216-12.684C35.511,4.414,28.5,4,24,4z M41,23.651l0,0.348c0,4.906-1.045,8.249-3.286,10.512C33.832,38,26.437,38,23.999,38c-0.742,0-1.946-0.001-3.367-0.1 C20.237,38.344,16,43.083,16,43.083V37.22c-2.104-0.505-4.183-1.333-5.714-2.708C8.045,32.248,7,28.905,7,23.999l0-0.348 c0-0.351-0.001-0.73,0.002-1.173C6.999,22.078,6.999,21.7,7,21.348L7,21c0-4.906,1.045-8.249,3.286-10.512 C14.167,6.999,21.563,6.999,24,6.999c2.437,0,9.832,0,13.713,3.489c2.242,2.263,3.286,5.606,3.286,10.512l0,0.348 c0,0.351,0.001,0.73-0.002,1.173C41,22.922,41,23.3,41,23.651z"></path>
                            </svg> : {apartmentData?.phone_number.map((number, index) => (<span key={index}>{number} </span>))} </div>}
                    </div>
                </div>
            </div>
        </>
    )
}
export default About;