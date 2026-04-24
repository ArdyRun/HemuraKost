"use client";

import { useState, useActionState } from "react";
import { createRoom, updateRoom, deleteRoom } from "@/app/actions/rooms";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  Snowflake,
  ShowerHead,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
} from "lucide-react";

type Room = {
  id: string;
  roomNumber: number;
  pricePerYear: number;
  hasAC: boolean;
  hasEnsuiteBath: boolean;
  sizeDescription: string;
  type: string;
  status: string;
};

type SortKey = "roomNumber" | "type" | "pricePerYear" | "sizeDescription" | "hasAC" | "status";
type SortDir = "asc" | "desc";

function SortableHeader({
  label,
  sortKey,
  currentKey,
  currentDir,
  onSort,
  className,
}: {
  label: string;
  sortKey: SortKey;
  currentKey: SortKey;
  currentDir: SortDir;
  onSort: (key: SortKey) => void;
  className?: string;
}) {
  const isActive = currentKey === sortKey;
  return (
    <th
      className={`px-6 py-4 text-xs uppercase tracking-wider cursor-pointer select-none group ${className ?? ""}`}
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center gap-1.5">
        <span className={`font-semibold transition-colors ${isActive ? "text-cta" : "text-foreground/70 group-hover:text-foreground"}`}>
          {label}
        </span>
        <span className={`transition-colors ${isActive ? "text-cta" : "text-foreground/30 group-hover:text-foreground/50"}`}>
          {isActive ? (
            currentDir === "asc" ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
          ) : (
            <ChevronsUpDown className="w-3.5 h-3.5" />
          )}
        </span>
      </div>
    </th>
  );
}

const ROOM_TYPES = ["VVIP", "VIP", "Reguler AC", "Reguler Non-AC", "Ekonomis"];
const ROOM_STATUSES = [
  { value: "AVAILABLE", label: "Tersedia", color: "text-green-600 bg-green-600/10" },
  { value: "OCCUPIED", label: "Terisi", color: "text-cta bg-cta/10" },
  { value: "MAINTENANCE", label: "Perbaikan", color: "text-amber-600 bg-amber-600/10" },
];

