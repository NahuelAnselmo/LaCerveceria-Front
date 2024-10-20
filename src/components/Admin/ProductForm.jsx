import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Admin.css";

const ProductForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    price: "",
    description: "",
    available: true,
    category: "burgers",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        imageUrl: "",
        price: "",
        description: "",
        available: true,
        category: "burgers",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
     
      <div className="form-group ">
        
        <input
          placeholder="Nombre del Producto"
          required
          className="form-style"
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
        <i className={`input-icon bi bi-basket`}></i>
      </div>
 <div className="py-2">

      <div className="form-group">
        
        <input
          required
          placeholder="Imagen (URL)"
          className="form-style"
          id="imageUrl"
          name="imageUrl"
          type="url"
          value={formData.imageUrl}
          onChange={handleChange}
          />
        <i className={`input-icon bi bi-image-fill`}></i>
      </div>
          </div>
   

      <div className="form-group">
        
        <input
          required
          placeholder="Precio"
          className="form-style"
          id="price"
          name="price"
          type="text"
          value={formData.price}
          onChange={handleChange}
          
          />
          <i className={`input-icon bi bi-currency-euro`}></i>
      </div>
         <div className="py-2">

      <div className="form-group">
        
        <textarea
          required
          className="form-style textarea-contacto"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          />
        <i className={`input-icon bi bi-text-left `}></i>
      </div>
          </div>
    <div className="form-style">

          <div className="form-check-inline d-flex justify-content-evenly">
  <div className="mx-3">
    <input
      checked={formData.available}
      className="form-check-input"
      id="available"
      name="available"
      type="checkbox"
      onChange={handleChange}
      />
  </div>
  <label htmlFor="available" className="form-check-label">
    {formData.available ? 'Disponible' : 'No disponible'}
  </label>
</div>
      </div>
      <div className="form-group">
        <label htmlFor="category">Categoría</label>
        <select
          className="form-style"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="burgers">Burgers</option>
          <option value="entrantes">Entradas</option>
          <option value="tragos">Tragos</option>
          <option value="bebidas">Bebidas</option>
          <option value="cervezas">Cervezas</option>
        </select>
      </div>
      <div className="form-group pt-3 mt-auto d-flex justify-content-around ">
        <button className="button-card" type="submit">
          {initialData ? "Actualizar" : "Guardar Producto"}
        </button>
        {initialData && (
          <button className="btn text-white" type="button" onClick={onCancel}>
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