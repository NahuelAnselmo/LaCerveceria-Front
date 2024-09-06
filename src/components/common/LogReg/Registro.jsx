import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../../constans/Stores/useSesion";
import { useForm } from "react-hook-form";
import InputLR from "./InputLR";
import { postRegisterFn } from "../../../api/auth";
import PropTypes from 'prop-types';

const Registro = ({ closeModal }) => {
  const { login } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const { mutate: postRegister } = useMutation({
    mutationFn: postRegisterFn,
    onSuccess: (userData) => {
      login(userData);
      closeModal("modalLR")
      closeModal("modalLR")
        navigate("/menu");

      reset();
    },
  });

  const handleSubmitForm = (data) => {
    console.log("Form data:", data); 
    postRegister({
      name: data.name,
      dni: data.dni,
      email: data.email,
      password: data.passwordR,
    });
  };

  return (
    <div className="section text-center">
      <h4 className="text-white">Registrarse</h4>
      <div className="form-group">
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <InputLR
            error={errors.name}
            label="Nombre"
            name="name"
            options={{
              required: { value: true, message: "Este campo es requerido" },
              minLength: 3,
              maxLength: 30,
            }}
            register={register}
            placeholder="Nombre"
            icon="uil uil-user"
          />
          <InputLR
            error={errors.dni}
            label="DNI"
            name="dni"
            options={{
              required: { value: true, message: "Este campo es requerido" },
              min: 999999,
              maxLength: 99999999,
            }}
            type="number"
            register={register}
            placeholder="DNI"
            icon="bi bi-hash"
          />
          <InputLR
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
          <InputLR
            error={errors.passwordR}
            label="Contraseña"
            name="passwordR"
            options={{
              required: { value: true, message: "Este campo es requerido" },
              minLength: { value: 8, message: "Mínimo 8 caracteres" },
              maxLength: { value: 15, message: "Máximo 15 caracteres" },
              pattern: {
                value: /^(?=.*[A-Z])(?=(.*\d){2,})[A-Za-z\d]{8,}$/,
                message:
                  "La contraseña debe tener dos números y una letra mayúscula",
              },
            }}
            type="password"
            register={register}
            placeholder="Contraseña"
            icon="bi bi-lock-fill"
          />

          <button className="button-submit" type="submit">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registro;
Registro.propTypes = {
  closeModal: PropTypes.func.isRequired, 
};