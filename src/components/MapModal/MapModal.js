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

        const { values } = this.state
        console.log(this.props)
        // console.log(event.target.name)

        this.setState({
          values: {...values, [event.target.name]: this.props.addressList[event.target.selectedIndex]}
        });
      }

    render() {
        const fields = [ 'from', 'to' ]
        const { addressList, routeRequest } = this.props
        const { values } = this.state
        const enabled = 'false'
        return (
            <div>
                <Form onSubmit={this.handleChange}>
                    {fields.map((id) => (
                        <React.Fragment key={id}>
                            <FormGroup>
                                <Input onClick={this.handleChange} type="select" name={id}> 
                                    {addressList &&
                                        addressList.map((item, index) => (
                                          <React.Fragment key={index}>
                                            <option>
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
                <Button onClick={() => {routeRequest(values)}}>Вызвать Такси</Button>  
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