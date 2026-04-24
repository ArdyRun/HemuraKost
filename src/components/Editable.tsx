"use client";

import { useState, useRef, useEffect } from "react";
import { updateSiteContent } from "@/app/actions/content";
import { Pencil, Check, X, ImageIcon, Loader2 } from "lucide-react";

// ═══════════════════════════════════════════════════════════
// EditableText — Click to inline-edit text
// ═══════════════════════════════════════════════════════════
export function EditableText({
  contentKey,
  defaultValue,
  value,
  as: Tag = "span" as React.ElementType,
  className,
  editMode,
}: {
  contentKey: string;
  defaultValue: string;
  value?: string;
  as?: React.ElementType;
  className?: string;
  editMode?: boolean;
}) {
  const displayValue = value ?? defaultValue;
  const [editing, setEditing] = useState(false);
  const [liveValue, setLiveValue] = useState(displayValue);
  const [saving, setSaving] = useState(false);
  const elRef = useRef<HTMLElement>(null);

  useEffect(() => { setLiveValue(displayValue); }, [displayValue]);

  // When entering edit mode, focus and select all text
  useEffect(() => {
    if (editing && elRef.current) {
      elRef.current.focus();
      // Select all text inside the contentEditable element
      const range = document.createRange();
      range.selectNodeContents(elRef.current);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [editing]);

  const handleSave = async () => {
    if (!elRef.current) return;
    const newText = elRef.current.innerText.trim();
    setSaving(true);
    await updateSiteContent(contentKey, newText);
    setLiveValue(newText);
    setSaving(false);
    setEditing(false);
  };

  const handleCancel = () => {
    // Don't touch the DOM directly — just toggle off and let React remount via key change
    setEditing(false);
  };

  // Handle keyboard shortcuts: Enter to save, Escape to cancel
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { e.preventDefault(); handleCancel(); }
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSave(); }
  };

  if (!editMode) {
    return <Tag className={className}>{liveValue}</Tag>;
  }

  return (
    <Tag
      // key forces React to unmount/remount when toggling edit mode,
      // avoiding DOM conflicts from contentEditable mutations
      key={editing ? "editing" : "display"}
      ref={elRef}
      className={`${className} ${editing
        ? "relative outline-2 outline-dashed outline-cta -outline-offset-2 cursor-text"
        : "cursor-pointer relative group"
      }`}
      contentEditable={editing}
      suppressContentEditableWarning
      onClick={() => { if (!editing) setEditing(true); }}
      onKeyDown={editing ? handleKeyDown : undefined}
    >
      {liveValue}

      {/* Pencil icon on hover (only when not editing) */}
      {!editing && (
        <span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-cta text-white rounded-full shadow-lg">
          <Pencil className="w-3 h-3" />
        </span>
      )}

      {/* Save/Cancel buttons — uses <span> instead of <div> to be valid inside <p>/<span> */}
      {editing && (
        <span
          className="absolute -top-10 right-0 gap-1 z-50"
          style={{ display: "flex" }}
          contentEditable={false}
          onMouseDown={(e) => e.preventDefault()}
        >
          <button
            type="button"
            onClick={handleSave}
            className="p-1.5 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-colors"
            disabled={saving}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="p-1.5 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </span>
      )}
    </Tag>
  );
}

