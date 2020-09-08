import React, { useState } from "react";
import { AddressSuggestions } from "react-dadata";
import { useSelector, useDispatch } from "react-redux";
import { addDelivery } from "../redux/actions/cart";
//import { uuid } from "uuidv4";
import "react-dadata/dist/react-dadata.css";

import { Link } from "react-router-dom";

export default function Checkout() {
  const dispatch = useDispatch();
  const { delivery } = useSelector(({ cart }) => cart);

  const [state, setState] = useState({
    fullname: "",
    phone: "",
    address: "",
    comment: "",
  });

  const setAddress = (value) => {
    setState({
      ...state,
      address: value.value,
    });
    console.log(value.value);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDelivery(state));

    console.log({
      fullname: state.fullname,
      phone: state.phone,
      comment: state.comment,
      address: state.address,
    });
  };

  return (
    <div className="container">
      <div className="content">
        <div className="container container--cart">
          <h2 className="content__title-shipping">Доставка</h2>
          <div className="checkout__delivery">
            <form onSubmit={handleSubmit}>
              <div className="form">
                <div className="form__row">
                  <div className="form__label">
                    <label htmlFor="">Имя</label>
                  </div>
                  <div className="form__input">
                    <input
                      type="text"
                      placeholder="Введите свое имя"
                      name="fullname"
                      value={state.fullname}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form__row">
                  <div className="form__label">
                    <label htmlFor="">Телефон</label>
                  </div>
                  <div className="form__input">
                    <input
                      type="text"
                      placeholder="Введите свой номер телефона"
                      name="phone"
                      value={state.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form__delivery">
                  <div className="form__delivery-label">
                    <label htmlFor="">Адрес доставки</label>
                  </div>
                  <div className="form__delivery-aff">
                    <AddressSuggestions
                      token="e18388c3aede179845c25bad4b1676f5740f7d0e"
                      name="address"
                      value={state.address || ""}
                      onChange={setAddress}
                    />
                    <textarea
                      type="textArea"
                      placeholder="Комментарий к заказу (например: ключ домофона, добавить/убрать/изменить ингредиенты)"
                      name="comment"
                      value={state.comment}
                      onChange={handleChange}
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
