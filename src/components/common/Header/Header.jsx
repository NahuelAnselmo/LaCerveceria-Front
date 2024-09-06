import { Link } from "react-router-dom";

import "./header.css";
import Logo from "./Logo";
import RedesSociales from "./RedesSociales";
import HeaderUser from "./HeaderUser";
import HeaderAdmin from "./HeaderAdmin";
import ButtonsLink from "./buttonsLink";
import { useSession } from "../../../constans/Stores/useSesion";

const Header = () => {
  const {user,isLoggedIn} = useSession()
  return (
    <nav className="navbar bg-body-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="../../../../public/potion.svg"
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
          Elixir and Bites
        </Link>
        <button
          className="btn-close btn-vio btn-hamb pt-2 pe-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        ></button>

        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
          
        >
          <div className="offcanvas-header d-flex justify-content-between align-items-start">
            

            <button
              type="button "
              className="btn-close mt-2 me-2 btn-vio"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              
            </button>
          </div>
              <Logo />
              <div className="text-center">
            {user && user.isAdmin ? "" : <RedesSociales />}
            <div>
              {isLoggedIn ? (
                user && user.isAdmin ? (
                  <HeaderAdmin />
                ) : (
                  <HeaderUser user={user} />
                )
              ) : (
                <ButtonsLink />
              )}
            </div>
          </div>
          
        </div>
      </div>
    </nav>
  );
};
export default Header;
