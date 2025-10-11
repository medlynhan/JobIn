"use client";

import { useEffect, useState } from "react";

export type GeoCoords = { latitude: number; longitude: number } | null;
export type LocationStatus = "idle" | "locating" | "resolved" | "denied" | "unsupported" | "error";

export function useUserLocation() {
  const [label, setLabel] = useState<string>("Menentukan lokasi…");
  const [coords, setCoords] = useState<GeoCoords>(null);
  const [status, setStatus] = useState<LocationStatus>("idle");

  useEffect(() => {
    let cancelled = false;

    if (typeof window === "undefined") return;
    if (!("geolocation" in navigator)) {
      setStatus("unsupported");
      setLabel("Lokasi tidak didukung");
      return;
    }

    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        if (cancelled) return;
        const { latitude, longitude } = coords;
        setCoords({ latitude, longitude });

        // Reverse geocoding in Indonesian
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=id`;
        fetch(url, { headers: { Accept: "application/json" } })
          .then((r) => r.json())
          .then((data) => {
            if (cancelled) return;
            const addr = data?.address || {};
            // Only city/town/village/suburb/county
            const city = addr.city || addr.town || addr.village || addr.suburb || addr.county;
            setLabel(city || "Di dekat Anda");
            setStatus("resolved");
          })
          .catch(() => {
            if (!cancelled) {
              setLabel("Di dekat Anda");
              setStatus("error");
            }
          });
      },
      () => {
        if (!cancelled) {
          setStatus("denied");
          setLabel("Lokasi dimatikan");
        }
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 }
    );

    return () => {
      cancelled = true;
    };
  }, []);

  return { label, coords, status } as const;
}
