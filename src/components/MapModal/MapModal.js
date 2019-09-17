import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css'
import {
  getAddressList,
  getOrder,
  routeRequest,
  newOrderRequest
} from "../../modules/Order";
import styles from "./MapModal.module.css";

const MapStateToProps = state => ({
    addressList: getAddressList(state),
    order: getOrder(state)
});

const MapDispatchToProps = { getAddressList, routeRequest, newOrderRequest };


class FormTaxiRequest extends React.Component {
    state = {
        values: {
            from: '',
            to: ''
        }
    }

    handleChange = event => {
        console.log(event.target.value)
    };

    handleSubmit = (e) => {
        console.log(123123) 
    };

    render() {
        const frields = [ 'from', 'to' ]
        const { addressList } = this.props
        return (
            <div>
                <Form>
                    {frields.map((id, name) => (
                        <React.Fragment key={id}>
                            <FormGroup>
                                <Input type="select" name={name}>
                                    {addressList &&
                                        addressList.map((item, index) => (
                                          <React.Fragment key={index}>
                                            <option onClick={console.log({item})} value={item}>
                                                {item}
                                            </option>
                                          </React.Fragment>
                                        ))
                                    }
                                </Input>
                            </FormGroup>
                        </React.Fragment>
                    ))}
                </Form>
                <Button onClick={console.log(123)}>Вызвать Такси</Button>  
            </div>
        );
    }
}

function FormNewOrder(props) {
  const { onSubmit } = props;
  return (
    <div data-testid="formNewOrder">
      <h1>Заказ размещён</h1>
      <p>Ваше такси уже едет к вам. Прибудет приблизительно через 10 минут.</p>
      <Button
        onClick={onSubmit}
      >
        Сделать новый заказ
      </Button>
    </div>
  );
}

export class MapForm extends React.Component {
  render() {
    const {
      order,
      addressList,
      routeRequest,
      newOrderRequest
    } = this.props;
  return (
      <div className={styles.root}>
      { order ? (
          <FormNewOrder onSubmit={newOrderRequest}></FormNewOrder>
        ) : (
          <FormTaxiRequest
            addressList={addressList}
            routeRequest={routeRequest}
          ></FormTaxiRequest>
        )
      }
      </div>
    );
  }
}

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(withRouter(MapForm));