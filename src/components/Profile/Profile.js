import React from "react";
import { connect } from "react-redux";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    Col,
    Row
} from "reactstrap";
import styles from "./Profile.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { getProfile, profileSave } from "../../modules/Profile";

class Profile extends React.Component {
    state = {
        validations: {
            name: {
                isInvalid: false,
                isValid: false
            },
            card: {
                isInvalid: false,
                isValid: false
            },
            date: {
                isInvalid: false,
                isValid: false
            },
            cvv: {
                isInvalid: false,
                isValid: false
            }
        },
        values: {
            name: "",
            card: "",
            date: "",
            cvv: ""
        }
    };

    handleChange = event => {
        const { values } = this.state;
        this.setState({
            values: { ...values, [event.target.name]: event.target.value }
        });
    };

    handleSubmit = () => {
        const { name, card, date, cvv } = this.state.validations;
        const { profileSave } = this.props;
        if (
            name.isValid === true &&
            card.isValid === true &&
            date.isValid === true &&
            cvv.isValid === true
        ) {
            this.props.history.push("/mapBox");
            return profileSave(this.state.values);
        }
        return null;
    };

    verifyName = event => {
        var v = event.target.value;
        if (
            v.match(
                /^[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ ]+$/
            ) !== null
        ) {
            this.setState(prevState => ({
                validations: {
                    ...prevState.validations,
                    name: {
                        ...prevState.validations.name,
                        isValid: true,
                        isInvalid: false
                    }
                }
            }));
        } else {
            this.setState(prevState => ({
                validations: {
                    ...prevState.validations,
                    name: {
                        ...prevState.validations.name,
                        isValid: false,
                        isInvalid: true
                    }
                }
            }));
        }
    };

    verifyCard = event => {
        var v = event.target.value;
        if (v.match(/^\d{4}$/) !== null) {
            event.target.value = v + " ";
        } else if (v.match(/^\d{4}\ \d{4}$/) !== null) {
            event.target.value = v + " ";
        } else if (v.match(/^\d{4}\ \d{4}\ \d{4}$/) !== null) {
            event.target.value = v + " ";
        }

        if (v.match(/^\d{4}\ \d{4}\ \d{4}\ \d{4}$/) !== null) {
            this.setState(prevState => ({
                validations: {
                    ...prevState.validations,
                    card: {
                        ...prevState.validations.card,
                        isValid: true,
                        isInvalid: false
                    }
                }
            }));
        } else {
            this.setState(prevState => ({
                validations: {
                    ...prevState.validations,
                    card: {
                        ...prevState.validations.card,
                        isValid: false,
                        isInvalid: true
                    }
                }
            }));
        }
    };

    verifyDate = event => {
        var v = event.target.value;
        if (v.match(/^\d{2}$/) !== null) {
            event.target.value = v + "/";
        }

        if (
            v.match(/^\d{2}\/\d{2}$/) !== null &&
            12 >= v.substring(0, 2) &&
            1 <= v.substring(0, 2) &&
            99 >= v.substring(3, 5) &&
            1 <= v.substring(3, 5)
        ) {
            this.setState(prevState => ({
                validations: {
                    ...prevState.validations,
                    date: {
                        ...prevState.validations.date,
                        isValid: true,
                        isInvalid: false
                    }
                }
            }));
        } else {
            this.setState(prevState => ({
                validations: {
                    ...prevState.validations,
                    date: {
                        ...prevState.validations.date,
                        isValid: false,
                        isInvalid: true
                    }
                }
            }));
        }
    };

    verifyCVV = event => {
        var v = event.target.value;
        if (v.match(/^\d{3}$/) !== null) {
            this.setState(prevState => ({
                validations: {
                    ...prevState.validations,
                    cvv: {
                        ...prevState.validations.cvv,
                        isValid: true,
                        isInvalid: false
                    }
                }
            }));
        } else {
            this.setState(prevState => ({
                validations: {
                    ...prevState.validations,
                    cvv: {
                        ...prevState.validations.cvv,
                        isValid: false,
                        isInvalid: true
                    }
                }
            }));
        }
    };

    render() {
        const data = this.props.profile;
        return (
            <div className={styles.root}>
                <Form>
                    <FormGroup>
                        <Label for="profileName">Ваше имя</Label>
                        <Input
                            type="text"
                            name="name"
                            id="profileName"
                            defaultValue={data && data.name ? data.name : ""}
                            placeholder="Сидоров Иван Петрович"
                            onChange={this.handleChange}
                            onKeyUp={this.verifyName}
                            invalid={this.state.validations.name.isInvalid}
                            valid={this.state.validations.name.isValid}
                        />
                        <FormFeedback valid></FormFeedback>
                        <FormFeedback invalid>
                            Поле должно содержать только буквы кириллицы
                        </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="profileCard">Номер Карты</Label>
                        <Input
                            type="text"
                            name="card"
                            id="profileCard"
                            defaultValue={data && data.card ? data.card : ""}
                            placeholder="1234 1234 1234 1234"
                            onChange={this.handleChange}
                            onKeyUp={this.verifyCard}
                            invalid={this.state.validations.card.isInvalid}
                            valid={this.state.validations.card.isValid}
                        />
                        <FormFeedback valid></FormFeedback>
                        <FormFeedback invalid>
                            Поле должно содержать 16 цифр
                        </FormFeedback>
                    </FormGroup>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="profileDate">Срок действия</Label>
                                <Input
                                    type="text"
                                    name="date"
                                    id="profileDate"
                                    defaultValue={
                                        data && data.date ? data.date : ""
                                    }
                                    placeholder="MM/ГГ"
                                    onChange={this.handleChange}
                                    onKeyUp={this.verifyDate}
                                    invalid={
                                        this.state.validations.date.isInvalid
                                    }
                                    valid={this.state.validations.date.isValid}
                                />
                                <FormFeedback valid></FormFeedback>
                                <FormFeedback invalid>
                                    Поле заполнено некорректно
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="profileCVV">CVV</Label>
                                <Input
                                    type="text"
                                    name="cvv"
                                    id="profileCVV"
                                    defaultValue={
                                        data && data.cvv ? data.cvv : ""
                                    }
                                    placeholder="123"
                                    onChange={this.handleChange}
                                    onKeyUp={this.verifyCVV}
                                    invalid={
                                        this.state.validations.cvv.isInvalid
                                    }
                                    valid={this.state.validations.cvv.isValid}
                                />
                                <FormFeedback valid></FormFeedback>
                                <FormFeedback invalid>
                                    Поле должно содержать 3 цифры
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button
                        className={styles.formElement}
                        onClick={this.handleSubmit}
                    >
                        Sign in
                    </Button>
                </Form>
            </div>
        );
    }
}

export default connect(
    state => ({ profile: getProfile(state) }),
    { profileSave }
)(Profile);
