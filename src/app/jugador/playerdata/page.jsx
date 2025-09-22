"use client";

import { useState, useRef } from "react";
import ButtonMain from "@/components/ButtonMain";
import ButtonTertiary from "@/components/ButtonTertiary";

const PlayerData = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    birthDate: "",
  });

  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de archivo
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setErrors({ image: "Solo se permiten archivos JPG, PNG o GIF" });
        setShowErrors(true);
        return;
      }
      
      // Validar tamaño (máx 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ image: "El archivo no debe superar los 5MB" });
        setShowErrors(true);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
        setErrors({});
        setShowErrors(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "El apellido es obligatorio";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio";
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Ingresa un número de teléfono válido";
    }
    if (!formData.birthDate) {
      newErrors.birthDate = "La fecha de nacimiento es obligatoria";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setShowErrors(true);
      setAnimateOut(false);
      return;
    }

    console.log("Datos del perfil:", {
      ...formData,
      profileImage
    });

    // Aquí iría la lógica para enviar los datos
  };

  const handleCancel = () => {
    setFormData({ name: "", lastName: "", phone: "", birthDate: "" });
    setProfileImage(null);
    setErrors({});
    setShowErrors(false);
    setAnimateOut(false);
    window.history.back();
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado izquierdo */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-12">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-4xl font-bold text-white mb-4">
            Completa tus datos
          </h1>
          <p className="text-white/80 mb-8">
            Ten en cuenta que puedes editar estos datos desde la configuración de tu cuenta.
          </p>

          {/* Foto de perfil */}
          <div className="mb-8">
            <h3 className="text-white text-lg font-medium mb-4">
              Foto de perfil (opcional)
            </h3>
            <div className="flex flex-col items-center">
              <div
                className="relative w-32 h-32 rounded-full border-4 border-white/30 overflow-hidden cursor-pointer group hover:border-[#38caef] transition-colors duration-300"
                onClick={triggerFileInput}
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Perfil"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                    <UserIcon className="w-12 h-12 text-white/60" />
                  </div>
                )}
                
                {/* Icono de cámara */}
                <div className="absolute bottom-2 right-2 bg-[#38caef] rounded-full p-2 shadow-lg group-hover:bg-[#2ba5d1] transition-colors duration-300">
                  <CameraIcon className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <p className="text-white/60 text-sm mt-3 text-center">
                JPG, PNG o GIF (máx. 5MB)
              </p>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lado derecho - Formulario */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-12">
        <div className="max-w-md mx-auto w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Nombre */}
            <div className="form__group">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form__field"
                placeholder="Nombre"
                autoComplete="given-name"
              />
              <label htmlFor="name" className="form__label">
                Nombre
              </label>
            </div>

            {/* Campo Apellido */}
            <div className="form__group">
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="form__field"
                placeholder="Apellido"
                autoComplete="family-name"
              />
              <label htmlFor="lastName" className="form__label">
                Apellido
              </label>
            </div>

            {/* Campo Teléfono */}
            <div className="form__group">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form__field"
                placeholder="Teléfono"
                autoComplete="tel"
              />
              <label htmlFor="phone" className="form__label">
                Teléfono
              </label>
            </div>

            {/* Campo Fecha de Nacimiento */}
            <div className="form__group">
              <div className="relative">
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="form__field date-input"
                  placeholder="Fecha de nacimiento"
                />
                <CalendarIcon className="date-icon" />
              </div>
              <label htmlFor="birthDate" className="form__label">
                Fecha de nacimiento
              </label>
            </div>

            {/* Notificaciones de error */}
            {showErrors && Object.keys(errors).length > 0 && (
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
                      <h3 className="error-prompt-heading">Hay errores en el formulario</h3>
                      <div className="error-prompt-wrap">
                        {errors.name && <p>{errors.name}</p>}
                        {errors.lastName && <p>{errors.lastName}</p>}
                        {errors.phone && <p>{errors.phone}</p>}
                        {errors.birthDate && <p>{errors.birthDate}</p>}
                        {errors.image && <p>{errors.image}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Botones */}
            <div className="flex gap-4 mt-8">
              <ButtonTertiary type="button" onClick={handleCancel} className="flex-1">
                Cancelar
              </ButtonTertiary>

              <ButtonMain type="submit" className="flex-1">
                Guardar
              </ButtonMain>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Iconos SVG
const UserIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

const CameraIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586l-.293-.293A1 1 0 0013.414 4H6.586a1 1 0 00-.707.293L5.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
  </svg>
);

const CalendarIcon = ({ className }) => (
  <svg className={className || "date-icon"} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>
);

export default PlayerData;