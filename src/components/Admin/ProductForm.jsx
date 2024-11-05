import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import "./Admin.css"; 

const ProductForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    price: '',
    stock: '',
    description: "",
    available: true,
    category: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        imageUrl: "",
        price: '',
        stock: '',
        description: "",
        available: true,
        category: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      onSubmit(formData);
      Swal.fire({
        icon: "success",
        title: "Producto guardado con éxito",
        showConfirmButton: false,
        timer: 2000,
      });

      setFormData({
        name: "",
        imageUrl: "",
        price: '',
        stock: '',
        description: "",
        available: true,
        category: "",
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al guardar el producto",
        text: "Por favor, inténtalo de nuevo",
      });
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group col-sm-6">
          <input
            placeholder=" "
            required
            className="form-style"
            id="name"
            name="name"
            type="text"
            value={formData.name || ""}
            onChange={handleChange}
          />
          <label className="labelFrom" htmlFor="name">Nombre del Producto</label>
          <i className="input-icon bi bi-basket"></i>
        </div>

        <div className="form-group">
          <input
            required
            placeholder=" "
            className="form-style"
            id="imageUrl"
            name="imageUrl"
            type="url"
            value={formData.imageUrl || ""}
            onChange={handleChange}
          />
          <label className="labelFrom" htmlFor="imageUrl">Imagen (URL)</label>
          <i className="input-icon bi bi-image-fill"></i>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <input
            required
            placeholder=" "
            className="form-style"
            id="price"
            name="price"
            type="number"
            min="0"
            value={formData.price || ''}
            onChange={handleChange}
          />
          <label className="labelFrom" htmlFor="price">Precio</label>
          <i className="input-icon bi bi-currency-euro"></i>
        </div>

        <div className="form-group">
          <input
            required
            placeholder=" "
            className="form-style"
            id="stock"
            name="stock"
            type="number"
            min="0"
            value={formData.stock || ''}
            onChange={handleChange}
          />
          <label className="labelFrom" htmlFor="stock">Stock</label>
          <i className="input-icon fa-solid fa-database"></i>
        </div>
      </div>

      <div className="form-group">
        <textarea
          required
          className="form-style textarea-contacto"
          id="description"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder=" "
        />
        <label className="labelFrom" htmlFor="description">Descripción</label>
        <i className="input-icon bi bi-text-left"></i>
      </div>

      <div className="form-check-inline">
        <input
          checked={formData.available}
          className="form-check-input"
          id="available"
          name="available"
          type="checkbox"
          onChange={handleChange}
        />
        <label htmlFor="available" className="form-check-label">
          {formData.available ? "Disponible" : "No disponible"}
        </label>
      </div>

      <div className="form-group">
        <label  htmlFor="category" className="labelCategori">Categoría</label>
        <select
          className="form-style SelectCategory"
          id="category"
          name="category"
          value={formData.category || ""}
          onChange={handleChange}
        >
          <option value="burgers">Burgers</option>
          <option value="entrantes">Entrantes</option>
          <option value="tragos">Tragos</option>
          <option value="bebidas">Bebidas</option>
          <option value="cervezas">Cervezas</option>
        </select>
      </div>

      <div className=" d-flex justify-content-around">
        <button className="button-card mr-4 " type="submit">
          {initialData ? "Actualizar" : "Guardar Producto"}
        </button>
        {initialData && (
          <button className="button-card bg-danger btn " type="button" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

ProductForm.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ProductForm;
