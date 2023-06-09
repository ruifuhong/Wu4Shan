import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

/**
 *
 * @param { {index: number, order: {
 *          Product_id: number,
 *          Color: string,
 *          Size: string,
 *          Product_name: string,
 *          Price: number,
 *          Image: string
 *      }, deleteWishCar: (args: number) => Promise<void> }} param0
 * @returns
 */
const OrderItems = ({ index, order, deleteWishCar }) => {
    const [colors, setColors] = useState([null]);
    const [sizes, setSizes] = useState([null]);
    const [orderInfo, setOrderInfo] = useState(order);
    const currentPath = window.location.pathname;

    const getItemInfo = async () => {
        try {
            const [colorInfo, sizeInfo] = await Promise.all([
                axios.get(`${baseUrl}/product/color`, {
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
            window.location.href = "/not_login";
            alert(err.response.data.error || "ERROR");
        }
    };

    const generateRandomString = (length) => {
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let randomString = "";
    
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomString += characters.charAt(randomIndex);
        }
    
        return randomString;
      };
    
    const addProduct = async () => {
        const randomString = generateRandomString(20);
        try {

          const requestBody = {
            Item: order.Product_name,
            Product_id:  order.Product_id,
            Color: orderInfo.Color,
            Size: orderInfo.Size ,
            Category: order.Category,
            Quantity: 1,
            Price: order.Price
          };
          await axios.post(`${baseUrl}/putcart`, requestBody, {
            headers: { Authorization: localStorage.getItem("auth") },
          });
          alert("已加入至購物車");
        } catch (err) {
            console.log(err); 
            console.log(err.response); 
            console.log(err.response.data); 
            console.log(err?.response?.data?.error);
          alert(err?.response?.data?.error || "ERROR");
        }
    };

    const extractProductId = () => {
        const pathParts = currentPath.split("/");
        const extractedProductId = pathParts[pathParts.length - 1];
        return extractedProductId;
      };

    const updateWishCar = async (updates) => {
        try {
            await axios.put(
                `${baseUrl}/wish`,
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
            <td>{order.Product_name}</td>
            <td>
                <img src={order.Image} />
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
            <td>{order.Price}</td>
            <td><p   onClick={addProduct}
            style={{ cursor: "pointer", margin: 0, padding: 0 }}>+</p></td>
            <td>
                <a style={{ cursor: "pointer" }} onClick={() => deleteWishCar(order.Product_id)}>
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

const Order = () => {
    const [order, setOrder] = useState([]);
    const [shopBar, setShopBar] = useState(false);
    const navigate = useNavigate();

    const getOrder = async () => {
        try {
            const data = await axios.get(`${baseUrl}/wish`, {
                headers: { Authorization: localStorage.getItem("auth") },
            });
            setOrder(data.data);
        } catch (err) {
            window.location.href = "/not_login";
            console.error(err);
            alert(err?.response?.error || "購物車沒有商品");
        }
    };

    const deleteWishCar = async (Product_id) => {
        await axios.delete(`${baseUrl}/wish`, {
            params: { Product_id },
            headers: { Authorization: localStorage.getItem("auth") },
        });
        alert("商品已刪除");
        await getOrder();
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
                            <th>商品照片</th>
                            <th>顏色</th>
                            <th>尺寸</th>
                            <th>價格</th>
                            <th>加入購物車</th>
                            <th>刪除</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((item, index) => (
                            <OrderItems order={item} key={index} index={index} deleteWishCar={deleteWishCar} />
                        ))}
                    </tbody>
                </table>
            </main>
        </>
    );
};
export default Order;
