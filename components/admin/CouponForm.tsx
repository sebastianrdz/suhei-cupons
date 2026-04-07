"use client";

import { CouponRow } from "@/lib/supabase/types";

interface CouponFormProps {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: Partial<CouponRow>;
  isEdit?: boolean;
}

const fieldClass = "w-full rounded-xl px-4 py-3 font-serif text-base transition-all duration-150 focus:outline-none";
const fieldStyle = { background: "var(--bg)", border: "1.5px solid var(--border)", color: "var(--text-head)" };
const labelStyle = { color: "var(--text-body)" };

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-serif text-sm font-medium mb-1.5" style={labelStyle}>{label}</label>
      {children}
      {hint && <p className="font-sans text-xs mt-1" style={{ color: "var(--text-muted)" }}>{hint}</p>}
    </div>
  );
}

export default function CouponForm({ action, defaultValues, isEdit = false }: CouponFormProps) {
  return (
    <form action={action} className="space-y-6 max-w-2xl">
      {/* ID */}
      <Field
        label="ID (slug)"
        hint={!isEdit ? "Sólo letras, números y guiones. No se puede cambiar después." : undefined}
      >
        <input
          name="id"
          defaultValue={defaultValues?.id}
          readOnly={isEdit}
          required={!isEdit}
          placeholder="ej: picnic-parque"
          className={`${fieldClass} ${isEdit ? "opacity-50 cursor-not-allowed" : ""}`}
          style={fieldStyle}
          onFocus={e => !isEdit && (e.target.style.borderColor = "var(--pink)")}
          onBlur={e => (e.target.style.borderColor = "var(--border)")}
        />
      </Field>

      {/* Category */}
      <Field label="Categoría">
        <select
          name="category"
          defaultValue={defaultValues?.category ?? "Actividades"}
          required
          className={fieldClass}
          style={fieldStyle}
          onFocus={e => (e.target.style.borderColor = "var(--pink)")}
          onBlur={e => (e.target.style.borderColor = "var(--border)")}
        >
          <option value="Actividades">Actividades</option>
          <option value="Comida">Comida</option>
          <option value="Extras">Extras</option>
        </select>
      </Field>

      {/* Title */}
      <Field label="Título">
        <input
          name="title"
          defaultValue={defaultValues?.title}
          required
          placeholder="ej: Picnic contigo 🧺"
          className={fieldClass}
          style={fieldStyle}
          onFocus={e => (e.target.style.borderColor = "var(--pink)")}
          onBlur={e => (e.target.style.borderColor = "var(--border)")}
        />
      </Field>

      {/* Subtitle */}
      <Field label="Subtítulo">
        <input
          name="subtitle"
          defaultValue={defaultValues?.subtitle}
          required
          placeholder="ej: Tu comida favorita + cobija + vista bonita."
          className={fieldClass}
          style={fieldStyle}
          onFocus={e => (e.target.style.borderColor = "var(--pink)")}
          onBlur={e => (e.target.style.borderColor = "var(--border)")}
        />
      </Field>

      {/* Description */}
      <Field label="Descripción">
        <textarea
          name="description"
          defaultValue={defaultValues?.description}
          required
          rows={4}
          placeholder="Descripción detallada del cupón…"
          className={`${fieldClass} resize-none`}
          style={fieldStyle}
          onFocus={e => (e.target.style.borderColor = "var(--pink)")}
          onBlur={e => (e.target.style.borderColor = "var(--border)")}
        />
      </Field>

      {/* Special */}
      <div className="flex items-center gap-3">
        <input
          name="special"
          type="checkbox"
          id="special"
          defaultChecked={defaultValues?.special ?? false}
          className="w-4 h-4 cursor-pointer"
          style={{ accentColor: "var(--lavender)" }}
        />
        <label htmlFor="special" className="font-serif text-sm cursor-pointer" style={labelStyle}>
          ★ Cupón especial (efecto de brillo en la tarjeta)
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="font-serif text-base font-semibold px-7 py-3.5 rounded-2xl transition-all duration-150 cursor-pointer hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
        style={{
          background: "linear-gradient(135deg, var(--pink), var(--pink-dark))",
          color: "#fff",
          boxShadow: "0 5px 18px rgba(236,72,153,0.26)",
        }}
      >
        {isEdit ? "Guardar cambios" : "Crear cupón"}
      </button>
    </form>
  );
}
