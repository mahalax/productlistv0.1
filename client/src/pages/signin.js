import React, { useState } from "react";
import tools from "../helpers/tools"
import "../styles/formstyle.css"
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { signin } from '../store/actions/auth';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Signin = () => {
    let history = useHistory()
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const [formSubmit, setFormSubmit] = useState(false)
    const [fields, setFields] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({
        email: {
            error: "",
            isReq: "Email is required!",
            isValid: "Please enter a valid email address",
        },
        password: {
            error: "",
            isReq: "Password is required!",
            minReq: "Password must be at least 6 characters",
        },
    })

    const signinUser = () => {
        setIsLoading(true)
        dispatch(signin(fields, history));
        setIsLoading(false)

    };

    // validation
    const validateField = (name, value) => {
        let isValid = true;
        if (errors.hasOwnProperty(name)) {
            if (!value) {
                errors[name].error = errors[name].isReq;
                isValid = false
            } else {
                errors[name].error = "";
            }
        }

        // unique validation
        if (name === "email") {
            if (tools.ValidateEmail(value) === false) {
                errors[name].error = errors[name].isValid;
                isValid = false
            }
        } else if (name === "password" && value !== "") {
            if (value.length < 6) {
                errors[name].error = errors[name].minReq;
                isValid = false
            }
        }
        setErrors(errors)
        return isValid
    };

    const validateForm = () => {
        let isValid = true;
        for (var key of Object.keys(errors)) {
            if (fields[key] === "" || fields[key] === null) {
                errors[key].error = errors[key].isReq;
                isValid = false;
            }
        }

        // unique validation
        let email = fields["email"];
        let password = fields["password"];
        if (email !== "") {
            if (tools.ValidateEmail(email) === false) {
                errors["email"].error = errors["email"].isValid;
                isValid = false;
            }
        }
        if (password !== "") {
            if (password.length < 6) {
                errors["password"].error = errors["password"].minReq;
                isValid = false;
            }
        }

        setErrors(errors)
        return isValid;
    }

    // event
    const handleOnChange = (event) => {
        const { name, value } = event.target;
        var inputValue = value;


        setFields({
            ...fields,
            [name]: value,
        });
        validateField(name, inputValue);


    };

    // rest services
    const onSubmit = (e) => {
        e.preventDefault()
        setFormSubmit(true)
        let isValid = validateForm();
        if (isValid) {
            signinUser()
        }
    }

    return (

        <div className="Container-fluid container-table">
            <div className="col-sm-12 col-md-6 vertical-center-row">
                <form className="signInForm ">
                    <h3>Sign In</h3>
                    <div className="col-sm-12 col-md-8 Form_center">
                        <div className="m-2 p-1">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                value={fields.email}
                                onChange={handleOnChange}
                            />

                            {errors.email.error !== "" && formSubmit && (
                                <span className="rt-sign-err">{errors.email.error}</span>
                            )}

                        </div>

                        <div className="m-2 p-1">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="password"
                                value={fields.password}
                                onChange={handleOnChange}
                            />


                            {errors.password.error !== "" && formSubmit && (
                                <span className="rt-sign-err">{errors.password.error}</span>
                            )}
                        </div>

                        <div className="btn_align">
                            <button
                                type="button"
                                className=" btn_color"
                                onClick={(e) => onSubmit(e)}
                                disabled={isLoading}
                            >
                                {!isLoading ? "Sign In" : "Processing..."}
                            </button>
                        </div>
                        <Link to="/register" className="linkto">
                            New User?  <span>Sign up</span> now.
                        </Link>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );

}
export default Signin;
