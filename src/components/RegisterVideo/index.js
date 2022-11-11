import { useState } from "react";
import { StyledRegisterVideo } from "../RegisterVideo/styles";

function useForm(propsDoForm){
    const [values,setValues] = useState(propsDoForm.initialValues)
    return {
      values,
      handleChange: (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setValues({
          ...values,
          [name]: value,
        });
      },
      clearForm: ()=>{
        setValues({})
      }
    };
}

export default function RegisterVideo() {
const formCadastro = useForm({
  initialValues: { titulo: "Frost punk", url: "https://youtube.." }
});
const [formVisivel,setFormVisivel] = useState(true)


return (
  <StyledRegisterVideo>
    <button type="button" className="add-video" onClick={()=>{setFormVisivel(true)}}>+</button>
    {formVisivel && (
      <form onSubmit={(e)=>{
        e.preventDefault();
        console.log(formCadastro.values)
        setFormVisivel(false)
        formCadastro.clearForm()
      }} >

        <div>

          <button className="close-modal" onClick={()=>{setFormVisivel(false)}}> x </button>
           <input 
           type="text" 
           placeholder="Titulo do Vídeo" 
           value={formCadastro.values.titulo}
           onChange={formCadastro.handleChange}
           name="titulo" />

          <input
          type="text" 
           placeholder="URL"
           value={formCadastro.values.url}
           onChange={formCadastro.handleChange}
           name="url" />

          <button type="submit">Cadastrar</button>

        </div>

      </form>
    )}
  </StyledRegisterVideo>
);
}
