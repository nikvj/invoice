
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import "./css/form.css";
import axios from "axios";

export default function Login() {
  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = () => {
    reset();
  };

  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/login", {
        email: email,
        password: password,
      })
      .then((result) => {
        if (result.data.loginStatus === true) {
           localStorage.setItem("token", result.data.token);
        navigate("/dashboard");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("server error");
      });
  };

  return (
    <div className="form-demo">
      <div className="flex justify-content-center">
        <div className="card">
          <h2 className="text-center">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="field">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required.",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address. E.g. example@email.com",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  )}
                />
                <label
                  htmlFor="email"
                  className={classNames({ "p-error": !!errors.email })}
                >
                  Email
                </label>
              </span>
            </div>
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Password is required." }}
                  render={({ field, fieldState }) => (
                    <Password
                      id={field.name}
                      {...field}
                      toggleMask
                      feedback={false}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  )}
                />
                <label
                  htmlFor="password"
                  className={classNames({ "p-error": errors.password })}
                >
                  Password
                </label>
              </span>
            </div>

            <Button
              type="submit"
              label="Submit"
              className="mt-2"
              onClick={handleClick}
            />
            <p>
              {" "}
              Not registered yet? <a href="/sign-up">SignUp Here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
