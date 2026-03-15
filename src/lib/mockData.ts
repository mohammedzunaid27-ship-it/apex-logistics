export type ShipmentStatus = 'PENDING' | 'TRANSIT' | 'OUT_FOR_DELIVERY' | 'DELIVERED'

export interface ShipmentEvent {
  status: ShipmentStatus
  location: string
  timestamp: string
  description: string
}

export interface Shipment {
  trackingCode: string
  status: ShipmentStatus
  currentLocation: string
  origin: string
  destination: string
  cargoType: string
  estimatedDelivery: string
  updatedAt: string
  events: ShipmentEvent[]
}

export const mockShipments: Record<string, Shipment> = {
  '1001': {
    trackingCode: 'APX-1001',
    status: 'DELIVERED',
    currentLocation: 'Cape Town, Western Cape',
    origin: 'Johannesburg, Gauteng',
    destination: 'Cape Town, Western Cape',
    cargoType: 'Furniture',
    estimatedDelivery: '2026-03-10',
    updatedAt: '2026-03-10T14:30:00Z',
    events: [
      { status: 'PENDING', location: 'Johannesburg, Gauteng', timestamp: '2026-03-07T08:00:00Z', description: 'Shipment collected and dispatched from Johannesburg depot' },
      { status: 'TRANSIT', location: 'Bloemfontein, Free State', timestamp: '2026-03-08T12:00:00Z', description: 'In transit — passing through Free State' },
      { status: 'OUT_FOR_DELIVERY', location: 'Cape Town, Western Cape', timestamp: '2026-03-10T08:00:00Z', description: 'Vehicle loaded and out for final delivery' },
      { status: 'DELIVERED', location: 'Cape Town, Western Cape', timestamp: '2026-03-10T14:30:00Z', description: 'Successfully delivered and signed for' },
    ],
  },
  '1024': {
    trackingCode: 'APX-1024',
    status: 'TRANSIT',
    currentLocation: 'Durban, KwaZulu-Natal',
    origin: 'Johannesburg, Gauteng',
    destination: 'Port Elizabeth, Eastern Cape',
    cargoType: 'Commodities — Steel',
    estimatedDelivery: '2026-03-15',
    updatedAt: '2026-03-13T09:00:00Z',
    events: [
      { status: 'PENDING', location: 'Johannesburg, Gauteng', timestamp: '2026-03-11T07:00:00Z', description: 'Shipment collected and dispatched from Johannesburg depot' },
      { status: 'TRANSIT', location: 'Durban, KwaZulu-Natal', timestamp: '2026-03-13T09:00:00Z', description: 'In transit — passing through KwaZulu-Natal coast route' },
    ],
  },
  '2048': {
    trackingCode: 'APX-2048',
    status: 'OUT_FOR_DELIVERY',
    currentLocation: 'Pretoria, Gauteng',
    origin: 'Johannesburg, Gauteng',
    destination: 'Pretoria, Gauteng',
    cargoType: 'Wholesale Goods',
    estimatedDelivery: '2026-03-13',
    updatedAt: '2026-03-13T11:00:00Z',
    events: [
      { status: 'PENDING', location: 'Johannesburg, Gauteng', timestamp: '2026-03-13T06:00:00Z', description: 'Shipment collected and dispatched from Johannesburg depot' },
      { status: 'TRANSIT', location: 'Johannesburg, Gauteng', timestamp: '2026-03-13T08:00:00Z', description: 'In transit northbound to Pretoria' },
      { status: 'OUT_FOR_DELIVERY', location: 'Pretoria, Gauteng', timestamp: '2026-03-13T11:00:00Z', description: 'Vehicle loaded and out for final delivery' },
    ],
  },
  '3000': {
    trackingCode: 'APX-3000',
    status: 'PENDING',
    currentLocation: 'Johannesburg, Gauteng',
    origin: 'Johannesburg, Gauteng',
    destination: 'East London, Eastern Cape',
    cargoType: 'General Freight',
    estimatedDelivery: '2026-03-17',
    updatedAt: '2026-03-13T07:00:00Z',
    events: [
      { status: 'PENDING', location: 'Johannesburg, Gauteng', timestamp: '2026-03-13T07:00:00Z', description: 'Shipment collected and dispatched from Johannesburg depot' },
    ],
  },
  '4096': {
    trackingCode: 'APX-4096',
    status: 'TRANSIT',
    currentLocation: 'Polokwane, Limpopo',
    origin: 'Johannesburg, Gauteng',
    destination: 'Musina, Limpopo',
    cargoType: 'Commodities — Copper',
    estimatedDelivery: '2026-03-14',
    updatedAt: '2026-03-13T15:00:00Z',
    events: [
      { status: 'PENDING', location: 'Johannesburg, Gauteng', timestamp: '2026-03-12T06:30:00Z', description: 'Shipment collected and dispatched from Johannesburg depot' },
      { status: 'TRANSIT', location: 'Polokwane, Limpopo', timestamp: '2026-03-13T15:00:00Z', description: 'In transit — northbound through Limpopo' },
    ],
  },
}
