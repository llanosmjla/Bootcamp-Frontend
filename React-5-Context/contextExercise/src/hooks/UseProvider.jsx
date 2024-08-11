import React from "react";
import { useContext } from "react";
import { useState } from "react";

//Create the news contexts
const LanguageContext = React.createContext();
const LanguageToggleContext = React.createContext();

//Create the Data for the languages
const languages = ['JavaScript', 'Python', 'Java', 'C++', 'C#'];

//Encapsulate the context providers
export function useLanguageContext() {
    return useContext(LanguageContext);
}

export function useLanguageToggleContext() {
    return useContext(LanguageToggleContext);
}

function UseProvider({children}){
    const [language, setLanguage] = useState(languages[0]);
    
    //Function to toggle the language
    const toggleLanguage = () => {
        let index  = languages.indexOf(language);
        index  = index === languages.length - 1 ? 0 : index + 1;
        setLanguage(languages[index]);
    }

    return (
        <LanguageContext.Provider value={language}>
            <LanguageToggleContext.Provider value={toggleLanguage}>
                {children}
            </LanguageToggleContext.Provider>
        </LanguageContext.Provider>
    );

}

export default UseProvider;