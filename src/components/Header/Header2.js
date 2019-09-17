import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getIsAuthorized, logoutRequest } from "../../modules/Auth";
import { AppBar } from "@material-ui/core/";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        fontSize: 16,
        borderRadius: 4,
        padding: "5px 15px",
        flexDirection: "row"
    },
    h2: {
        margin: 0
    },
    nav: {
        marginRight: 0,
        marginLeft: "auto"
    },
    navLink: {
        color: "white",
        display: "inline-block",
        margin: "4px 8px"
    },
    navLink_selected: {
        textDecoration: "none"
      }
});


export const Header = props => {
  const handleClick = e => {
    e.preventDefault();
    const { isAuthorized, logoutRequest} = props;
    if (isAuthorized) logoutRequest();
  };

  const { className, isAuthorized, ...rest } = props;
  const classes = useStyles();

  return (
    <AppBar
      position="static"
      className={classes.root}
      data-testid="header-wrapper"
    >
      <h2 className={classes.h2}>Loft Taxi</h2>
      <nav className={classes.nav}>
        <NavLink
          to="/mapBox"
          className={classes.navLink}
          activeClassName={classes.navLink_selected}
        >
          Карта
        </NavLink>

        <NavLink
          to="/profile"
          className={classes.navLink}
          activeClassName={classes.navLink_selected}
        >
          Профиль
        </NavLink>

        {isAuthorized ? (
          <NavLink
            to="/logout"
            className={classes.navLink}
            activeClassName={classes.navLink_selected}
            onClick={handleClick}
            data-testid="logout-btn"
          >
            Выйти
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className={classes.navLink}
            activeClassName={classes.navLink_selected}
            data-testid="login-btn"
          >
            Войти
          </NavLink>
        )}
      </nav>
    </AppBar>
  );
};

export default connect(
    state => ({ isAuthorized: getIsAuthorized(state) }),
    { logoutRequest }
)(withRouter(Header));