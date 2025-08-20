"use client";

import { useState } from "react";
import Link from "next/link";
import ButtonMain from "./ButtonMain";
import ButtonSecondary from "./ButtonSecondary";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  general?: string;
  password?: string;
}

const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [animateOut, setAnimateOut] = useState<boolean>(false);

  const VALID_EMAIL = "fasttraining@gmail.com";
  const VALID_PASSWORD = "123456";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim() && !formData.password.trim()) {
      newErrors.general = "Completa los campos para ingresar";
      return newErrors;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Completa el campo del correo electrónico para continuar";
      return newErrors;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Completa el campo de la contraseña para continuar";
      return newErrors;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Ingresa un correo electrónico válido";
      return newErrors;
    }

    if (formData.email !== VALID_EMAIL) {
      newErrors.email = "Correo no registrado";
      return newErrors;
    }

    if (formData.password !== VALID_PASSWORD) {
      newErrors.password = "Contraseña incorrecta";
      return newErrors;
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setShowErrors(true);
      setAnimateOut(false);
      return;
    }
    console.log("Login exitoso:", formData);
    
    setAnimateOut(true);
    setTimeout(() => {
      setShowErrors(false);
      setErrors({});
    }, 300);
  };

  const handleGoogleLogin = () => {
    console.log("Google login");
  };

  return (
    <div className="rounded-2xl p-6 lg:p-8 w-96 lg:w-[480px] xl:w-[520px]">
      <div className="text-center mb-8">
        <h1 className="text-3xl text-start font-semibold text-white mb-2">
          ¡Hola!
        </h1>
        <p className="text-white text-start">¡Bienvenido de nuevo!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form__group">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form__field"
            placeholder="Ingresa tu correo electrónico"
            autoComplete="off"
          />

          <label htmlFor="email" className="form__label">
            Ingresa tu correo electrónico
          </label>
        </div>

        <div className="form__group">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form__field"
            placeholder="Contraseña"
            autoComplete="new-password"
          />

          <label htmlFor="password" className="form__label">
            Contraseña
          </label>
        </div>

        {Object.keys(errors).length > 0 && (
          <div className="notifications-container">
            <div className={`error-alert ${showErrors ? "show" : ""} ${animateOut ? "fadeOut" : ""}`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="error-svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="error-prompt-container">
                  <h3 className="error-prompt-heading">
                    {errors.general ? "Error de validación" : "Hay errores en el formulario"}
                  </h3>
                  <div className="error-prompt-wrap">
                    {errors.general && <p>{errors.general}</p>}
                    {errors.email && <p>{errors.email}</p>}
                    {errors.password && <p>{errors.password}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-right mt-3">
          <Link
            href="/recoverpassword"
            className="text-sm text-white hover:text-[#38caef] transition-colors duration-300"
          >
            ¿Recuperar contraseña?
          </Link>
        </div>

        <div className="w-full mx-auto mt-10">
          <ButtonMain type="submit">Inicia Sesión</ButtonMain>
        </div>

        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-white"></div>
          <span className="px-4 text-sm text-white">O continúa con</span>
          <div className="flex-1 border-t border-white"></div>
        </div>

        <ButtonSecondary
          label={
            <div className="flex items-center space-x-2">
              <GoogleIcon />
              <span>Google</span>
            </div>
          }
          onClick={handleGoogleLogin}
          className=""
        />
      </form>
    </div>
  );
};

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M20.66 10.2c.096 0 .179.067.195.161c.094.526.145 1.092.145 1.639a8.97 8.97 0 0 1-2.293 6.001a.197.197 0 0 1-.274.018l-2.445-2.07a.206.206 0 0 1-.016-.297a5.4 5.4 0 0 0 1.114-1.852H12.2a.2.2 0 0 1-.2-.2v-3.2c0-.11.09-.2.2-.2zm-6.187 6.6a.21.21 0 0 1 .226.024l2.568 2.173a.196.196 0 0 1-.01.309A8.96 8.96 0 0 1 12 21a9 9 0 0 1-7.548-4.097a.197.197 0 0 1 .046-.263l2.545-1.962a.207.207 0 0 1 .303.062a5.4 5.4 0 0 0 7.127 2.06M6.68 12.926a.2.2 0 0 1-.076.197L3.869 15.23a.196.196 0 0 1-.304-.084A9 9 0 0 1 3 12c0-1.152.217-2.254.612-3.267a.196.196 0 0 1 .299-.085l2.732 2.004c.065.047.095.13.078.208a5.4 5.4 0 0 0-.042 2.066m.468-3.765c.096.07.231.042.295-.058A5.4 5.4 0 0 1 12 6.6a5.37 5.37 0 0 1 3.44 1.245a.205.205 0 0 0 .276-.01l2.266-2.267a.197.197 0 0 0-.007-.286A8.95 8.95 0 0 0 12 3a8.99 8.99 0 0 0-7.484 4a.197.197 0 0 0 .049.267z"
    />
  </svg>
);

export default LoginForm;