import { Country, City }  from 'country-state-city';
import { useEffect, useState } from 'react';

const Edit = ({setEdit, user, setUser}) => {
    const [modified, setModified] = useState(false);
    const [newUser, setNewUser] = useState(user);
    const [cities, setCities] = useState([]);
    const [error, setError] = useState("");
    const countries = Country.getAllCountries();
    console.log(user);

    useEffect(() => {
        const country=countries.find((item) => item.name===user.country);
        setCities(City.getCitiesOfCountry(country.isoCode));
    },[]);
    
    function handleChange(e){
        setModified(true);
        let field = e.target.name;
        let value = e.target.value;
        switch(field){
            case "username":
                setNewUser({...newUser, name:value});
                break;
            case "email":
                setNewUser({...newUser, email:value});
                break;
            case "name":
                setNewUser({...newUser, firstName:value});
                break;
            case "surname":
                setNewUser({...newUser, lastName:value});
                break;
            case "phone":
                setNewUser({...newUser, phone:value});
                break;
            case "address":
                setNewUser({...newUser, address:value});
                break;
            default:
                console.log("Error in switch-case.");
                break;
        }
    }

    function countryChanged(e){
        setModified(true);
        setNewUser({...newUser,country:e.target.value});
        let targetCountry = countries.find((c) => c.name===e.target.value);
        setCities(City.getCitiesOfCountry(targetCountry.isoCode));
    }

    async function saveChanges(e){
        e.preventDefault();
        if(modified){
            const res = await fetch("/api/profile/modify", {
                body: JSON.stringify({
                  ...newUser
                }),
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
              });
              if(res.status==200){
                setUser(newUser);
                setEdit(false);
              }
              else{
                setError("Sorry problem occured try again later.");
              }
        }
        else{
            setEdit(false);
        }
        
    }

    function changeCity(e){
        setNewUser({...newUser, city:e.target.value});
        setModified(true);
    }

    return(
        <div className='w-4/6 border-2 ml-10 border-black mt-5 pb-5 relative font-open-sans'>
            <button onClick={()=> setEdit(false)} className="absolute right-3 text-3xl font-bold">X</button>
            <form className='flex flex-col w-5/6 mt-4 mx-auto'>
                <h1 className='text-xl font-semibold mb-3'>Edit info:</h1>
                <label htmlFor="username" className=" pr-3.2 sm:w-full w-11/12 mx-auto ">Username:</label>
                <input type="text" id="username" name="username" value={newUser.name} onChange={(e) => handleChange(e)} className={` border-2  h-9  sm:mx-0 mx-auto  border-fitify-purple form-field  `}></input>
                <label htmlFor="email" className="pr-3.2 sm:w-full w-11/12 mx-auto mt-5">Email:</label>
                <input type="text" id="email" name="email" value={newUser.email} onChange={(e) => handleChange(e)} className={` border-2   border-fitify-purple h-9  sm:mx-0 mx-auto  form-field `}></input>
                <label htmlFor="name" className=" pr-3.2 sm:w-full w-11/12 mx-auto mt-5">First name:</label>
                <input type="text" id="name" name="name" value={newUser.firstName} onChange={(e) => handleChange(e)} className="  border-2 border-fitify-purple h-9  sm:mx-0 mx-auto  form-field  "></input>
                <label htmlFor="surname" className=" pr-3.2 sm:w-full w-11/12 mx-auto mt-5">Last name:</label>
                <input type="text" id="surname" name="surname" value = {newUser.lastName} onChange={(e) => handleChange(e)} className="  mt-0 border-2 border-fitify-purple h-9  sm:mx-0 mx-auto  form-field  "></input>
                <label htmlFor="phone" className=" pr-3.2 mt-5 sm:w-full w-11/12 mx-auto">Phone number:</label>
                <input type="text" id="phone" name="phone" value={newUser.phone} onChange={(e) => handleChange(e)} className="  border-2 border-fitify-purple h-9   sm:mx-0 mx-auto  form-field"></input>
                <label htmlFor="address" className=" pr-3.2 mt-8 sm:w-full w-11/12 mx-auto ">Address:</label>
                <input type="text" id="address" name="address" value={newUser.address} onChange={(e) => handleChange(e)} className=" border-2 border-fitify-purple h-9  sm:mx-0 mx-auto  form-field"></input>
                <div className=" w-8/12 pl-0 flex sm:flex-row flex-col  mt-5">
                <div className="flex flex-col md:w-2/4 sm:w-3/5 w-full ">
                <label htmlFor="country" id="country" className="mr-3">Country:</label>
                <select name="country" id="country-value" className=" text-center border-2 border-fitify-purple md:w-3/6 sm:w-5/6 w-full" value={newUser.country} onChange={(e) => countryChanged(e)}>
                    {countries.map((i) => (
                        <option key={i.name} value={`${i.name}`} >
                            {i.name}
                        </option>
                    ))}
                </select>
                </div>
                {newUser.country && <div className="flex flex-col md:w-2/4 sm:w-3/5 w-full" >
                <label htmlFor="city" id="city" className="mr-3">City:</label>
                    <select name="city" id="city-value" className=" text-center border-2 border-fitify-purple md:w-3/6 sm:w-5/6 w-full" value={newUser.city} onChange={(e) => changeCity(e)}>
                        {cities.map((i) => (
                            <option key={i.name} value={`${i.name}`}>
                                {i.name}
                            </option>
                        ))}
                    </select>
                </div>}
                </div>
                {error && <p className='text-left text-lg'>{error}</p>}
                <button onClick = {(e) => saveChanges(e)} className='bg-fitify-purple text-white uppercase text-lg font-bold py-2 w-52 mt-5 place-self-end hover:opacity-70 hover:cursor-pointer'>Save changes</button>
            </form>
        </div>
    );
}

export default Edit;