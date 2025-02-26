import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png"
import {MdAccountCircle } from "react-icons/md";
import {MdSearch } from "react-icons/md";
import {MdAddShoppingCart } from "react-icons/md";

const options = {
    burgerColor: "#008080",
    burgerColorHover: "#eb4034",
    logo,
    logoWidth: "20vmax",
    navColor1: "white",
    logoHoverSize: "10px",
    logoHoverColor: "#eb4034",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "rgba(35, 35, 35,0.8)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#eb4034",
    link1Margin: "1vmax",
    profileIcon: true,
    ProfileIconElement: MdAccountCircle,
    profileIconUrl: "/login",
    profileIconColor: "rgba(35, 35, 35,0.8)",
    searchIcon: true,
    SearchIconElement:MdSearch,
    searchIconColor: "rgba(35, 35, 35,0.8)",
    searchIconUrl: "/search",
    cartIcon:true,
    cartIconColor: "rgba(35, 35, 35,0.8)",
    cartIconUrl: "/cart",
    CartIconElement:MdAddShoppingCart,
    profileIconColorHover: "#eb4034",
    searchIconColorHover: "#eb4034",
    cartIconColorHover: "#eb4034",
    cartIconMargin: "1vmax",
  };

const Header = () => {
  return (
    <div>
      <ReactNavbar {...options} />
    </div>
  )
}

export default Header
