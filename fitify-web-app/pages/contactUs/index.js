import ContactForm from "@/components/contactUs/contactForm";
import { useState } from "react";

const ContactUs = () => {
    const [showForm, setShowForm] = useState(false);
    const [sent, setSent] = useState(false);

    function toggleForm(value, success){
        setShowForm(value);
        if(success){
            messageSent();
        }
    }

    function messageSent(){
        setSent(true);
        setTimeout(()=> setSent(false),3000);
    }

    return(
        <>
        <div className="md:ml-16 ml-8 w-full my-12 font-open-sans">
            <h1 className="text-5xl uppercase text-gray-700 font-semibold">Contact Us</h1>
            <p className="font-bold mt-10 mb-3 text-lg">Have a question or just want to leave a comment:</p>
            <p><span className="font-semibold">Phone number:</span> +385 99 123 4567</p>
            <p><span className="font-semibold">Email:</span> fitify@gmail.com</p>
            {!showForm && <button onClick={() => toggleForm(true, false)} className="bg-fitify-purple text-white my-5 px-3 py-2">Send message</button>}
            {showForm && <ContactForm toggleForm={toggleForm}/>}
            {sent && <p className="font-semibold">Your message has been sent, we will answer as soon as possible.</p>}
            <p className="font-bold mt-12 mb-3 text-lg">Come and visit as at our shop:</p>
            <p><span className="font-semibold">Adress:</span> Splitska 10, Split</p>
            <p><span className="font-semibold">Working hours:</span> 09:00 - 21:00</p>
        </div>
        
        </>
    );
}

export default ContactUs;