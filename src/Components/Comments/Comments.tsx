import Styles from "./Comments.module.css";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface Comment {
  id: number;
  name: string;
  text: string;
  created_at: string;
}
interface newComment {
  name: string;
  text: string;
}

export default function Comments() {
  const [CommentsArray, setComents] = useState<Comment[]>([]);
  const BACK_URL = process.env.REACT_APP_BACK_URL;
  const [buttonState, setButton] = useState(true);
  const [isLoadding, setIsLoadding] = useState(true);
  const [errors, setErrors] = useState({ name: "", text: "" });
  const [Data, setData] = useState<newComment>({
    name: "",
    text: "",
  });
  const maxCharCount = 255;

  useEffect(() => {
    if (CommentsArray.length >= 0) {
      getComments();
    }
  }, []);

  const getComments = async () => {
    try {
      const response = await axios.get(`${BACK_URL}/comments`);
      console.log("respuesta", response);
      if (response?.data) {
        const coments = response.data;
        const sortedComments = coments.sort((a, b) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        });
        setComents(sortedComments);
        setIsLoadding(false);
      } else {
        console.log("sin respuesta");
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (CommentsArray.length === 1 && CommentsArray[0].text === "") {
      setIsLoadding(false);
    }
  }, [CommentsArray]);

  const validation = () => {
    const error = {} as typeof errors;
    if (Data.name.length < 1) {
      error.name = "El nombre es requerido";
    } else {
      error.name = "";
    }
    if (Data.text.length < 1) {
      error.text = "Ingrese un comentario";
    } else {
      error.text = "";
    }

    return error;
  };

  useEffect(() => {
    const resultForm = validation();
    setErrors(resultForm);
    const hasErrors = Object.values(resultForm).some((error) => error !== "");

    if (!hasErrors) {
      setButton(false);
    } else {
      setButton(true);
    }
  }, [Data]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target as HTMLInputElement;
    if (event.target instanceof HTMLTextAreaElement) {
      if (value.length <= maxCharCount) {
        setData({
          ...Data,
          [name]: value,
        });
      }
    } else if (event.target instanceof HTMLInputElement) {
      setData({
        ...Data,
        [name]: value,
      });
    }

    validation();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BACK_URL}/comments`, Data);
      setData({
        name: "",
        text: "",
      });
      toast.success(response.data);
      getComments();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className={Styles.divMayor}>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <div className={Styles.formDivs}>
          <label>Nombre</label>
          <input
            type="text"
            min="4"
            max="30"
            name="name"
            value={Data.name}
            onChange={handleChange}
          />
          {errors.name && (
            <label className={Styles.error}> {errors.name} </label>
          )}
        </div>
        <div className={Styles.formDivs}>
          <label>Comentario (Maximo 255 caracteres)</label>
          <textarea value={Data.text} name="text" onChange={handleChange} />
          <p>
            Caracteres restantes: {maxCharCount - Data.text.length}/
            {maxCharCount}
          </p>
          {errors.text && (
            <label className={Styles.error}> {errors.text} </label>
          )}
        </div>

        <button
          className={Styles.submitButton}
          type="submit"
          disabled={buttonState}
        >
          Enviar
        </button>
      </form>
      {isLoadding && (
        <div className={Styles.loadingContainer}>
          <div className={Styles.loadingSpinner}></div>
          <p>Cargando comentarios...</p>
        </div>
      )}
      {!isLoadding && (
        <div className={Styles.commentContainer}>
          {CommentsArray.map((comment) => (
            <div className={Styles.oneComment} key={comment.id}>
              <h5>
                Comentario de{" "}
                <span className={Styles.nameStyle}>{comment.name}</span>{" "}
                <span className={Styles.dateStyle}>
                  {comment.created_at
                    ? new Date(comment.created_at).toLocaleDateString("es-AR")
                    : ""}
                </span>
              </h5>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
