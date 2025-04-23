import React, { useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios/axiosClient";

type Props = {
    onClose: () => void;
};

const Reserve: React.FC<Props> = ({ onClose }) => {
    const { apartment } = useParams<{ apartment: string }>();
    const [includeDates, setIncludeDates] = useState<boolean>(false);
    const [fullName, setFullName] = useState<string>();
    const [fromEmail, setFromEmail] = useState<string>();
    const [messageContent, setMessageContent] = useState<string>();
    const [persons, setPersons] = useState<string>("");
    const [fromDate, setFromDate] = useState<string>("");
    const [toDate, setToDate] = useState<string>("");


    const sendEmail = async(e:any) => {
        e.preventDefault();

        let finalMessage = "";

        if (includeDates && fromDate && toDate) {
            finalMessage += `Dates of stay: from ${fromDate} to ${toDate}\n`;
        }
    
        if (persons) {
            finalMessage += `Number of persons: ${persons}\n`;
        }
    
        if (messageContent) {
            finalMessage += `\nMessage:\n${messageContent}`;
        }
        console.log('finalMessage', finalMessage)
        try {
            const response = await axiosClient.post('mail/send', {
                fromName: fullName,
                fromEmail: fromEmail,
                emailSubject: apartment,
                messageContent: messageContent
            })

            console.log('response', response);
        } catch (error) {
            console.error(error);
        }

        onClose();
    }

    return (
        <div className="reserve-backdrop" onClick={onClose}>
            <div className="reserve" onClick={(e) => e.stopPropagation()}>
                <div className="reserve-top">
                    <h1>{apartment}</h1>
                    <FontAwesomeIcon icon={faClose} onClick={onClose} />
                </div>
                <form className="reserve-form" onSubmit={sendEmail}>
                    <div className="form-inputs">
                        <input type="text" placeholder="Enter your full name" value={fullName} onChange={(e)=>setFullName(e.target.value)}/>
                        <input type="text" placeholder="Enter your email" value={fromEmail} onChange={(e)=>setFromEmail(e.target.value)}/>
                        <input type="text" placeholder="Persons" value={persons} onChange={(e)=>setPersons(e.target.value)}/>
                        <textarea placeholder="Send a message to the owner" value={messageContent} onChange={(e)=>setMessageContent(e.target.value)}/>
                        <button type="submit" className="button-submit">Send Email</button>
                    </div>
                    <div className="form-calendar">
                        <div className="form-calendar-input">
                            <label>From:</label>
                            <input type="date" disabled={!includeDates} onChange={(e) => setFromDate(e.target.value)}                            />
                        </div>
                        <div className="form-calendar-input">
                            <label>To:</label>
                            <input type="date" disabled={!includeDates} onChange={(e) => setToDate(e.target.value)}/>
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
                        <button type="submit" className="button-submit-m">Send Email</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Reserve;
