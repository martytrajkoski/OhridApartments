import React, { useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";

type Props = {
    onClose: () => void;
};

const Reserve: React.FC<Props> = ({ onClose }) => {
    const { apartment } = useParams<{ apartment: string }>();
    const [includeDates, setIncludeDates] = useState(false);

    return (
        <div className="reserve-backdrop" onClick={onClose}>
            <div className="reserve" onClick={(e) => e.stopPropagation()}>
                <div className="reserve-top">
                    <h1>{apartment}</h1>
                    <FontAwesomeIcon icon={faClose} onClick={onClose} />
                </div>
                <form className="reserve-form">
                    <div className="form-inputs">
                        <input type="text" placeholder="Enter your full name" />
                        <input type="text" placeholder="Enter your email" />
                        <input type="text" placeholder="Persons" />
                        <textarea placeholder="Send a message to the owner" />
                        <button type="submit">Send Email</button>
                    </div>
                    <div className="form-calendar">
                        <div className="form-calendar-input">
                            <label>From:</label>
                            <input type="date" disabled={!includeDates} />
                        </div>
                        <div className="form-calendar-input">
                            <label>To:</label>
                            <input type="date" disabled={!includeDates} />
                        </div>
                        <div className="calendar-button">
                            <input
                                type="checkbox"
                                id="dateToggle"
                                checked={includeDates}
                                onChange={() => setIncludeDates(!includeDates)}
                            />
                            <label htmlFor="dateToggle">Indicate the dates of your stay.</label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Reserve;
