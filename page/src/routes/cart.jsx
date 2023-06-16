import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

/**
 *
 * @param { {index: number, order: {
 *          Order_id: string,
 *          Item: string,
 *          Product_id: number,
 *          Color: string,
 *          Size: string,
 *          Category: string,
 *          Quantity: number,
 *          Price: number,  
 *      }, deleteWishCar: (args: number) => Promise<void> }} param0
 * @returns
 */
const OrderItems = ({ index, order, deleteWishCar,bulidorderlist }) => {
    const [colors, setColors] = useState([null]);
    const [sizes, setSizes] = useState([null]);
    const [orderInfo, setOrderInfo] = useState(order);

    const getItemInfo = async () => {
        try {
            const [colorInfo, sizeInfo] = await Promise.all([
                axios.get(`${baseUrl}/cart/color`, {
                    params: { Product_id: order.Product_id },
                    headers: { Authorization: localStorage.getItem("auth") },
                }),
                axios.get(`${baseUrl}/product/size`, {
                    params: { Product_id: order.Product_id },
                    headers: { Authorization: localStorage.getItem("auth") },
                }),
            ]);
            setColors(["", ...colorInfo.data]);
            setSizes(["", ...sizeInfo.data]);
        } catch (err) {
            alert(err.response.data.error || "ERROR");
        }
    };

    const updateWishCar = async (updates) => {
        try {
            await axios.put(
                `${baseUrl}/cart`,
                { ...orderInfo, ...updates },
                { headers: { Authorization: localStorage.getItem("auth") } }
            );
            setOrderInfo({ ...orderInfo, ...updates });
        } catch (err) {
            alert(err.response.data.error || "ERROR");
        }
    };

    useEffect(() => {
        getItemInfo();
    }, []);

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{order.Item}</td>
            <td>
                {order.Product_id}
            </td>
            <td>
                <select onChange={(e) => updateWishCar({ Color: e.target.value })} value={orderInfo.Color || ""}>
                    {colors.map((item, index) => (
                        <option key={index}>{item}</option>
                    ))}
                </select>
            </td>
            <td>
                <select onChange={(e) => updateWishCar({ Size: e.target.value })} value={orderInfo.Size || ""}>
                    {sizes.map((item, index) => (
                        <option key={index}>{item}</option>
                    ))}
                </select>
            </td>
            <td>{order.Quantity}</td>
            <td>{order.Price}</td>
            <td>
                <a onClick={() => deleteWishCar(order.Product_id)}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                        width="25"
                        height="30"
                        alt="Delete"
                        title="刪除商品"
                    />
                </a>
            </td>
        </tr>
    );
};

const Cart = () => {
    const [order, setOrder] = useState([]);
    const [shopBar, setShopBar] = useState(false);
    const navigate = useNavigate();

    const getOrder = async () => {
        try {
            const data = await axios.get(`${baseUrl}/cart`, {
                headers: { Authorization: localStorage.getItem("auth") },
            });
            console.log(data);
            setOrder(data.data);
        } catch (err) {
            console.error(err);
            alert(err?.response?.error || "ERROR");
        }
    };

    const deleteWishCar = async (Product_id) => {
        await axios.delete(`${baseUrl}/cart`, {
            params: { Product_id },
            headers: { Authorization: localStorage.getItem("auth") },
        });
        alert("Product Deleted");
        await getOrder();
    };
    const bulidorderlist = async () => {
        try {
            await axios.post(
                `${baseUrl}/history`,
                {
                    Order_id: null,
                    Total_price,
                },
                { headers: { Authorization: localStorage.getItem("auth") } }
            );
            alert("Success");
            
            // console.log("total price", order.Price * order.quantity);
            // console.log("product_id",order.product_id );
    
            // const requestBody = {
            //   Order_id,      
            //   Total_price: order.Price,
            // };
    
            // await axios.post(`${baseUrl}/history`, requestBody, {
            //   headers: { Authorization: localStorage.getItem("auth") },
            // });
            // alert("orderlist Success");
            
        } catch (err) {
            alert(err?.response?.data?.error || "ERROR");
        }
      };

    useEffect(() => {
        getOrder();
    }, []);

    return (
        <>
            <header className="bg-dark py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">Shop in style</h1>
                        <p className="lead fw-normal text-white-50 mb-0">With this shop hompeage template</p>
                    </div>
                </div>
            </header>

            <main>
                <table>
                    <thead>
                        <tr>
                            <th>編號</th>
                            <th>商品名稱</th>
                            <th>Product_ID</th>
                            <th>顏色</th>
                            <th>尺寸</th>
                            <th>數量</th>
                            <th>價格</th>
                            <th>刪除</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((item, index) => (
                            <OrderItems order={item} key={index} index={index} deleteWishCar={deleteWishCar} bulidorderlist={bulidorderlist} />
                        ))}
                    </tbody>
                </table>
                {order.map((item, index) => (
                <button className="btn btn-outline-dark" type="submit"key={index} onClick={() => {
                                            bulidorderlist(item.price);
                                        }}>
                    確認結帳
                </button>
                  ))}
            </main>
        </>
    );
};
export default Cart;