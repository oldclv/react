import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addDelivery } from "../redux/actions/cart";

//import { uuid } from "uuidv4";
import { Form, Field, mutators } from "react-final-form";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

export default function Checkout() {
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    await dispatch(addDelivery(values));
    console.log(values.address.value.value);
  };

  return (
    <Form
      mutators={{
        setValue: ([address], state, utils) => {
          utils.changeValue(state, "address", () => address);
        },
      }}
      onSubmit={onSubmit}
      render={({ form: { mutators }, handleSubmit, values }) => (
        <div className="container">
          <div className="content">
            <div className="container container--cart">
              <h2 className="content__title-shipping">Доставка</h2>
              <div className="checkout__delivery">
                <form onSubmit={handleSubmit}>
                  <div className="form__row">
                    <div className="form__label">
                      <label htmlFor="">Имя</label>
                    </div>
                    <div className="form__input">
                      <Field
                        type="text"
                        name="fullname"
                        component="input"
                      />
                    </div>
                  </div>
                  <div className="form__row">
                    <div className="form__label">
                      <label htmlFor="">Номер телефона</label>
                    </div>
                    <div className="form__input">
                      <Field
                        type="text"
                        name="phone"
                        component="input"
                        placeholder="+7 999 999-99-99"
                      />
                    </div>
                  </div>
                  <div className="form__delivery">
                    <div className="form__delivery-label">
                      <label htmlFor="">Адрес доставки</label>
                    </div>
                    <div className="form__delivery-aff">
                      <Field name="address">
                        {(props) => (
                          <AddressSuggestions
                            name={props.input.name}
                            onChange={(event) =>
                              props.input.onChange({ value: event })
                            }
                            token="e18388c3aede179845c25bad4b1676f5740f7d0e"
                            onSelect={(suggestion) =>
                              mutators.setValue(suggestion)
                            }
                            query={
                              values[props.input.name] &&
                              values[props.input.name].value
                            }
                          />
                        )}
                      </Field>
                      <Field
                        name="comment"
                        component="textarea"
                        placeholder="Комментарий к заказу (например: ключ домофона, добавить/убрать/изменить ингредиенты)"
                      />
                    </div>
                  </div>
                  <div className="cart__bottom-buttons">
                    <Link
                      to="/cart"
                      className="button button--outline button--add go-back-btn"
                    >
                      <svg
                        width="8"
                        height="14"
                        viewBox="0 0 8 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 13L1 6.93015L6.86175 1"
                          stroke="#D3D3D3"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Вернуться назад</span>
                    </Link>
                    <input
                      className="button pay-btn"
                      type="submit"
                      value="Оформить сейчас"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
}
