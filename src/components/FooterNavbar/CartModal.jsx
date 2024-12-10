import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "../FooterNavbar/cartModal.css";
import Swal from "sweetalert2";
import Input from "../ui/Input/Input";
import { useForm } from "react-hook-form";
import { createOrder } from "../../api/cart.js";

const CartModal = ({
  cart,
  totalAmount,
  onClose,
  onRemoveFromCart,
  onConfirm,
  tableNumber: initialTableNumber,
}) => {
  const {
    register,
    formState: { errors },
  } = useForm();

  const [resetCount, setResetCount] = useState(false);
  const [tableNumber, setTableNumber] = useState(""); 
  const [comment, setComment] = useState("");
  const [isConfirmEnabled, setConfirmEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedTableNumber = localStorage.getItem("tableNumber");
    if (savedTableNumber) {
      setTableNumber(savedTableNumber);
      setConfirmEnabled(true);
    }
  }, []);

  useEffect(() => {
    
    if (!initialTableNumber) {
      const number = parseInt(tableNumber, 10);
      if (
        tableNumber.trim() === "" ||
        isNaN(number) ||
        number < 1 ||
        number > 20
      ) {
        setConfirmEnabled(false);
        setErrorMessage("Por favor ingrese un número válido entre 1 y 20.");
      } else {
        setConfirmEnabled(true);
        setErrorMessage("");
        localStorage.setItem("tableNumber", tableNumber);
      }
    } else {
      setConfirmEnabled(true);
    }
  }, [tableNumber, initialTableNumber]);



  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleConfirm = async () => {
    if (isConfirmEnabled) {
      const { isConfirmed } = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Deseas confirmar el pedido?",
        icon: "question",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#25d366",
        confirmButtonText: "Sí, confirmar",
        cancelButtonText: "Cancelar",
      });

      if (isConfirmed) {
        const items = cart.map(item => ({
          productId: item.id, 
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity, 
        }));
    
        const orderData = {
          tableNumber,
          items, 
          totalAmount,
          comment,
        };
    
        console.log("Datos del pedido:", orderData); 
        
          const newOrder = await createOrder(orderData);
          console.log('Nuevo pedido creado:', newOrder);    

          onConfirm(tableNumber, comment, cart, totalAmount );
          setComment("");
          setResetCount(true);      

      }
    }
  };

  const handleRemoveFromCart = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "¿Eliminar ítem?",
      text: "¿Estás seguro de que quieres eliminar este ítem del carrito?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#25d366",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (isConfirmed) {
      onRemoveFromCart(id);
    }
  };

  return (
    <div className="cart modal-overlay text-light">
      <div className="cart-modal">
        <h2>Carrito</h2>
        {cart.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <table className="table-responsive py-2">
            <thead>
              <tr>
                <th scope="col">Imagen</th>
                <th scope="col">Nombre</th>
                <th scope="col">Cantidad</th>
                <th scope="col"><i className="bi bi-trash icon-delete-th"></i></th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="cart-modal-image"
                    />
                  </td>
                  <td className="text-start">{item.name}</td>
                  <td>{item.quantity}</td>

                  <td>
                    <div
                      className="button-delete-card"
                      onClick={() => handleRemoveFromCart(item.id)}
                    
                    >
                      <i className="bi bi-trash icon-delete-card"></i>
                    </div>
                  </td>
                  <td>${item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!initialTableNumber && !localStorage.getItem("tableNumber") && (
          <div className="form-group">
            <input
              type="text"
              placeholder="Ingrese el número de mesa"
              value={tableNumber}
              className="form-style"
               maxLength="2" 
               onChange={(e) => setTableNumber(e.target.value)}
            />
            <i className={`input-icon bi bi-hash`}></i>
            <div className="py-2">
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
          </div>
        )}

        {initialTableNumber || localStorage.getItem("tableNumber") ?  (
          <div className="form-group">
            <h5 className="title-enfasis">
              Número de mesa: {localStorage.getItem("tableNumber") || initialTableNumber}
            </h5>
          </div>
        ) : null}

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
            validate: {
              noExtraSpaces: (value) =>
                !/\s{2,}/.test(value) ||
                "El campo mensaje no puede contener múltiples espacios consecutivos",
              noOnlySpaces: (value) =>
                value.trim().length > 0 ||
                "El campo mensaje no puede estar compuesto solo de espacios en blanco",
            },
          }}
          register={register}
          textarea
          placeholder="Escriba un mensaje, recuerde, aquí no se piden los números a las camareras"
          maxLength={500}
          resetCount={resetCount}
          onChange={handleCommentChange}
        />

        <div>
          <div className="text-center">

          <h3 className="title-enfasis">Total: ${totalAmount.toFixed(2)}</h3>
          </div>
          <div className="pt-2 d-flex justify-content-between" >

          <button className="btn text-white" onClick={onClose}>
            Cerrar
          </button>
          <button
            className="btn button-confirm"
            onClick={handleConfirm}
            disabled={cart.length === 0 || !isConfirmEnabled}
            >
            Confirmar Pedido
          </button>
            </div>
        </div>
      </div>
    </div>
  );
};

CartModal.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  totalAmount: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  tableNumber: PropTypes.string, 
};

export default CartModal;