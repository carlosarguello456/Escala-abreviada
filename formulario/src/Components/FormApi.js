import axios from 'axios';

export async function FormApi(formData){
    try{
        const response = await axios(
            {url: 'http://18.189.81.6:9000/api/patient/',
             method: 'POST'

            }
        )       
} catch(e){
    console.log(e)
}


}