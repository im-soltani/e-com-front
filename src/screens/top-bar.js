import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { cls } from "reactutils";
import { useHistory } from "react-router-dom";
import logo from "./logo.png";
import { logout } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const TopBar = ({ active, setActive }) => {
  const [showAvatarSubModules, setShowAvatarSubModules] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  const addedCart = useSelector((state) => state.cart);
  const addedFavor = useSelector((state) => state.favor);
  const shoppingCount = addedCart.cartItems.length;
  const favoriteCount = addedFavor.favorItems.length;

  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = () => {
    setActive("");
    history.push("/signin");
  };

  const handleLogout = () => {
    dispatch(logout());
    history.push("/home");
    setActive("home");
  };

  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: 6,
      top: 10,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
      width: "25px",
      height: "25px",
      borderRadius: "50%",
      fontSize: "14px",
      backgroundColor: "#f50057",
    },
  }))(Badge);

  const renderBtn = () => {
    let list = [
      {
        label: "Home",
        key: "home",
        onClick: () => {
          history.push("/home");
        },
      },
      {
        label: "Shop",
        key: "shop",
        onClick: () => {
          history.push("/shop");
        },
      },
      {
        label: "Blog",
        key: "blog",
        onClick: () => {
          history.push("/blog");
        },
      },
      {
        label: "About Us",
        key: "aboutUs",
        onClick: () => {
          history.push("/aboutUs");
        },
      },
      {
        label: "Contact Us",
        key: "contactUs",
        onClick: () => {
          history.push("/contactUs");
        },
      },
    ];

    if (userInfo && userInfo.isAdmin) {
      list.splice(1, 0, {
        label: "Products",
        key: "products",
        onClick: () => {
          history.push("/products");
        },
      });
      list.splice(2, 0, {
        label: "Orders",
        key: "orders",
        onClick: () => history.push("/orders"),
      });
      list.splice(3, 0, {
        label: "Articles",
        key: "articles",
        onClick: () => history.push("/articles"),
      });
    }
    return list.map(({ label, key, onClick }, index) => {
      return (
        <span
          key={index}
          onClick={() => {
            setActive(key);
            onClick && onClick();
          }}
          className={cls("module", active === key ? "moduleActive" : "")}
          style={{ margin: "0 32px", cursor: "pointer" }}
        >
          {label}
        </span>
      );
    });
  };
  const StyledButton = withStyles({
    root: {
      height: 28,
      width: 28,
      cursor: "pointer",
    },
  })(Avatar);

  return (
    <div
      className="topBar"
      style={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: "8px 52px",
        borderBottom: "1px solid #eee",
        boxSizing: "border-box",
        height: "90px",
        fontFamily: "Poppins,sans-serif",
        fontWeight: 400,
        color: "#000",
      }}
    >
      <div
        style={{ cursor: "pointer" }}
        className="logoContainer"
        onClick={() => {
          history.push("/home");
        }}
      >
        <img
          src={logo}
          className="logo"
          width="100px"
          height="50px"
          alt="logo"
        />
      </div>
      <div className="modules">{renderBtn()}</div>
      <div className="badges" style={{ display: "flex", alignItems: "center" }}>
        <IconButton
          aria-label="cart"
          style={{
            padding: "8px 5px",
            // backgroundColor: "transparent",
            outline: "none",
          }}
          disabled={!favoriteCount}
          onClick={() => {
            setActive("");
            history.push("/like/");
          }}
        >
          <StyledBadge badgeContent={favoriteCount} color="primary">
            <FavoriteBorderIcon
              style={{ fontSize: "2.8rem", margin: "0 12px", padding: 0 }}
            />
          </StyledBadge>
        </IconButton>
        <IconButton
          aria-label="cart"
          style={{
            margin: "0 12px 0 8px",
            padding: "8px 5px",
            outline: "none",
            // backgroundColor: "transparent",
          }}
          disabled={!shoppingCount}
          onClick={() => {
            setActive("");
            history.push("/cart/");
          }}
        >
          <StyledBadge badgeContent={shoppingCount} color="primary">
            <AddShoppingCartIcon
              style={{ fontSize: "2.8rem", margin: "0 12px 0 0" }}
            />
          </StyledBadge>
        </IconButton>
        <StyledButton>
          <Avatar
            src={
              !(userInfo && userInfo.image)
                ? "/broken-image.jpg"
                : userInfo.image
            }
            onClick={() => setShowAvatarSubModules(true)}
          />
        </StyledButton>
        {userInfo && (
          <span style={{ margin: "0 5px", textTransform: "uppercase" }}>
            {userInfo.name}
          </span>
        )}
      </div>
      {showAvatarSubModules && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              left: 0,
              zIndex: 0,
              bottom: 0,
            }}
            onClick={() => setShowAvatarSubModules(false)}
          />
          <AvatarSubModule
            onLogin={onLogin}
            onRegister={() => {
              setActive("");
              history.push("/register");
            }}
            logOut={handleLogout}
            goToAccount={() => {
              setActive("");
              history.push("/profile");
            }}
            onHide={() => setShowAvatarSubModules(false)}
            userInfo={userInfo}
          />
        </>
      )}
    </div>
  );
};

export default TopBar;

const AvatarSubModule = ({
  onLogin,
  logOut,
  onRegister,
  goToAccount,
  onHide,
  userInfo,
}) => {
  const avatarSubModules = !userInfo
    ? [
        {
          label: "Log In",
          key: "login",
          onClick: () => {
            onLogin && onLogin();
          },
        },
        {
          label: "Register",
          key: "register",
          onClick: () => {
            onRegister && onRegister();
          },
        },
      ]
    : [
        {
          label: "My Account",
          key: "account",
          onClick: () => {
            goToAccount && goToAccount();
          },
        },
        {
          label: "Log Out",
          key: "logout",
          onClick: () => {
            logOut && logOut();
          },
        },
      ];
  const renderModules = () => {
    return avatarSubModules.map(({ onClick, label, key }, index) => (
      <div
        className="avatarSubModulesItem"
        key={index}
        onClick={() => {
          onClick();
          onHide();
        }}
        style={{ padding: "16px 24px" }}
      >
        {label}
      </div>
    ));
  };
  return (
    <div
      className="avatarSubModulesItems"
      style={{
        position: "absolute",
        display: "flex",
        zIndex: 1,
        flexDirection: "column",
        top: 90,
        right: 120,
        backgroundColor: "#fff",
        border: "0.5px solid #eee",
      }}
    >
      {renderModules()}
    </div>
  );
};