// ═══════════════════════════════════════════════════════════
// EditableImage — Click to replace image URL
// ═══════════════════════════════════════════════════════════
export function EditableImage({
  contentKey,
  defaultSrc,
  src,
  alt,
  className,
  containerClassName,
  editMode,
  style,
  renderAs = "img",
}: {
  contentKey: string;
  defaultSrc: string;
  src?: string;
  alt?: string;
  className?: string;
  containerClassName?: string;
  editMode?: boolean;
  style?: React.CSSProperties;
  renderAs?: "img" | "bg";
}) {
  const displaySrc = src ?? defaultSrc;
  const [editing, setEditing] = useState(false);
  const [url, setUrl] = useState(displaySrc);
  const [liveSrc, setLiveSrc] = useState(displaySrc);  // ← nilai yang ditampilkan
  const [saving, setSaving] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setUrl(displaySrc); setLiveSrc(displaySrc); }, [displaySrc]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileToUpload(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUrl(reader.result as string);
        setEditing(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // ── Shared edit modal ───────────────────────────────────
  const modal = editing ? (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
      onClick={() => setEditing(false)}
    >
      <div
        className="bg-surface rounded-2xl shadow-2xl w-full max-w-md border border-border p-6 space-y-4 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-serif text-xl text-primary font-bold">Ganti Gambar</h3>
        <p className="text-sm text-foreground/60">
          Masukkan URL gambar baru atau klik &quot;Upload&quot; untuk memilih dari perangkat.
        </p>
        
        {url && (
          <div className="w-full h-40 bg-secondary rounded-xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
        
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setFileToUpload(null);
            }}
            placeholder="/bg-kosan.jpg atau https://..."
            className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-cta text-sm"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-3 rounded-xl bg-cta/10 text-cta font-medium hover:bg-cta/20 transition-all text-sm whitespace-nowrap"
          >
            Upload File
          </button>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => { 
              setUrl(displaySrc); 
              setFileToUpload(null);
              setEditing(false); 
            }}
            className="flex-1 py-3 rounded-xl border border-foreground/10 text-foreground/70 hover:bg-foreground/5 font-medium transition-all"
          >
            Batal
          </button>
          <button
            type="button"
            disabled={saving || !url.trim()}
            onClick={async () => {
              setSaving(true);
              try {
                const formData = new FormData();
                formData.append("key", contentKey);
                if (fileToUpload) {
                  formData.append("file", fileToUpload);
                } else {
                  formData.append("imageUrl", url.trim());
                }
                const res = await fetch("/api/upload-image", {
                  method: "POST",
                  body: formData,
                });
                if (res.ok) {
                  const data = await res.json();
                  // Update tampilan instan — gunakan URL final dari server (bisa jadi base64)
                  setLiveSrc(data.url ?? url);
                } else {
                  const err = await res.json();
                  alert("Gagal menyimpan: " + (err.error ?? res.statusText));
                }
              } finally {
                setSaving(false);
                setEditing(false);
                setFileToUpload(null);
              }
            }}
            className="flex-1 py-3 rounded-xl bg-cta text-white font-semibold hover:bg-[#7a6548] disabled:opacity-50 transition-all"
          >
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  ) : null;

  // ── Background (renderAs="bg") ──────────────────────────
  // The bg div is typically at z-0, with gradient overlays and content above it.
  // Clicks on the bg div are blocked by higher z-index siblings.
  // Solution: render the bg div as-is, plus a FLOATING edit button at a high
  // z-index that is always clickable.
  if (renderAs === "bg") {
    if (!editMode) {
      return (
        <div
          className={className}
          style={{ ...style, backgroundImage: `url('${liveSrc}')` }}
        />
      );
    }

    return (
      <>
        <input 
          type="file" 
          ref={fileInputRef} 
          hidden 
          accept="image/*" 
          onChange={handleFileChange} 
        />
        {/* Background div rendered normally — no event handlers needed */}
        <div
          className={className}
          style={{ ...style, backgroundImage: `url('${liveSrc}')` }}
        />
        {/* Floating edit button — sits above ALL layers so it's always clickable */}
        <div className="absolute top-6 right-6 z-[60] flex gap-2">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 bg-cta text-white pl-4 pr-5 py-2.5 rounded-full text-sm font-semibold shadow-2xl hover:bg-[#7a6548] transition-all hover:scale-105 active:scale-95 border border-white/20"
          >
            <ImageIcon className="w-4 h-4" /> Ganti Background
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-white/90 text-primary pl-4 pr-5 py-2.5 rounded-full text-sm font-semibold shadow-2xl hover:bg-white transition-all hover:scale-105 active:scale-95"
            title="Upload gambar dari perangkat"
          >
            <Pencil className="w-4 h-4" /> Upload File
          </button>
        </div>
        {modal}
      </>
    );
  }

  // ── Regular <img> ───────────────────────────────────────
  if (!editMode) {
    return (
      <div className={containerClassName}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={liveSrc} alt={alt || ""} className={className} />
      </div>
    );
  }

  return (
    <>
      <input 
        type="file" 
        ref={fileInputRef} 
        hidden 
        accept="image/*" 
        onChange={handleFileChange} 
      />
      <div
        className={`${containerClassName ?? ""} relative group cursor-pointer`}
        onClick={() => setEditing(true)}
        onDoubleClick={(e) => {
          e.stopPropagation();
          fileInputRef.current?.click();
        }}
        title="Tap 2x untuk memilih gambar dari perangkat"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={liveSrc} alt={alt || ""} className={className} />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
          <div className="bg-white/90 text-primary px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold shadow-lg">
            <ImageIcon className="w-4 h-4" /> Ganti Gambar
          </div>
        </div>
      </div>
      {modal}
    </>
  );
}
