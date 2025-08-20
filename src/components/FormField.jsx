"use client";

export default function FormField({ etiqueta, tipo, valor, alCambiar, marcador }) {
  return (
    <div className="form__group w-full max-w-sm">
      <input
        type={tipo}
        className="form__field"
        placeholder={marcador}
        value={valor}
        onChange={alCambiar}
        required
      />
      <label className="form__label">{etiqueta}</label>
    </div>
  );
}
