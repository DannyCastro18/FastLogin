"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ButtonMain from "./ButtonMain";
import ButtonTertiary from "./ButtonTertiary";

const NewPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [animateOutSuccess, setAnimateOutSuccess] = useState(false);
  const router = useRouter();

  // 👉 Si aparece el success, ocultamos/cancelamos cualquier error activo
  useEffect(() => {
    if (showSuccess) {
      setErrors({});
      setShowErrors(false);
      setAnimateOut(false);
    }
  }, [showSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.newPassword.trim() && !formData.confirmPassword.trim()) {
      newErrors.general = "Completa los campos para continuar";
      return newErrors;
    }
    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "Completa el campo de la nueva contraseña para continuar";
      return newErrors;
    }
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Completa el campo de confirmar contraseña para continuar";
      return newErrors;
    }
    if (formData.newPassword.length < 8) {
      newErrors.newPassword = "La contraseña debe tener al menos 8 caracteres";
      return newErrors;
    }
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]).{8,}$/;
    if (!passwordRegex.test(formData.newPassword)) {
      newErrors.newPassword = "La contraseña debe incluir letras, números y símbolos especiales";
      return newErrors;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
      return newErrors;
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      // Mostrar error y asegurar que el success no esté visible
      setErrors(formErrors);
      setShowErrors(true);
      setAnimateOut(false);
      setShowSuccess(false);
      setAnimateOutSuccess(false);
      return;
    }

    console.log("Contraseña actualizada exitosamente:", formData);

    // Resetear errores por si hubiera alguno viejo
    setErrors({});
    setShowErrors(false);
    setAnimateOut(false);

    // Mostrar notificación de éxito
    setShowSuccess(true);
    setAnimateOutSuccess(false);

    // Ocultar la notificación después de 2s y redirigir
    setTimeout(() => {
      setAnimateOutSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push("/login");
      }, 300);
    }, 2000);
  };

  const handleCancel = () => {
    setFormData({ newPassword: "", confirmPassword: "" });
    setErrors({});
    setShowErrors(false);
    setAnimateOut(false);
    setShowSuccess(false);
    setAnimateOutSuccess(false);
    window.history.back();
  };

  return (
    <div className="rounded-2xl p-6 lg:p-8 w-96 lg:w-[480px] xl:w-[520px]">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl text-start font-semibold text-white mb-2">
          Nueva Contraseña
        </h1>
        <p className="text-white text-start">
          Ingresa tu nueva contraseña. Debe tener al menos 8 caracteres e
          incluir letras, números y símbolos especiales.
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form__group">
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="form__field"
            placeholder="Nueva contraseña"
            autoComplete="new-password"
          />
          <label htmlFor="newPassword" className="form__label">
            Nueva contraseña
          </label>
        </div>

        <div className="form__group">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form__field"
            placeholder="Confirmar contraseña"
            autoComplete="new-password"
          />
          <label htmlFor="confirmPassword" className="form__label">
            Confirmar contraseña
          </label>
        </div>

        {/* Success notification */}
        {showSuccess && (
          <div className="notifications-container">
            <div className={`success-alert ${animateOutSuccess ? "fadeOut" : ""}`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="success-svg" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="success-prompt-container">
                  <h3 className="success-prompt-heading">¡Contraseña actualizada correctamente!</h3>
                  <div className="success-prompt-wrap">
                    <p>Tu contraseña ha sido cambiada exitosamente. Serás redirigido al login.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error notifications (gated por !showSuccess) */}
        {!showSuccess && showErrors && Object.keys(errors).length > 0 && (
          <div className="notifications-container">
            <div className={`error-alert ${showErrors ? "show" : ""} ${animateOut ? "fadeOut" : ""}`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="error-svg" fill="currentColor" viewBox="0 0 20 20">
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
                    {errors.newPassword && <p>{errors.newPassword}</p>}
                    {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-4 mt-6">
          <ButtonTertiary type="button" onClick={handleCancel} className="flex-1">
            Cancelar
          </ButtonTertiary>

          <ButtonMain type="submit" className="flex-1">
            Confirmar
          </ButtonMain>
        </div>
      </form>
    </div>
  );
};

export default NewPassword;
