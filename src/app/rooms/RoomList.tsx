"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BedDouble, Bath, Square, Search, Filter, X, ChevronRight } from "lucide-react";
import type { RoomStatus } from "@prisma/client";

type RoomListItem = {
  id: string;
  roomNumber: number;
  pricePerYear: number;
  hasAC: boolean;
  hasEnsuiteBath: boolean;
  sizeDescription: string;
  type: string;
  status: RoomStatus;
};

export default function RoomList({ rooms }: { rooms: RoomListItem[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const roomNumberStr = String(room.roomNumber);
      const matchesSearch = 
        roomNumberStr.toLowerCase().includes(search.toLowerCase()) ||
        room.type.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = statusFilter === "ALL" || room.status === statusFilter;
      
      const matchesType = typeFilter === "ALL" || 
        (typeFilter === "AC" && room.hasAC) || 
        (typeFilter === "NON_AC" && !room.hasAC);

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [rooms, search, statusFilter, typeFilter]);

  return (
    <div className="space-y-12">
      {/* Filter Section */}
      <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {/* Search Bar */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary/70 flex items-center gap-2 ml-1">
              <Search className="w-3.5 h-3.5" /> Cari Kamar
            </label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Nomor atau tipe kamar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-4 pr-10 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-cta/50 focus:border-cta outline-none transition-all"
              />
              {search && (
                <button 
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary/70 flex items-center gap-2 ml-1">
              <Filter className="w-3.5 h-3.5" /> Status Ketersediaan
            </label>
            <div className="relative">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-cta/50 focus:border-cta outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="ALL">Semua Status</option>
                <option value="AVAILABLE">Tersedia (Kosong)</option>
                <option value="OCCUPIED">Penuh (Terisi)</option>
                <option value="MAINTENANCE">Maintenance</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/40">
                <ChevronRight className="w-4 h-4 rotate-90" />
              </div>
            </div>
          </div>

          {/* Type Filter */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary/70 flex items-center gap-2 ml-1">
              <Filter className="w-3.5 h-3.5" /> Tipe Fasilitas
            </label>
            <div className="relative">
              <select 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-cta/50 focus:border-cta outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="ALL">Semua Tipe</option>
                <option value="AC">Fasilitas AC</option>
                <option value="NON_AC">Non-AC (Kipas Angin)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/40">
                <ChevronRight className="w-4 h-4 rotate-90" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters Summary */}
        {(search || statusFilter !== "ALL" || typeFilter !== "ALL") && (
          <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center gap-2">
            <span className="text-xs text-foreground/50 mr-2">Filter aktif:</span>
            {search && (
              <span className="px-2 py-1 bg-cta/10 text-cta text-xs font-medium rounded-md flex items-center gap-1">
                Kata kunci: {search}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSearch("")} />
              </span>
            )}
            {statusFilter !== "ALL" && (
              <span className="px-2 py-1 bg-cta/10 text-cta text-xs font-medium rounded-md flex items-center gap-1">
                Status: {statusFilter === "AVAILABLE" ? "Tersedia" : statusFilter === "OCCUPIED" ? "Penuh" : "Maintenance"}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setStatusFilter("ALL")} />
              </span>
            )}
            {typeFilter !== "ALL" && (
              <span className="px-2 py-1 bg-cta/10 text-cta text-xs font-medium rounded-md flex items-center gap-1">
                Tipe: {typeFilter === "AC" ? "AC" : "Non-AC"}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setTypeFilter("ALL")} />
              </span>
            )}
            <button 
              onClick={() => {
                setSearch("");
                setStatusFilter("ALL");
                setTypeFilter("ALL");
              }}
              className="text-xs text-cta hover:underline font-medium ml-2"
            >
              Reset Semua
            </button>
          </div>
        )}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRooms.map((room) => {
          let mockImage = "/mock kamar1.png";
          if (room.type.toLowerCase().includes("vvip") || room.type.toLowerCase().includes("ekonomis")) {
            mockImage = "/mock kamar2.png";
          }

          return (
            <div key={room.id} className="group bg-surface rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 border border-border flex flex-col">
              {/* Gambar Kamar */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md ${
                    room.status === "AVAILABLE" ? "bg-green-500 text-white" : 
                    room.status === "OCCUPIED" ? "bg-red-500 text-white" : 
                    "bg-yellow-500 text-white"
                  }`}>
                    {room.status === "AVAILABLE" ? "Tersedia" : 
                     room.status === "OCCUPIED" ? "Penuh" : "Maintenance"}
                  </span>
                  <span className="bg-white/90 text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md">
                    Kamar {room.roomNumber}
                  </span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={mockImage} 
                  alt={`Kamar ${room.roomNumber} - ${room.type}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out" 
                />
              </div>
              
              {/* Detail Info */}
              <div className="p-6 flex flex-col flex-grow text-center">
                <h3 className="font-serif text-xl text-primary mb-1">{room.type}</h3>
                <div className="text-lg text-cta mb-6 font-bold">
                  Rp {room.pricePerYear.toLocaleString("id-ID")} <span className="text-xs text-primary/50 font-normal">/ tahun</span>
                </div>
                
                <div className="grid grid-cols-1 gap-2 mb-8 text-left border-y border-border py-4 flex-grow">
                  <div className="flex items-center gap-2.5 text-primary/80 text-xs">
                    <Square className="h-3.5 w-3.5 text-cta shrink-0" /> {room.sizeDescription}
                  </div>
                  <div className="flex items-center gap-2.5 text-primary/80 text-xs">
                    <Bath className="h-3.5 w-3.5 text-cta shrink-0" /> {room.hasEnsuiteBath ? "Kamar Mandi Dalam" : "Kamar Mandi Luar"}
                  </div>
                  <div className="flex items-center gap-2.5 text-primary/80 text-xs">
                    <BedDouble className="h-3.5 w-3.5 text-cta shrink-0" /> {room.hasAC ? "Fasilitas AC" : "Non-AC (Kipas Angin)"}
                  </div>
                </div>
                
                <Link 
                  href={`/rooms/${room.id}`} 
                  className="w-full py-3 bg-primary text-white rounded-xl text-xs font-semibold hover:bg-primary/90 transition-all shadow-md group-hover:shadow-lg mt-auto uppercase tracking-widest"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filteredRooms.length === 0 && (
        <div className="text-center py-32 bg-surface rounded-2xl border border-border border-dashed">
          <div className="w-16 h-16 bg-cta/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="w-8 h-8 text-cta/40" />
          </div>
          <h3 className="text-xl font-serif text-primary font-bold mb-2">Kamar tidak ditemukan</h3>
          <p className="text-foreground/60 max-w-xs mx-auto">Coba sesuaikan filter atau kata kunci pencarian Anda untuk menemukan kamar yang sesuai.</p>
          <button 
            onClick={() => {
              setSearch("");
              setStatusFilter("ALL");
              setTypeFilter("ALL");
            }}
            className="mt-6 px-6 py-2 border border-cta text-cta font-semibold rounded-full hover:bg-cta hover:text-white transition-all text-sm"
          >
            Reset Semua Filter
          </button>
        </div>
      )}
    </div>
  );
}
