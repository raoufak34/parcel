import { Request, Response, RequestHandler } from 'express';
import * as parcelService from '../services/parcelService';

export const create = async (req: Request, res: Response) => {
  const parcel = await parcelService.createParcel(req.body);
  res.status(201).json({ message: 'Parcel created', parcel });
};

export const findAll = async (_: Request, res: Response) => {
  const parcels = await parcelService.getParcels();
  res.status(200).json(parcels);
};

export const findById = async (req: Request, res: Response) => {
  const parcel = await parcelService.getParcelById(req.params.id);
  res.status(200).json(parcel);
};

export const update = async (req: Request, res: Response) => {
  const updated = await parcelService.updateParcel(req.params.id, req.body);
  res.status(200).json({ message: 'Parcel updated', updated });
};

export const remove = async (req: Request, res: Response) => {
  const deleted = await parcelService.deleteParcel(req.params.id);
  res.status(204).json({ message: 'Parcel deleted', deleted });
};

export const findByTrackingNumber = async (req: Request, res: Response) => {
  const parcel = await parcelService.getParcelByTracking(req.params.tracking_number);
  if (parcel) {
    res.status(200).json(parcel);
  } else {
    res.status(404).json({ message: 'Parcel not found' });
  }
};

export const findByStatus = async (req: Request, res: Response) => {
  const { status } = req.params;
  const parcels = await parcelService.getParcelsByStatus(status);
  res.status(200).json(parcels);
};

  
