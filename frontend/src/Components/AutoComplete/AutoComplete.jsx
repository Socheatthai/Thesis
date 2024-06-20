import React, { useState, useEffect, useRef } from 'react';
import './AutoComplete.css'

const AutoComplete = () => {
    const addresses = ["1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy", "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf6thj"];
    const [value, setValue] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);

    const autocompleteRef = useRef();

    const handleChange = (event) => {
        const inputValue = event.target.value;
        setValue(inputValue);
        if (inputValue) {
            setFilteredSuggestions(addresses.filter(address =>
                address.toLowerCase().includes(inputValue.toLowerCase())
            ));
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setValue(suggestion);
        setShowSuggestions(false);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div className='autocomplete' ref={autocompleteRef}>
            <input
                type="text"
                value={value}
                className="w-full p-[18px] sm:p-[24px] pr-[86px] md:pr-[114px] h-[72px] text-[0.65em] sm:text-sm text-ellipsis text-gray-900 font-black outline-none rounded-lg shadow-lg"
                onChange={handleChange}
                placeholder="Search..."
                onFocus={() => setShowSuggestions(true)}
            />
            {showSuggestions && (
                <ul className="suggestions">
                    {filteredSuggestions.map((suggestion, index) => (
                        <li onClick={() => handleSuggestionClick(suggestion)} key={index}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AutoComplete;
