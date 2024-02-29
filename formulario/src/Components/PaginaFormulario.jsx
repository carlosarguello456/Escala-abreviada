import { appendErrors, useForm } from 'react-hook-form';
import React, { useState } from 'react';

import axios from 'axios';


export default function PaginaFormulario() {
  const{register,formState:{errors},handleSubmit,setValue}=useForm({
    defaultValues:{
     
    }
  })
  const [edadN, setEdadN] = useState("")
  const hoy = new Date();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://18.189.81.6:9000/api/patient/', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Datos enviados correctamente:', response.data);
    } catch (error) {
      console.error('Error al enviar los datos:', error.message);
    }
  
    
   const fechaN = new Date(data.fecha)
   const mes=(fechaN.getMonth());
   const year=(fechaN.getFullYear());
   const day=(fechaN.getDate());
   let edad=(hoy.getFullYear() - year);
   const meses=(hoy.getMonth() - mes);
   const dias=(hoy.getDate() - day);

   console.log(dias);
   if (meses<0 ||(meses ===0 && hoy.getDate()< fechaN.getDate()))
   {
    edad--;
   }
   setEdadN(edad)
 
  }

  
  return <div >
    <h1>ESCALA ABREVIADA DE DESARROLLO - 3</h1>
    <h2>Datos del paciente</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nombre del paciente</label>
        <input type="text" {...register('name',{
          required: true, 
          maxLength: 40 
        })}/>
        {errors.nombre?.type==='required' && <p>El campo de nombre es obligatorio</p>}
        {errors.nombre?.type==='maxLength' && <p>El nombre debe tener menos de 40 caracteres</p>}
      </div>
      <div>
        <label>Fecha de nacimiento</label>
        <input  type="date" {...register('birth_date',{
          required: true 
        }
        )}/>
        {errors.fecha?.type==='required' && <p>El campo de fecha es obligatorio</p>}
       
      </div>
      
   
      <input type="submit" value="Empezar test" />
      


    </form>

  </div>
  
}
