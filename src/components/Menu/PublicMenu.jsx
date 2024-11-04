import { useQuery } from "@tanstack/react-query";
import { getMenuFn } from "../../api/menu";
import MenuCard from "./PublicMenuCard";
import "../Menu/menu.css";
import { useState } from "react";

const PublicMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: menu = { data: [] }, isLoading, isError } = useQuery({
    queryKey: ["menu", selectedCategory],
    queryFn: () => getMenuFn(selectedCategory),
  });

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
    <div className="py-5 flex-grow-1">
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="category-dropdown"
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
            <div className="mx-2">
              {groupedMenu[category].map((menuItem, index) => (
                <MenuCard menu={menuItem} index={index} key={menuItem.id} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicMenu;
