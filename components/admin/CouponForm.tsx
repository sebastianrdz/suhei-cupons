"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
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
  const [imageUrls, setImageUrls] = useState<string[]>(defaultValues?.image_urls ?? []);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const slots = 2 - imageUrls.length;
    const toUpload = files.slice(0, slots);

    setUploading(true);
    setUploadError(null);

    try {
      const supabase = createClient();
      const newUrls: string[] = [];

      for (const file of toUpload) {
        const ext = file.name.split(".").pop() ?? "jpg";
        const path = `coupons/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error } = await supabase.storage.from("coupon-images").upload(path, file, { upsert: false });
        if (error) throw error;
        const { data } = supabase.storage.from("coupon-images").getPublicUrl(path);
        newUrls.push(data.publicUrl);
      }

      setImageUrls((prev) => [...prev, ...newUrls]);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Error al subir la imagen");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (idx: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <form action={action} className="space-y-6 max-w-2xl">
      {/* Hidden inputs carry image URLs into the Server Action FormData */}
      {imageUrls.map((url, i) => (
        <input key={i} type="hidden" name={`image_url_${i}`} value={url} />
      ))}

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

      {/* Images */}
      <Field label={`Imágenes (opcional, máx. 2)`}>
        <div className="space-y-3">
          {imageUrls.length > 0 && (
            <div className="flex gap-3 flex-wrap">
              {imageUrls.map((url, i) => (
                <div key={i} className="relative w-28 h-28">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="" className="w-full h-full object-cover rounded-xl" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-150 cursor-pointer"
                    style={{ background: "var(--pink)", color: "#fff", boxShadow: "0 2px 8px rgba(236,72,153,0.3)" }}
                    aria-label="Eliminar imagen"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {imageUrls.length < 2 && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
                disabled={uploading}
              />
              <label
                htmlFor="image-upload"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl cursor-pointer font-serif text-sm transition-all duration-150"
                style={{
                  background: "var(--bg)",
                  border: "1.5px dashed var(--border)",
                  color: uploading ? "var(--text-muted)" : "var(--text-body)",
                  cursor: uploading ? "wait" : "pointer",
                }}
              >
                {uploading ? (
                  <>
                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                    Subiendo…
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    Subir imagen ({imageUrls.length}/2)
                  </>
                )}
              </label>
            </>
          )}

          {uploadError && (
            <p className="font-sans text-xs" style={{ color: "#DC2626" }}>{uploadError}</p>
          )}
        </div>
      </Field>

      {/* Submit */}
      <button
        type="submit"
        disabled={uploading}
        className="font-serif text-base font-semibold px-7 py-3.5 rounded-2xl transition-all duration-150 cursor-pointer hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
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
