'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Shipment } from '@/lib/mockData'

const CITY_COORDS: Record<string, [number, number]> = {
  'Johannesburg, Gauteng': [-26.2041, 28.0473],
  'Cape Town, Western Cape': [-33.9249, 18.4241],
  'Durban, KwaZulu-Natal': [-29.8587, 31.0218],
  'Port Elizabeth, Eastern Cape': [-33.9608, 25.6022],
  'Pretoria, Gauteng': [-25.7479, 28.2293],
  'Bloemfontein, Free State': [-29.0852, 26.1596],
  'East London, Eastern Cape': [-33.0153, 27.9116],
  'Polokwane, Limpopo': [-23.9045, 29.4689],
  'Musina, Limpopo': [-22.3384, 30.0424],
}

function goldIcon(isActive: boolean) {
  return L.divIcon({
    className: '',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    html: `<div style="
      width:${isActive ? 18 : 12}px;
      height:${isActive ? 18 : 12}px;
      background:${isActive ? '#D4AF37' : '#8a8580'};
      border:2px solid ${isActive ? '#F3E5AB' : '#555'};
      border-radius:50%;
      box-shadow:${isActive ? '0 0 12px rgba(212,175,55,0.6)' : 'none'};
    "></div>`,
  })
}

export default function TrackingMap({ shipment }: { shipment: Shipment }) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return

    const routeCoords = shipment.events
      .map((e) => CITY_COORDS[e.location])
      .filter(Boolean) as [number, number][]

    // Add destination if not yet reached
    const destCoord = CITY_COORDS[shipment.destination]
    if (destCoord && !routeCoords.find(c => c[0] === destCoord[0] && c[1] === destCoord[1])) {
      routeCoords.push(destCoord)
    }

    if (routeCoords.length === 0) return

    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
    })

    // Dark map tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map)

    // Route line
    L.polyline(routeCoords, {
      color: '#D4AF37',
      weight: 2.5,
      opacity: 0.6,
      dashArray: '8, 6',
    }).addTo(map)

    // Event markers
    const currentIdx = shipment.events.length - 1
    shipment.events.forEach((event, i) => {
      const coord = CITY_COORDS[event.location]
      if (!coord) return
      const isActive = i === currentIdx
      L.marker(coord, { icon: goldIcon(isActive) })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:system-ui;font-size:12px;color:#1a1a1a">
            <strong>${event.location}</strong><br/>
            ${event.description}<br/>
            <span style="color:#666">${new Date(event.timestamp).toLocaleString('en-ZA', { dateStyle: 'medium', timeStyle: 'short' })}</span>
          </div>`,
          { className: 'apex-popup' }
        )
    })

    // Destination marker if not yet delivered
    if (shipment.status !== 'DELIVERED' && destCoord) {
      L.marker(destCoord, { icon: goldIcon(false) })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:system-ui;font-size:12px;color:#1a1a1a">
            <strong>${shipment.destination}</strong><br/>
            Final Destination
          </div>`,
          { className: 'apex-popup' }
        )
    }

    // Fit bounds
    const bounds = L.latLngBounds(routeCoords)
    map.fitBounds(bounds, { padding: [40, 40] })

    L.control.zoom({ position: 'topright' }).addTo(map)

    mapInstance.current = map

    return () => {
      map.remove()
      mapInstance.current = null
    }
  }, [shipment])

  return (
    <div
      ref={mapRef}
      className="w-full h-[320px] rounded-2xl overflow-hidden border border-white/10"
    />
  )
}
