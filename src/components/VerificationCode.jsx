"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import ButtonMain from "./ButtonMain";
import ButtonTertiary from "./ButtonTertiary";

const VerificationCode = ({ email, onBack }) => {
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const router = useRouter(); 

  const validateCode = () => {
    const newErrors = {};
    if (!code.trim()) {
      newErrors.code = "El código de verificación es requerido";
    } else if (code.length !== 6) {
      newErrors.code = "El código debe tener 6 dígitos";
    } else if (!/^\d{6}$/.test(code)) {
      newErrors.code = "El código solo debe contener números";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateCode();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setShowErrors(true);
      setAnimateOut(false);
      return;
    }

    // Limpiar errores y redirigir
    setAnimateOut(true);
    setTimeout(() => {
      setShowErrors(false);
      setErrors({});
      // Redirigir a la página de nueva contraseña
      router.push("/newpassword");
    }, 300);
  };

  return (
    <div className="rounded-2xl p-6 lg:p-8 w-96 lg:w-[480px] xl:w-[520px]">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl text-start font-semibold text-white mb-2">
          Verificación de Código
        </h1>
        <p className="text-white text-start">
          Para proteger tu cuenta ingresa el código de 6 dígitos que acabamos de
          enviar a tu correo.
        </p>
        <p className="text-sm text-start text-gray-300 mt-2">
          Código enviado a: <span className="font-semibold">{email}</span>
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form__group">
          <input
            type="text"
            id="code"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="form__field"
            placeholder="Código de verificación"
            autoComplete="off"
            maxLength={6}
          />
          <label htmlFor="code" className="form__label">
            Código de verificación
          </label>
        </div>

        {/* Error notifications con animación */}
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
                    Hay errores en el formulario
                  </h3>
                  <div className="error-prompt-wrap">
                    {errors.code && <p>{errors.code}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Botones lado a lado */}
        <div className="flex gap-4 mt-6">
          <ButtonTertiary 
            type="button" 
            onClick={onBack} 
            className="flex-1"
          >
            Volver
          </ButtonTertiary>

          <ButtonMain 
            type="submit" 
            className="flex-1"
          >
            Continuar
          </ButtonMain>
        </div>
      </form>

      <p className="mt-4 text-sm text-gray-300 text-center">
        ¿No recibiste el código?{" "}
        <button className="text-purple-400 hover:underline">
          Reenviar
        </button>
      </p>
    </div>
  );
};

export default VerificationCode;