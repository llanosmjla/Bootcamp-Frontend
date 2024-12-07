import '../styles/style.css'
import { useLanguageContext, useLanguageToggleContext } from '../hooks/UseProvider';



function MainSection() {
    const language = useLanguageContext();
    const toggleLanguage = useLanguageToggleContext();

    return (
      <div className='container'>
        <p>Favorite Programing Language:</p>
        <p className='title' id="favoriteLanguage"> {language}</p>
        <button className='btn' id="changeFavorite" onClick={toggleLanguage}>toggle language</button>
      </div>
    )
}

export default MainSection;