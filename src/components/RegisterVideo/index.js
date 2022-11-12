import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { StyledRegisterVideo } from "../RegisterVideo/styles";

function useForm(propsDoForm) {
  const [values, setValues] = useState(propsDoForm.initialValues);
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
    clearForm: () => {
      setValues({});
    },
  };
}

const PROJECT_URL = "https://uvdsrgzacndqthmtpxjs.supabase.co";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2ZHNyZ3phY25kcXRobXRweGpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyNTU4ODMsImV4cCI6MTk4MzgzMTg4M30.Y7nxHw7cea_hySLN2ZTOjCqMFEcfuB4N32NTkOetI8k";
const supabase = createClient(PROJECT_URL, API_KEY);

function thumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
  const formCadastro = useForm({
    initialValues: {
      titulo: "Frost punk",
      url: "https://www.youtube.com/watch?v=n3TneUb5c-w",
    },
  });
  const [formVisivel, setFormVisivel] = useState(false);

  return (
    <StyledRegisterVideo>
      <button
        type="button"
        className="add-video"
        onClick={() => {
          setFormVisivel(true);
        }}
      >
        +
      </button>
      {formVisivel && (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            //contrato back e front
            supabase
              .from("videos")
              .insert({
                title: formCadastro.values.titulo,
                url: formCadastro.values.url,
                thumb: thumbnail(formCadastro.values.url),
                playlist: "Videos Favoritos",
              })
              .then((oqueveio) => {
                console.log(oqueveio);
              })
              .catch((err) => {
                console.log(err);
              });

            setFormVisivel(false);
            formCadastro.clearForm();
          }}
        >
          <div>
            <button
              className="close-modal"
              onClick={() => {
                setFormVisivel(false);
              }}
            >
              {" "}
              x{" "}
            </button>
            <input
              type="text"
              placeholder="Titulo do Vídeo"
              value={formCadastro.values.titulo}
              onChange={formCadastro.handleChange}
              name="titulo"
            />

            <input
              type="text"
              placeholder="URL"
              value={formCadastro.values.url}
              onChange={formCadastro.handleChange}
              name="url"
            />

            <button type="submit">Cadastrar</button>
          </div>
        </form>
      )}
    </StyledRegisterVideo>
  );
}
