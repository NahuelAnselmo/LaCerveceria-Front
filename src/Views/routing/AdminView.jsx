import { useState, useEffect } from 'react';
import { getProductsFn, createProduct, updateProduct, deleteProduct } from '../../api/products.js';
import ProductForm from '../../components/Admin/ProductForm';
import ProductTable from '../../components/Admin/ProductTable';

const AdminView = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  
  const fetchProducts = async () => {
    try {
      const response = await getProductsFn();
      const fetchedProducts = response.data || []; 
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const handleAddProduct = async (product) => {
    try {
      const newProduct = await createProduct(product);
      if (newProduct) {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
      }
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };


  const handleUpdateProduct = async (updatedProduct) => {
    const { id, ...dataProduct } = updatedProduct;
    try {
      const updated = await updateProduct(id, dataProduct);
      if (updated) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id ? updated : product
          )
        );
        setEditingProduct(null); 
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };


  const handleDeleteProduct = async (productId) => {
    try {
      const success = await deleteProduct(productId);
      if (success) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };


  const handleEditProduct = (product) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-4 AdminViewcss">
      <h2 className="title-Admin text-center mb-5">Administrador de Productos</h2>
      <ProductForm
        initialData={editingProduct}
        onCancel={() => setEditingProduct(null)}
        onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
        refreshProducts={fetchProducts}
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
