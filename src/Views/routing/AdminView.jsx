import { useState, useEffect } from 'react';
import { getProductsFn, createProduct, updateProduct, deleteProduct } from '../../api/products.js';

import ProductForm from '../../components/Admin/ProductForm'
import ProductTable from '../../components/Admin/ProductTable'


const AdminView = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductsFn();
        const fetchedProducts = response.data || []; 
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async (product) => {
    try {
      const newProduct = await createProduct(product);
      setProducts([...products, newProduct]);
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateProduct = async (updatedProduct) => {
    // eslint-disable-next-line no-unused-vars
    const { id, ...dataProduct } = updatedProduct;
    try {
      const updated = await updateProduct(editingProduct.id, dataProduct);

      if (updated) {
        setProducts(
          products.map((product) =>
            product.id === editingProduct.id ? updated : product
          )
        );
        setEditingProduct(null);
      } else {
        console.error(
          "El producto actualizado es nulo o no se devolvió correctamente"
        );
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const refreshProducts = async () => {
    try {
      const response = await getProductsFn();
      setProducts(response.data || []);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  return (
    <div className="py-4">
      <h2 className='title-Admin text-center mb-5'>Administrador de Productos</h2>
      <ProductForm
        initialData={editingProduct}
        refreshProducts={refreshProducts}
        onCancel={() => setEditingProduct(null)}
        onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
      />
      <ProductTable
        products={products}
        onDelete={handleDeleteProduct}
        onEdit={handleEditProduct}
      />
    </div>
  );
};

export default AdminView;