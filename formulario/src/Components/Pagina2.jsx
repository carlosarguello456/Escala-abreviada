import React, { useState } from 'react';
import './EstilosPagina2.css';

export default function Pagina2() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [buttonText, setButtonText] = useState('Selecciona una opción');
    const options = ['PERSONAL Y SOCIAL', 'AUDICION Y LENGUAJE', 'MOTRICIDAD FINOADAPTATIVA', 'MOTRICIDAD GRUESA'];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setButtonText(option); // Actualizar el texto del botón al seleccionar una opción
        setIsOpen(false); // Cerrar el dropdown cuando se selecciona una opción
    };

    return (
        <div className="caja">
            <div className="caja1">
                <h1 id="titulo1"> Nombre : Carlos Arguello </h1>
            </div>
            <div className="caja2">
                <div className="dropdown">
                <h1 id="titulo10"> Selecciona el area a evaluar </h1>
                    <button onClick={toggleDropdown} className="dropdown-toggle">
                        {buttonText} {}
                    </button>
                    {isOpen && (
                        <div className="dropdown-menu">
                            {options.map((option, index) => (
                                <div key={index} onClick={() => handleOptionClick(option)} className="dropdown-item">
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}