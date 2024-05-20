import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './EstilosFormulario.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagina2 from './Pagina2'; // Import Pagina2 component

export default function PaginaFormulario() {
  const { register, formState: { errors }, handleSubmit, setValue, watch } = useForm({
    defaultValues: {}
  });
  const [errorNombre, setErrorNombre] = useState(false);
  const [errorFechaNacimiento, setErrorFechaNacimiento] = useState(false);
  const [mostrarSemanasGestacion, setMostrarSemanasGestacion] = useState(false);
  const [edadError, setEdadError] = useState(false);
  const [usuarioCreado, setUsuarioCreado] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const hoy = new Date();
    const fechaN = new Date(data.birth_date);
    const edad = hoy.getFullYear() - fechaN.getFullYear();

    if (edad > 6) {
      setEdadError(true);
      return;
    }

    const newData = mostrarSemanasGestacion ? { ...data } : { ...data, weeks_gestation: undefined };

    console.log('Datos a enviar:', newData);

    try {
      const response = await axios.post('http://18.189.81.6:9000/api/patient/', newData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Usuario creado correctamente:', response.data);
      window.alert('Usuario creado correctamente');
      setUsuarioCreado(true);

    } catch (error) {
      console.error('Error al enviar los datos:', error.message);
      window.alert('Error al enviar los datos');
    }
  };

  useEffect(() => {
    if (usuarioCreado) {
      navigate('/pagina2', { state: { name: watch('name') } }); // Pass the name to the second page
    }
  }, [usuarioCreado, navigate, watch]);

  const handleFechaNacimientoChange = (event) => {
    const fechaN = new Date(event.target.value);
    const hoy = new Date();
    if (fechaN > hoy) {
      setErrorFechaNacimiento(true);
      setMostrarSemanasGestacion(false);
    } else {
      const edad = hoy.getFullYear() - fechaN.getFullYear();
      if (edad < 3) {
        setMostrarSemanasGestacion(true);
        setErrorFechaNacimiento(false);
        setEdadError(false);
      } else {
        setMostrarSemanasGestacion(false);
        setErrorFechaNacimiento(false);
        setEdadError(false);
      }
    }
  };

  const handleNombreChange = (event) => {
    const value = event.target.value;

    if (/^[a-zA-ZñÑ\s]*$/.test(value) || value === '') {
      setValue('name', value);
      setErrorNombre(false);
    } else {
      setErrorNombre(true);
    }
  };

  const watchBirthDate = watch("birth_date");

  const handleFormSubmit = (data) => {
    if (errorNombre || errorFechaNacimiento || edadError) {
      return; // Don't submit if there are validation errors
    }
    onSubmit(data);
  };

  return (
    <div className="caja">
      <div className="caja1">
        <h1 id="titulo1">Escala abreviada de Desarrollo</h1>
      </div>
      <div className="caja2">
        <h2 id="a">Datos del paciente</h2>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="caja3">
            <div className="campo">
              <label id="titulo2">Nombre</label>
              <input className='botoninput' type="text" {...register('name', { required: true, maxLength: 40 })} onChange={handleNombreChange} />
              {errors.name?.type === 'required' && <p>No olvides agregar el nombre del paciente.</p>}
              {errors.name?.type === 'maxLength' && <p>El nombre debe tener menos de 40 caracteres</p>}
              {errorNombre && <p>No se pueden colocar números ni caracteres especiales en el nombre.</p>}
            </div>
            <div className="campo">
              <label id="titulo3">Fecha de nacimiento</label>
              <input className='botonin' type="date" {...register('birth_date', { required: true })} onChange={handleFechaNacimientoChange} />
              {errors.birth_date?.type === 'required' && <p>Por favor incluye la fecha de nacimiento del paciente</p>}
              {errorFechaNacimiento && <p>La fecha de nacimiento no puede ser posterior a la fecha actual.</p>}
              {edadError && <p>No se puede realizar el test para un niño mayor de 7 años.</p>}
            </div>
            {mostrarSemanasGestacion && (
              <div className="campo">
                <label id="titulo4">Semanas de gestación</label>
                <p id="texto1">Para niños menores de 2 años es recomendable agregar las semanas de gestación.<br />
                  (en caso de dejar vacío, se toma por defecto 40 semanas)
                </p>
                <input className='botinp' type="number" {...register('weeks_gestation', {
                  required: true,
                  validate: value => parseInt(value) > 24 || "Las semanas de gestación deben ser mayores a 24"
                })} />
                {errors.weeks_gestation && <p>{errors.weeks_gestation.message}</p>}
              </div>
            )}
            <input id="button" type="submit" value="Empezar test" />
          </div>
        </form>
      </div>
    </div>
  );
}