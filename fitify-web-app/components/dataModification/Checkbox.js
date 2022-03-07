import { useEffect, useState } from "react";

const Checkbox = ({ options, preselectedValues, setSelectedValues }) => {
  const [checkedState, setCheckedState] = useState(
    options.items.reduce((o, key) => ({ ...o, [key]: false }), {})
  );

  useEffect(() => {
    // Inicijalizacija vrijednosti koje su unaprijed selektirane
    for (let i = 0; i < preselectedValues.length; i++)
      setCheckedState((prevState) => ({
        ...prevState,
        [preselectedValues[i]]: true,
      }));
    console.log("UseEffect:", checkedState);
  }, [preselectedValues]);

  const handleOptionChange = (e) => {
    let option = e.target.value;
    let newValue = !checkedState[option];

    //Kreiranje nove liste selektiranih vrijednosti
    let selectedValues = [];
    for (let key in checkedState) {
      if (key == option && !newValue) continue; //Ako je nova vrijednost kliknutog boxa false, preskace se
      if (checkedState[key] || (key == option && newValue)) {
        // Ako je opcija vec prije selektirana ili je sada kliknuta, dodaje se
        selectedValues.push(key);
      }
    }
    console.log(selectedValues);
    setCheckedState((prevState) => ({ ...prevState, [option]: newValue }));
    setSelectedValues(selectedValues);
  };

  return (
    <div>
      <p className="mt-5 text-xl">{options.title}:</p>
      {options.items.map((option) => {
        return (
          <div key={option}>
            <input
              type="checkbox"
              name={option}
              key={option}
              value={option}
              checked={checkedState[option]}
              onChange={handleOptionChange}
            />
            <label htmlFor={option} className="mx-2">
              {option}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Checkbox;
