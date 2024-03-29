import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ViewProducts, filteredProducts, ViewAllProducts } from '../store/actions/products';
import { useSelector } from 'react-redux'
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import tools from "../helpers/tools";
import "../styles/home.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Cart from '../components/Cart';

export default function Home(props) {
    const { onAdd, onRemove, cartItems,handleClearcart } = props
    const records = (useSelector((state) => state.products.response))
    const [SearchBy, setSearchBy] = useState("")
    const [name, setName] = useState("")
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(0)
    const [isExpire, setisExpire] = useState(false);
    const [isSearchclear, setIsSearchclear] = useState(false)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ViewAllProducts());
    }, [isSearchclear]);

    const onSubmit = (e) => {
        e.preventDefault()
        let searchByDate = SearchBy ? SearchBy : "null"
        const query = "?name=" + (name) + "&minPrice=" + minPrice + "&maxPrice=" + maxPrice + "&isExpire=" + isExpire + "&SearchBy=" + searchByDate
        console.log("query : ", query)
        debugger
        dispatch(ViewProducts(query));

    }
    const onClear = (e) => {
        setSearchBy("")
        setName("")
        setMinPrice(0)
        setMaxPrice(0)
        setisExpire(false)
        setIsSearchclear(!isSearchclear)
    }

    const handleSubmit = (e) => {

        if (e.target.checked) {
            setisExpire(true)
            setSearchBy("")
        }
        else {
            setisExpire(false)
            setSearchBy("")
        }

    }



    return (
        <div className='container'>
            <div className='row search-fields'>
                <h4 className='text-center'>Search by Category</h4>
                <div className='row'>
                <span className='col-sm-12 col-md-4 '>Item Name :<input type="text" className="form_field " value={name} onChange={(e) => setName(e.target.value)} /></span>
                <span className='col-sm-12 col-md-4 '>Min Price  :<input type="number" className="form_field " value={minPrice} onChange={(e) => setMinPrice(e.target.value)} /> </span>
                <span className='col-sm-12 col-md-4'>Max Price :<input type="number" className="form_field " value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} /></span>
                </div>
                <div className="form-group form-check ml_10">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="isExpire"
                        name="isExpire"
                        checked={isExpire}
                        onChange={(e) => handleSubmit(e)}
                    />
                    <label className="form-check-label" htmlFor="isExpire">
                        Please check it if you want to search only non Expired Products
                    </label>
                </div>

                <div>
                    Expiry Date :<DatePicker name="SearchBy" selected={SearchBy} onChange={(date) => setSearchBy(date)} disabled={isExpire ? true : false} />
                </div>

                <div className='row'>
                    <div className='col-md-10 col-sm-12'><button className='btn btn-secondary form_field' type="submit" onClick={(e) => onSubmit(e)} >Search </button></div>
                    <div className='col-md-2 col-sm-12 '><button className='btn_color' type="submit" onClick={(e) => onClear(e)} >View All Products </button></div>
                </div>
            </div>
            {records?.length === 0 && <div>no products by your search</div>}
            <div className='row'>
                {(records && records.length > 0) &&
                    <div className='col-md-8'>
                        <div className="d-flex flex-wrap productlist ">

                            {records?.map((item, index) => (
                                <div className="card cardstyle col-sm-11 col-md-3"  key={index}>
                                    <img src={item.image} className="card-img-top card-imagestyle" alt="product" />
                                    <div className="card-body">
                                        <p className="card-text">Product Name:{item.name} </p>
                                        <p className="card-text">Price:{item.Price} AED</p>
                                        <p className="card-text">Discount Price:{item.DiscountPrice} AED</p>
                                        {/**<p className="card-text">Is Expire ? :{item.isExpire===true?"yes":"No"}</p>**/}
                                        <p className="card-text">Expiry Date :{item.isExpire === false ? "No expiry" : (item.ExpiryDate != null || item.ExpiryDate !== "") ? tools.utcToLocal(item.ExpiryDate) : "no Expiry"}</p>
                                    </div>
                                    <div>
                                        <button className='btn btn-secondary form_field' onClick={() => onAdd(item)}>Add To Cart</button>
                                    </div>
                                </div>

                            ))}

                        </div>
                    </div>
                }
                <div className='col-md-4 cartsection'>
                    <Cart
                        cartItems={cartItems}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        handleClearcart={handleClearcart}
                    />
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
