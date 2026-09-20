"use client";

export function AlertForm() {
  return (
    <form
      className="mt-4 border border-line bg-surface p-5"
      onSubmit={(e) => {
        e.preventDefault();
        const btn = e.currentTarget.querySelector("button");
        if (btn) {
          btn.textContent = "Arquitectura lista: pendiente de backend";
          btn.setAttribute("disabled", "");
        }
      }}
    >
      <label htmlFor="alerta-email" className="block text-sm text-muted">
        Suscripción a alertas (en desarrollo)
      </label>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          id="alerta-email"
          type="email"
          required
          placeholder="tu@correo.com"
          autoComplete="email"
          className="field"
        />
        <button type="submit" className="btn btn-solid">
          Suscribirme
        </button>
      </div>
      <p className="mt-3 text-xs text-faint">
        Aviso honesto: este formulario todavía no guarda nada. La suscripción funcionará cuando el
        sistema de cuentas esté activo (fase posterior del desarrollo).
      </p>
    </form>
  );
}