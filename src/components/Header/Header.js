import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getIsAuthorized, logoutRequest } from "../../modules/Auth";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
} from "reactstrap";
import styles from "./Header.module.css";

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    handleClick = e => {
        e.preventDefault();
        const { isAuthorized, logoutRequest } = this.props;
        if (isAuthorized) {
            logoutRequest();
        }
    };

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const { isAuthorized } = this.props;
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand>Loft-Taxi</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink
                                    className={styles.navLink}
                                    to="/mapBox"
                                >
                                    Карта
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink
                                    className={styles.navLink}
                                    to="/profile"
                                >
                                    Профиль
                                </NavLink>
                            </NavItem>

                            {isAuthorized ? (
                                <NavItem>
                                    <NavLink
                                        className={styles.navLink}
                                        to="/logout"
                                        onClick={this.handleClick}
                                    >
                                        Выйти
                                    </NavLink>
                                </NavItem>
                            ) : null}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default connect(
    state => ({ isAuthorized: getIsAuthorized(state) }),
    { logoutRequest }
)(withRouter(Header));
