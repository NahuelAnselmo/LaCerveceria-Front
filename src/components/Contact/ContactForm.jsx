import { useForm } from "react-hook-form";
import { postContacts } from "../../api/contact.js";
import {
  sendEmailToClient,
  sendEmailToRestaurant,
} from "../../utilities/sendEmail.js";

import Input from "../ui/Input/Input.jsx";
import Swal from "sweetalert2";
import Map from "./Map.jsx";
import "./Contactstyle.css";
import { useState } from "react";

const ContactForm = () => {
  const {
    register,
    handleSubmit: onSubmitRHF,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const [internalCharCount, setInternalCharCount] = useState(0);

  const handleTextareaChange = (e) => {
    setInternalCharCount(e.target.value.length);
  };

  const handleSubmit = (formData) => {
    const normalizedData = {
      ...formData,
      name: formData.name.trim(),
      lastname: formData.lastname.trim(),
      email: formData.email.trim(),
      issue: formData.issue.trim(),
      message: formData.message.trim(),
    };
  
    Swal.fire({
      title: "Estás a punto de enviar un email",
      text: "¿Estás seguro de enviarlo?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, enviar!",
      confirmButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        postContacts(normalizedData)
          .then(() => {
            return Promise.all([
              sendEmailToClient(normalizedData),
              sendEmailToRestaurant(normalizedData),
            ]);
          })
          .then(() => {
            Swal.fire({
              title: "Enviado",
              text: "Tu email fue enviado con éxito!",
              icon: "success",
            });
            reset();
            setInternalCharCount(0);
          })
          .catch((error) => {
            console.error("Error al guardar los datos o enviar correos", error);
            Swal.fire({
              title: "Error",
              text: "Hubo un error al enviar el email o guardar los datos",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="contact-section">
      <div className="contact-map">
        <Map />
      </div>
      <div className="contact-form">
        <form
          onSubmit={onSubmitRHF(handleSubmit)}
          className="form-container mt-2 text-center form-contacto"
        >
          <h2 className="form-h2">¡Mándanos tu consulta!</h2>

          <Input
            error={errors.issue}
            label="Asunto"
            name="issue"
            options={{
              required: {
                value: true,
                message: "El campo asunto es requerido",
              },
              minLength: {
                value: 5,
                message: "El campo asunto debe tener al menos 5 caracteres",
              },
              maxLength: {
                value: 50,
                message: "El campo asunto debe tener un máximo de 50 caracteres",
              },
              pattern: {
                value: /^[A-Za-zñÑáéíóúÁÉÍÓÚ0-9\s.,!?()-]+$/,
                message:
                  "El campo asunto solo puede contener letras, números, espacios y ciertos caracteres de puntuación (. , ! ? () -)",
              },
            }}
            register={register}
            placeholder="Asunto"
            icon="bi bi-chat-left-heart"
          />

          <Input
            error={errors.name}
            label="Nombre"
            name="name"
            options={{
              required: { value: true, message: "El nombre es requerido" },
              minLength: {
                value: 2,
                message: "El nombre debe tener al menos 2 caracteres",
              },
              maxLength: {
                value: 30,
                message: "El nombre debe tener un máximo de 30 caracteres",
              },
              pattern: {
                value: /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/,
                message: "El campo nombre solo puede contener letras",
              },
            }}
            register={register}
            placeholder="Nombre"
            icon="uil uil-user"
          />

          <Input
            error={errors.lastname}
            label="Apellido"
            name="lastname"
            options={{
              required: { value: true, message: "El apellido es requerido" },
              minLength: {
                value: 2,
                message: "El apellido debe tener al menos 2 caracteres",
              },
              maxLength: {
                value: 30,
                message: "El apellido debe tener un máximo de 30 caracteres",
              },
              pattern: {
                value: /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/,
                message: "El campo apellido solo puede contener letras",
              },
            }}
            register={register}
            placeholder="Apellido"
            icon="bi bi-person-raised-hand"
          />

          <Input
            error={errors.email}
            label="Email"
            name="email"
            options={{
              required: { value: true, message: "Este campo es requerido" },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Debe ser un email válido",
              },
            }}
            type="email"
            register={register}
            placeholder="Email"
            icon="uil uil-at"
          />

          <div className="text-center">
            <Input
              className="m-3 textarea-contacto"
              error={errors.message}
              label="Mensaje"
              name="message"
              options={{
                required: {
                  value: true,
                  message: "El mensaje es requerido",
                },
                minLength: {
                  value: 10,
                  message: "El campo mensaje debe tener al menos 10 caracteres",
                },
                maxLength: {
                  value: 500,
                  message:
                    "El campo mensaje debe tener un máximo de 500 caracteres",
                },
                pattern: {
                  value: /^[A-Za-zñÑáéíóúÁÉÍÓÚ0-9\s.,!?()-]+$/,
                  message:
                    "El campo mensaje solo puede contener letras, números y ciertos caracteres de puntuación (. , ! ? () -)",
                },
              }}
              register={register}
              textarea
              placeholder="Escriba un mensaje"
              maxLength={500}
              onChange={handleTextareaChange}
            />
          </div>

          <div className="char-counter text-right text-muted">
            <p>{internalCharCount} / 500</p>
          </div>

          <div className="text-center mt-3">
            <button className="button-submit" type="submit">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
