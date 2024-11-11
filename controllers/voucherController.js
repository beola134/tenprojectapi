const voucher = require("../models/voucher");

//thêm voucher
const addVoucher = async (req, res) => {
  const { ma_voucher, gia_tri, bat_dau, ket_thuc, mo_ta } = req.body;

  try {
    const newVoucher = await voucher.create({
      ma_voucher,
      gia_tri,
      bat_dau,
      ket_thuc,
      mo_ta,
    });

    res.status(201).json(newVoucher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addVoucher,
};
"use client";
import { useEffect, useState } from "react";
import styles from "./thanhtoan.module.css";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

export default function ThanhToan() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [discountType, setDiscountType] = useState(""); // New state to store discount type
  const [note, setNote] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false); // New state to track if discount is applied

  // Lấy thông tin người dùng từ token
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (token) {
      try {
        const { _id } = jwtDecode(token);
        fetchUserDetails(_id);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  // Lấy thông tin người dùng từ server
  const fetchUserDetails = async (_id) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${_id}`);
      if (!response.ok) {
        throw new Error("Lỗi lấy thông tin người dùng");
      }
      const data = await response.json();
      setUser(data.user);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Lấy thông tin giỏ hàng từ localStorage
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCartItems = cartItems.map((item) => ({
      ...item,
      so_luong: item.so_luong ?? 1,
    }));
    setCartItems(cartItems);
    calculateTotal(updatedCartItems);
  }, []);
  // Tính tổng tiền
  const calculateTotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.so_luong * (item.gia_giam > 0 ? item.gia_giam : item.gia_san_pham),
      0
    );
    let finalTotal = total;
    if (discountType === "gia_tri") {
      finalTotal -= discountValue;
    } else if (discountType === "phan_tram") {
      finalTotal -= (total * discountValue) / 100;
    }
    setTotalAmount(finalTotal);
  };
  // Tăng giảm số lượng sản phẩm
  const handleIncrease = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].so_luong += 1;
    setCartItems(updatedCartItems);
    calculateTotal(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleDecrease = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].so_luong > 1) {
      updatedCartItems[index].so_luong -= 1;
      setCartItems(updatedCartItems);
      calculateTotal(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };
  // Xóa sản phẩm khỏi giỏ hàng
  const handleDelete = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    calculateTotal(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  // Tạo đơn hàng và kiểm tra xem có đăng nhập không
  const userLogin = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Cảnh báo",
        text: "Vui lòng đăng nhập để tiếp tục thanh toán",
      }).then(() => {
        window.location.href = "/components/login?redirect=thanhtoan";
      });
      return;
    }
    // kiểm tra
    const orderDetails = {
      dia_chi: user.dia_chi,
      id_nguoi_dung: user._id,
      id_phuong_thuc_thanh_toan: selectedPaymentMethod,
      ghi_chu: note,
      chi_tiet_don_hang: cartItems.map((item) => ({
        id_san_pham: item._id,
        so_luong: item.so_luong,
      })),
      ma_voucher: discountCode || null,
    };

    try {
      const response = await fetch("http://localhost:5000/donhang/donhang", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });
      if (!response.ok) {
        throw new Error("Lỗi tạo đơn hàng");
      }
      const data = await response.json();
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: data.message,
      });
      localStorage.setItem("cartItems", JSON.stringify([]));
      setCartItems([]);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Lỗi tạo đơn hàng",
      });
    }
  };

  const applyDiscount = async () => {
    if (isDiscountApplied) return; // Prevent applying discount multiple times

    try {
      const response = await fetch(`http://localhost:5000/voucher/ma_voucher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ma_voucher: discountCode }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Mã giảm giá không hợp lệ hoặc đã hết hạn");
      }
      const data = await response.json();
      if (data.gia_tri) {
        setDiscountValue(data.gia_tri);
        setDiscountType("gia_tri");
      } else if (data.phan_tram) {
        setDiscountValue(data.phan_tram);
        setDiscountType("phan_tram");
      }
      calculateTotal(cartItems);
      setIsDiscountApplied(true); // Set discount as applied
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: error.message,
      });
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.checkoutContainer}>
          <div className={styles.checkoutLeft}>
            <div className={`${styles.box} ${styles.customerInfo}`}>
              <p className={styles.productTitle}>Thông tin khách hàng</p>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="Email"
                  value={user ? user.email : ""}
                  readOnly
                />
                <input
                  type="text"
                  placeholder="Điện thoại"
                  value={user ? user.dien_thoai : ""}
                  readOnly
                />
              </div>
            </div>

            <div className={`${styles.box} ${styles.shippingPaymentInfo}`}>
              <p className={styles.productTitle}>Địa chỉ giao hàng</p>
              <input
                type="text"
                placeholder="Họ và tên"
                value={user ? user.ho_ten : ""}
                readOnly
              />
              <input
                type="text"
                placeholder="Địa chỉ"
                value={user ? user.dia_chi : ""}
                readOnly
              />
              <textarea
                className={styles.textarea}
                placeholder="Ghi chú"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
              <div className={styles.paymentMethods}>
                <p className={styles.productTitle}>Phương thức thanh toán </p>
                <div className={styles.paymentOptions}>
                  <button
                    className={`${styles.paymentOption} ${
                      selectedPaymentMethod === 1 ? styles.selected : ""
                    }`}
                    onClick={() => setSelectedPaymentMethod(1)}
                  >
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSjgeVcZ4-Ce-KW8KlVF1JN88mRv1moJbpUg&s"
                      alt="Thanh toán khi nhận hàng"
                    />
                    <span>Thanh toán khi nhận hàng</span>
                  </button>
                  <button
                    className={`${styles.paymentOption} ${
                      selectedPaymentMethod === 2 ? styles.selected : ""
                    }`}
                    onClick={() => setSelectedPaymentMethod(2)}
                  >
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGxsoe7iPccCnGraliGFCLCvbg3bO3PDtELQ&s"
                      alt="Thanh toán bằng tài khoản ngân hàng"
                    />
                    <span>Thanh toán bằng tài khoản ngân hàng</span>
                  </button>
                  <button
                    className={`${styles.paymentOption} ${
                      selectedPaymentMethod === 3 ? styles.selected : ""
                    }`}
                    onClick={() => setSelectedPaymentMethod(3)}
                  >
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s"
                      alt="Thanh toán bằng VNPay"
                    />
                    <span>Thanh toán bằng VNPay</span>
                  </button>
                  <button
                    className={`${styles.paymentOption} ${
                      selectedPaymentMethod === 4 ? styles.selected : ""
                    }`}
                    onClick={() => setSelectedPaymentMethod(4)}
                  >
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmzB5_qUPLtN4E3LuVFxMvy92q1Vo10N_m2Q&s"
                      alt="Thanh toán ví điện tử Momo"
                    />
                    <span>Thanh toán ví điện tử Momo</span>
                  </button>
                </div>
              </div>
            </div>
            {cartItems.map((item, index) => (
              <div
                className={`${styles.box} ${styles.productCard}`}
                key={item._id}
              >
                <div className={styles.productInfo}>
                  <div className={styles.productLeft}>
                    <p className={styles.productTitle}>Sản phẩm mua</p>
                    <div className={styles.productImage}>
                      <img
                        src={`http://localhost:5000/images/${item.hinh_anh}`}
                        alt={item.ten_san_pham}
                      />
                    </div>
                  </div>

                  <div
                    style={{ margin: "20px" }}
                    className={styles.productDetails}
                  >
                    <p className={styles.productName}>{item.ten_san_pham}</p>
                    <p className={styles.productModel}>{item.loai}</p>
                    <p className={styles.productCode}>{item.ma_san_pham}</p>
                    <p className={styles.productSize}>
                      Đường kính: {item.duong_kinh}
                    </p>
                  </div>
                </div>
                <div className={styles.productActions}>
                  <div className={styles.quantityPrice}>
                    <div className={styles.quantity}>
                      <button
                        onClick={() => handleDecrease(index)}
                        className={styles.quantityBtn}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={item.so_luong}
                        readOnly
                        className={styles.quantityInput}
                      />
                      <button
                        onClick={() => handleIncrease(index)}
                        className={styles.quantityBtn}
                      >
                        +
                      </button>
                    </div>
                    <p className={styles.productPrice}>
                    {(item.gia_giam > 0 ? item.gia_giam : item.gia_san_pham).toLocaleString("vi-VN")}₫ 
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(index)}
                    className={styles.deleteBtn}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className={styles.cartSummary}>
            <div className={styles.discountCode}>
              <input
                type="text"
                placeholder="Nhập mã..."
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                disabled={isDiscountApplied} // Disable input if discount is applied
              />
              <button onClick={applyDiscount} disabled={isDiscountApplied}>Áp dụng</button>
              <hr />
            </div>
            <div className={styles.orderSummary}>
              <p>
                Tổng tiền hàng:{" "}
                <span className={styles.price}>
                  {cartItems
                    .reduce(
                      (sum, item) => sum + item.so_luong * (item.gia_giam > 0 ? item.gia_giam : item.gia_san_pham),
                      0
                    )
                    .toLocaleString("vi-VN")}
                  ₫
                </span>
              </p>
              <p>
                Ưu đãi:{" "}
                <span className={styles.price}>
                  {discountType === "phan_tram"
                    ? `-${discountValue}%`
                    : `-${discountValue.toLocaleString("vi-VN")}₫`}
                </span>
              </p>
              <p className={styles.totalAmount}>
                Tổng thanh toán:{" "}
                <span className={styles.price}>
                  {(
                    totalAmount -
                    (discountType === "phan_tram"
                      ? (totalAmount * discountValue) / 100
                      : discountValue)
                  ).toLocaleString("vi-VN")}
                  ₫
                </span>{" "}
              </p>
            </div>
            <button className={styles.checkoutButton} onClick={userLogin}>
              Thanh toán
            </button>
          </aside>
        </div>
      </div>
    </>
  );
}

