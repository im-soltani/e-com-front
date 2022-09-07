import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listOrders, deleteOrder } from "../actions/orderActions";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";

function OrdersScreen({ setActive }) {
  const orderList = useSelector((state) => state.orderList);
  const { loading, orders, error } = orderList;

  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = orderDelete;

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, [successDelete]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  };
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="content content-margined">
      <div
        className="order-header"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px 48px",
          borderBottom: "1px solid #eee",
        }}
      >
        <h3 style={{ fontWeight: 600 }}>Orders</h3>
      </div>
      <div
        className="order-list"
        style={{ margin: "16px 48px 0 48px", border: "1px solid #eee" }}
      >
        <table className="table">
          <thead>
            <tr>
              <th>N°</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>DELIVERED</th>
              <th>DELIVERED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>
                    {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </td>
                  <td>{order.totalPrice} DT</td>
                  <td>{order.user.name}</td>
                  <td>{order.isPaid.toString()}</td>
                  <td>
                    {order.paidAt
                      ? moment(order.paidAt).format("MMMM Do YYYY, h:mm:ss a")
                      : ""}
                  </td>
                  <td>{order.isDelivered.toString()}</td>
                  <td>
                    {order.deliveredAt
                      ? moment(order.deliveredAt).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )
                      : ""}
                  </td>
                  <td>
                    <IconButton
                      style={{ color: "green", outline: "none" }}
                      aria-label="visibility"
                      onClick={() => {
                        history.push("/order/" + order._id);
                        setActive("");
                      }}
                    >
                      <Visibility style={{ fontSize: "20px" }} />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      style={{ outline: "none" }}
                      aria-label="delete"
                      onClick={() => deleteHandler(order)}
                    >
                      <DeleteIcon style={{ fontSize: "20px" }} />
                    </IconButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {error && (
        <div style={{ margin: "16px 48px ", color: "red" }}>{error}</div>
      )}
    </div>
  );
}
export default OrdersScreen;
