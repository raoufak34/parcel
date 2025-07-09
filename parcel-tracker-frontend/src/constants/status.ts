export enum ParcelStatus {
    PENDING = "in_pending",
    IN_TRANSIT = "in_transit",
    DELIVERED = "Delivered",
    CANCELLED = "Cancelled",
    ACTIVE = "Active"
  }
  
  export const StatusOptions = Object.values(ParcelStatus);
  