//////////////////////////////////////////////////////////////////////////////////////////
"use client";
import { useMemo } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./giohang.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  removeFromCart,
  updateCartItemQuantity,
  setCartItems,
} from "../redux/slices/cartSilce";
import Link from "next/link";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart?.items) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedItems = localStorage.getItem("cartItems");
      if (savedItems) {
        dispatch(setCartItems(JSON.parse(savedItems)));
      }
    }
  }, [dispatch]);

  const total = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + (item.gia_giam > 0 ? item.gia_giam : item.gia_san_pham) * item.so_luong,
        0
      ),
    [cartItems]
  );
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.container}>
          <div className={styles.content}>
            {cartItems.length === 0 ? (
              <div>
                <img
                  src="/image/item/cart-empty(1)"
                  alt="Giỏ hàng trống"
                  style={{
                    width: "350px",
                    marginLeft: "220px",
                  }}
                />
                <div className={styles.mh}>
                  <p style={{ fontSize: "22px", marginBottom: "5px" }}>
                    Giỏ hàng đang trống
                  </p>

                  <p style={{ fontSize: "14px", marginBottom: "5px" }}>
                    Về cửa hàng để lấp đầu giỏ
                  </p>
                  <Link href={"/"}>
                    {" "}
                    <button className={styles.Btn}></button>
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <h2>Giỏ hàng</h2>
                <table className={styles.carttable}>
                  <thead>
                    <tr>
                      <th colSpan="2" className={styles.sp}>
                        Sản phẩm
                      </th>
                      <th>Số lượng</th>
                      <th>Giá</th>
                      <th>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <img
                            src={`http://localhost:5000/images/${item.hinh_anh}`}
                            alt=""
                            width="100px"
                          />
                        </td>
                        <td>{item.ten_san_pham}</td>
                        <td>
                          <div className={styles.quantitycontrol}>
                            <button
                              className={styles.decreasebtn}
                              onClick={() => {
                                if (item.so_luong > 1) {
                                  dispatch(
                                    updateCartItemQuantity({
                                      _id: item._id,
                                      so_luong: item.so_luong - 1,
                                    })
                                  );
                                }
                              }}>
                              -
                            </button>
                            <input
                              min="1"
                              value={item.so_luong}
                              className={styles.quantity}
                              readonly
                            />
                            <button
                              className={styles.increasebtn}
                              onClick={() =>
                                dispatch(
                                  updateCartItemQuantity({
                                    _id: item._id,
                                    so_luong: item.so_luong + 1,
                                  })
                                )
                              }>
                              +
                            </button>
                          </div>
                        </td>
                        <td>
                        {(item.gia_giam > 0 ? item.gia_giam : item.gia_san_pham).toLocaleString(
                          "vi-VN",
                          {
                            style: "currency",
                            currency: "VND",
                          }
                        )}
                      </td>
                      <td>
                      {(
                        (item.gia_giam > 0 ? item.gia_giam : item.gia_san_pham) * item.so_luong
                      ).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                        <td name="delete">
                          <button
                            style={{ border: "none", cursor: "pointer" }}
                            onClick={() => dispatch(removeFromCart(item._id))}>
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{
                                fontSize: "18px",
                                border: "none",
                                color: "red",
                              }}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {cartItems.length > 0 && (
              <div>
                <br />
                <hr />
                <div className={styles.total}>
                  <div className={styles.tt}>
                    <p>Tổng tiền hàng:</p>
                    <p>
                      {total.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                </div>
                <Link href="/components/thanhtoan">
                  <button type="button" id={styles.thtt}>
                    Tiến hành thanh toán
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
export default CartPage;
