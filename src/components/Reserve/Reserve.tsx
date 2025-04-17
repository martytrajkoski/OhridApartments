import React from "react";


const Reserve: React.FC<{onClose:()=>void}> = ({onClose}) => {
    return(
        <div className="reserve-backdrop" onClick={onClose}>
            <div className="reserve">
                <form className="reserve-form">
                    <h1>Apartment</h1>
                    <input type="full_name" placeholder="Enter your full name"/>
                    <input type="email" placeholder="Enter your email"/>
                    <textarea placeholder="Send message to owner"/>
                    <button type="submit">Send Email</button>
                </form>
            </div>
        </div>
    )
}
export default Reserve;