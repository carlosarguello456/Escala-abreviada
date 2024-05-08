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
  };