import { useState } from "react";

const ContactForm = ({toggleForm}) => {

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function sendMessage(e){
        e.preventDefault();
        if(name && username && email && message){
            toggleForm(false, true);
        }
        else{
            setErrorMessage("Please fill out all the fields so your message can be sent.");
        }
    }

    function handleChange(e){
        const value = e.target.value;
        switch(e.target.name){
            case "name":
                setName(value);
                break;
            case "username":
                setUsername(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "message":
                setMessage(value);
                break;
            default:
                console.log("Error with form");
        }
    }

    return(
        <form className=" w-5/6 border-2 border-black my-5 flex flex-col" >
                <div className=" w-full flex justify-between">
                    <h1 className="font-bold sm:text-xl text-lg ml-7 my-3">Fill out form:</h1>
                    <button onClick={() => toggleForm(false)} className="font-bold text-3xl mr-4 p-4">X</button>
                </div>
                <div className="px-7 flex flex-col sm:text-base text-sm">
                <label htmlFor="name">Full name:</label>
                <input type="text" name="name" id="name" className="border-2 mb-5 border-fitify-purple form-field md:w-2/5 sm:w-3/6 w-full" value={name} onChange={(e) => handleChange(e)} required/>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="username" className="border-2 mb-5 border-fitify-purple form-field md:w-2/5 sm:w-3/6 w-ful" value={username} onChange={(e) => handleChange(e)} required/>
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" id="email" className="border-2 mb-5 border-fitify-purple form-field md:w-2/5 sm:w-3/6 w-ful" value={email} onChange={(e) => handleChange(e)} required/>
                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" rows={6}  className="border-2 mb-5 border-fitify-purple form-field " value={message} onChange={(e) => handleChange(e)} required></textarea>
                {errorMessage && <p className="mb-3 text-center font-bold">{errorMessage}</p>}
                <button onClick={(e) => sendMessage(e)} className=" bg-fitify-purple text-white w-36 py-2 place-self-end mb-7">Send</button>
                </div>
            </form>
    );
}

export default ContactForm;