import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './EstilosPagina2.css';

export default function Pagina2() {
    const location = useLocation(); 
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [buttonText, setButtonText] = useState('Selecciona una opción');
    const [edad, setEdad] = useState(null);
    const [rangoEdad, setRangoEdad] = useState(null);
    const [preguntas, setPreguntas] = useState([]);
    const options = [
        {name: 'PERSONAL_SOCIAL', label: 'Personal Social'},
        {name: 'AUDICIÓN_LENGUAJE', label: 'Audición Lenguaje'},
        {name: 'MOTRICIDAD_FINOADAPTATIVA', label: 'Motricidad Finoadaptativa'},
        {name: 'MOTRICIDAD_GRUESA', label: 'Motricidad Gruesa'}
    ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option.name);
        setButtonText(option.label); 
        setIsOpen(false);
    };

    const fetchQuestions = (componente) => {
        fetch(`http://18.189.81.6:9000/api/questions/?birth_date=2018-07-13&componente=${componente}&format=json&semanas_gestacion=40`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('error en la respuesta network');
                }
                return response.json();
            })
            .then(data => {
                setEdad(data.age);
                setRangoEdad(data.age_range);
                setPreguntas(data.Questions); 
                setItemsIniciales(data.initial_item);
            })
            .catch(error => {
                console.error('Hubo un problema con el request:', error);
            });
    };

    useEffect(() => {
        if (selectedOption) {
            fetchQuestions(selectedOption);
        }
    }, [selectedOption]);

    const name = location.state && location.state.name;

    return (
        <div className="caja">
            <div className="caja1">
                {edad && rangoEdad && (
                    <div>
                        <p id="re">Rango de Edad: {rangoEdad}</p>
                        <p id="n">Edad: {edad}</p>
                        
                    </div>
                )}
                <p id="n"> Nombre : {name}</p>
            </div>
            <div className="caja2">
                <div className="dropdown">
                    <h1 id="titulo10"> Selecciona el area a evaluar </h1>
                    <div>
                        <button onClick={toggleDropdown} className="dropdown-toggle">
                            {buttonText}
                        </button>
                        {isOpen && (
                            <div className="dropdown-menu">
                                {options.map((option, index) => (
                                    <div key={index} onClick={() => handleOptionClick(option)} className="dropdown-item">
                                        {option.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="preguntas">
                <h2>Preguntas</h2>
                <ul>
                {preguntas && preguntas.map((pregunta, index) => (
    <li key={index}>{pregunta.question}</li>
))}
                </ul>
                
            </div>
        </div>
    );
}