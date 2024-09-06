import { useQuery } from "@tanstack/react-query";
import { getMenuFn } from "../../api/menu";
import MenuCard from "./MenuCard";
import "../Menu/menu.css";
import FooterNavbar from "../FooterNavbar/FooterNavBar";
import { useEffect, useState } from "react";
import CartModal from "../FooterNavbar/CartModal";
import PropTypes from "prop-types"; 

const Menu = () => {
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const {
    data: menu = { data: [] }, 
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["menu", selectedCategory],
    queryFn: () => getMenuFn(selectedCategory),
  });
  
  console.log(menu);
  const [scrollTop, setScrollTop] = useState("select-category");

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 0) {
      setScrollTop("select-category-scroll");
    } else {
      setScrollTop("select-category");
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const filteredMenu =
    selectedCategory === "all"
      ? menu.data
      : menu.data.filter((item) => item.category === selectedCategory);
      const groupedMenu = filteredMenu.reduce((acc, menuItem) => {
        const category = menuItem.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(menuItem);
        return acc;
      }, {});
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const addToCart = (item, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        if (quantity === 0) {
          return prevCart.filter((cartItem) => cartItem.id !== item.id);
        }
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== id));
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCartClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmOrder = (number) => {
    setTableNumber(number);
    console.log("Pedido confirmado para la mesa:", number);
    setCart([]);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <p className="mt-2 text-center">Cargando datos...</p>;
  }

  if (isError) {
    return (
      <div className="alert alert-danger">
        Ocurrió un error cargando los datos
      </div>
    );
  }

  return (
    <>
      <div className="py-5 flex-grow-1">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className={`${scrollTop} category-dropdown`}
        >
          <option value="all">Todas</option>
          <option value="burgers">Burgers</option>
          <option value="entrantes">Entradas</option>
          <option value="tragos">Tragos</option>
          <option value="bebidas">Bebidas</option>
          <option value="cervezas">Cervezas</option>
        </select>

        <div className="menu-category-cont py-2">
    {Object.keys(groupedMenu).map((category) => (
      <div key={category}>
        <div className="text-center">

        <h2 className="title-enfasis">{category.toUpperCase()}</h2> 
        <hr className="title-enfasis" />
        </div>
        <div className=" mx-2 ">
        {groupedMenu[category] && groupedMenu[category].map((menuItem, index) => (

          <MenuCard
            menu={menuItem}
            index={index}
            addToCart={addToCart}
            key={menuItem.id}
            />
        ))}
            </div>
      </div>
    ))}
  </div>
        <FooterNavbar
          totalAmount={totalAmount}
          onCartClick={handleCartClick}
          tableNumber={tableNumber}
        />
        {isModalOpen && (
          <CartModal
            cart={cart}
            totalAmount={totalAmount}
            onClose={handleCloseModal}
            onRemoveFromCart={removeFromCart}
            onConfirm={handleConfirmOrder}
            tableNumber={tableNumber}
          />
        )}
      </div>
    </>
  );
};

MenuCard.propTypes = {
  menuItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    disabled: PropTypes.bool.isRequired,
  }).isRequired, 
};

export default Menu;