function statusBadge(status: string) {
  const s = ROOM_STATUSES.find((x) => x.value === status) || ROOM_STATUSES[0];
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${s.color}`}>
      {s.label}
    </span>
  );
}

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

// ═══════════════════════════════════════════════════════════
// Modal Form (shared for Create & Edit)
// ═══════════════════════════════════════════════════════════
function RoomFormModal({
  room,
  onClose,
}: {
  room?: Room | null;
  onClose: () => void;
}) {
  const isEdit = !!room;
  const action = isEdit ? updateRoom : createRoom;
  const [error, dispatch, isPending] = useActionState(action, undefined);

  const [hasAC, setHasAC] = useState(room?.hasAC ?? true);
  const [hasEnsuiteBath, setHasEnsuiteBath] = useState(room?.hasEnsuiteBath ?? true);

  // close on success (error === undefined after submission AND isPending just flipped to false)
  // We track this via a simple flag
  const [submitted, setSubmitted] = useState(false);
  if (submitted && !isPending && error === undefined) {
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-2xl shadow-2xl w-full max-w-lg border border-border overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-serif text-xl text-primary font-bold">
            {isEdit ? "Edit Kamar" : "Tambah Kamar Baru"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-foreground/5 text-foreground/60 hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form
          action={(fd) => {
            setSubmitted(true);
            dispatch(fd);
          }}
          className="p-6 space-y-5"
        >
          {isEdit && <input type="hidden" name="id" value={room.id} />}

          {/* Row 1: Room Number & Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-foreground/60 mb-1.5 font-medium">
                Nomor Kamar
              </label>
              <input
                type="number"
                name="roomNumber"
                defaultValue={room?.roomNumber || ""}
                required
                min={1}
                className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-cta transition-all"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-foreground/60 mb-1.5 font-medium">
                Tipe Kamar
              </label>
              <div className="relative">
                <select
                  name="type"
                  defaultValue={room?.type || "Reguler AC"}
                  className="w-full appearance-none px-4 py-3 rounded-xl border border-foreground/10 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-cta transition-all pr-10"
                >
                  {ROOM_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 2: Price & Size */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-foreground/60 mb-1.5 font-medium">
                Harga per Tahun (Rp)
              </label>
              <input
                type="number"
                name="pricePerYear"
                defaultValue={room?.pricePerYear || ""}
                required
                min={0}
                step={500000}
                className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-cta transition-all"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-foreground/60 mb-1.5 font-medium">
                Deskripsi Ukuran
              </label>
              <input
                type="text"
                name="sizeDescription"
                defaultValue={room?.sizeDescription || ""}
                required
                placeholder="Contoh: 4x5 Meter"
                className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-cta transition-all"
              />
            </div>
          </div>

          {/* Row 3: Status */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-foreground/60 mb-1.5 font-medium">
              Status Kamar
            </label>
            <div className="relative">
              <select
                name="status"
                defaultValue={room?.status || "AVAILABLE"}
                className="w-full appearance-none px-4 py-3 rounded-xl border border-foreground/10 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-cta transition-all pr-10"
              >
                {ROOM_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 pointer-events-none" />
            </div>
          </div>

          {/* Row 4: Toggles */}
          <div className="grid grid-cols-2 gap-4">
            {/* AC Toggle */}
            <div className="flex items-center gap-3 p-3 rounded-xl border border-foreground/10 bg-background">
              <input type="hidden" name="hasAC" value={hasAC ? "true" : "false"} />
              <button
                type="button"
                onClick={() => setHasAC(!hasAC)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                  hasAC ? "bg-cta" : "bg-foreground/20"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                    hasAC ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <div className="flex items-center gap-1.5 text-sm text-foreground/80">
                <Snowflake className="w-4 h-4 text-blue-500" /> AC
              </div>
            </div>

            {/* Ensuite Bath Toggle */}
            <div className="flex items-center gap-3 p-3 rounded-xl border border-foreground/10 bg-background">
              <input type="hidden" name="hasEnsuiteBath" value={hasEnsuiteBath ? "true" : "false"} />
              <button
                type="button"
                onClick={() => setHasEnsuiteBath(!hasEnsuiteBath)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                  hasEnsuiteBath ? "bg-cta" : "bg-foreground/20"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                    hasEnsuiteBath ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <div className="flex items-center gap-1.5 text-sm text-foreground/80">
                <ShowerHead className="w-4 h-4 text-sky-500" /> KM Dalam
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-foreground/10 text-foreground/70 hover:bg-foreground/5 font-medium transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 py-3 rounded-xl bg-cta text-white font-semibold hover:bg-[#7a6548] shadow-lg shadow-cta/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isPending
                ? "Menyimpan..."
                : isEdit
                ? "Perbarui"
                : "Tambahkan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Delete Confirmation Modal
// ═══════════════════════════════════════════════════════════
function DeleteConfirmModal({
  room,
  onClose,
}: {
  room: Room;
  onClose: () => void;
}) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setIsPending(true);
    const err = await deleteRoom(room.id);
    if (err) {
      setError(err);
      setIsPending(false);
    } else {
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-2xl shadow-2xl w-full max-w-sm border border-border overflow-hidden animate-fade-in p-6 text-center space-y-4">
        <div className="mx-auto w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center">
          <Trash2 className="w-7 h-7 text-red-500" />
        </div>
        <h3 className="font-serif text-xl text-primary font-bold">Hapus Kamar #{room.roomNumber}?</h3>
        <p className="text-sm text-foreground/60">
          Tindakan ini tidak dapat dibatalkan. Data kamar nomor {room.roomNumber} akan dihapus secara permanen.
        </p>

        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-foreground/10 text-foreground/70 hover:bg-foreground/5 font-medium transition-all"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="flex-1 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 transition-all"
          >
            {isPending ? "Menghapus..." : "Ya, Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Main Table Component
// ═══════════════════════════════════════════════════════════
const STATUS_ORDER: Record<string, number> = { AVAILABLE: 0, OCCUPIED: 1, MAINTENANCE: 2 };
const TYPE_ORDER: Record<string, number> = { VVIP: 0, VIP: 1, "Reguler AC": 2, "Reguler Non-AC": 3, Ekonomis: 4 };

export default function RoomTable({ rooms }: { rooms: Room[] }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [sortKey, setSortKey] = useState<SortKey>("roomNumber");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [editRoom, setEditRoom] = useState<Room | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Room | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const filtered = rooms.filter((r) => {
    const matchSearch =
      r.roomNumber.toString().includes(search) ||
      r.type.toLowerCase().includes(search.toLowerCase()) ||
      r.sizeDescription.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "ALL" || r.type === filterType;
    const matchStatus = filterStatus === "ALL" || r.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  }).sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1;
    switch (sortKey) {
      case "roomNumber":   return dir * (a.roomNumber - b.roomNumber);
      case "pricePerYear": return dir * (a.pricePerYear - b.pricePerYear);
      case "type":         return dir * ((TYPE_ORDER[a.type] ?? 99) - (TYPE_ORDER[b.type] ?? 99));
      case "sizeDescription": return dir * a.sizeDescription.localeCompare(b.sizeDescription);
      case "hasAC":        return dir * (Number(b.hasAC) - Number(a.hasAC));
      case "status":       return dir * ((STATUS_ORDER[a.status] ?? 99) - (STATUS_ORDER[b.status] ?? 99));
      default:             return 0;
    }
  });

  return (
    <>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
          <input
            type="text"
            placeholder="Cari kamar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-foreground/10 bg-surface text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-cta text-sm transition-all"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Filter Type */}
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-foreground/10 bg-surface text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-cta transition-all"
            >
              <option value="ALL">Semua Tipe</option>
              {ROOM_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 pointer-events-none" />
          </div>

          {/* Filter Status */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-foreground/10 bg-surface text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-cta transition-all"
            >
              <option value="ALL">Semua Status</option>
              {ROOM_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 pointer-events-none" />
          </div>

          {/* Add Button */}
          <button
            type="button"
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cta text-white font-semibold text-sm hover:bg-[#7a6548] shadow-lg shadow-cta/20 transition-all"
          >
            <Plus className="w-4 h-4" /> Tambah Kamar
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <SortableHeader label="No"         sortKey="roomNumber"     currentKey={sortKey} currentDir={sortDir} onSort={handleSort} />
                <SortableHeader label="Tipe"       sortKey="type"          currentKey={sortKey} currentDir={sortDir} onSort={handleSort} />
                <SortableHeader label="Harga/Tahun" sortKey="pricePerYear" currentKey={sortKey} currentDir={sortDir} onSort={handleSort} />
                <SortableHeader label="Ukuran"     sortKey="sizeDescription" currentKey={sortKey} currentDir={sortDir} onSort={handleSort} />
                <SortableHeader label="Fasilitas"  sortKey="hasAC"         currentKey={sortKey} currentDir={sortDir} onSort={handleSort} className="text-center" />
                <SortableHeader label="Status"     sortKey="status"        currentKey={sortKey} currentDir={sortDir} onSort={handleSort} />
                <th className="px-6 py-4 font-semibold text-foreground/70 uppercase tracking-wider text-xs text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-foreground/40">
                    Tidak ada kamar ditemukan.
                  </td>
                </tr>
              ) : (
                filtered.map((room) => (
                  <tr
                    key={room.id}
                    className="hover:bg-foreground/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-primary">{room.roomNumber}</td>
                    <td className="px-6 py-4 text-foreground/80">{room.type}</td>
                    <td className="px-6 py-4 font-medium text-foreground">{formatRupiah(room.pricePerYear)}</td>
                    <td className="px-6 py-4 text-foreground/70">{room.sizeDescription}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <span
                          title={room.hasAC ? "AC" : "Tanpa AC"}
                          className={`p-1.5 rounded-lg ${room.hasAC ? "bg-blue-500/10 text-blue-500" : "bg-foreground/5 text-foreground/30"}`}
                        >
                          <Snowflake className="w-4 h-4" />
                        </span>
                        <span
                          title={room.hasEnsuiteBath ? "KM Dalam" : "KM Luar"}
                          className={`p-1.5 rounded-lg ${room.hasEnsuiteBath ? "bg-sky-500/10 text-sky-500" : "bg-foreground/5 text-foreground/30"}`}
                        >
                          <ShowerHead className="w-4 h-4" />
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{statusBadge(room.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setEditRoom(room)}
                          className="p-2 rounded-lg hover:bg-cta/10 text-cta transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(room)}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        <div className="px-6 py-3 border-t border-border flex items-center justify-between text-xs text-foreground/50">
          <span>Menampilkan {filtered.length} dari {rooms.length} kamar</span>
          <span>
            {rooms.filter((r) => r.status === "AVAILABLE").length} tersedia ·{" "}
            {rooms.filter((r) => r.status === "OCCUPIED").length} terisi ·{" "}
            {rooms.filter((r) => r.status === "MAINTENANCE").length} perbaikan
          </span>
        </div>
      </div>

      {/* Modals */}
      {showCreate && <RoomFormModal onClose={() => setShowCreate(false)} />}
      {editRoom && (
        <RoomFormModal room={editRoom} onClose={() => setEditRoom(null)} />
      )}
      {deleteTarget && (
        <DeleteConfirmModal
          room={deleteTarget}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}
