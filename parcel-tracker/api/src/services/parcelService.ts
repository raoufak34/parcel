// src/services/parcelService.ts
import { PrismaClient } from '@prisma/client'
import { CreateParcelDTO, UpdateParcelDTO } from '../dtos/parcel.dto'

const prisma = new PrismaClient()

export const createParcel = async (dto: CreateParcelDTO) => {
  return await prisma.parcel.create({
    data: {
      tracking_number: dto.tracking_number,
      status: dto.status,
      recipient_name: dto.recipient_name,
    },
  })
}

export const getParcels = async () => {
  return await prisma.parcel.findMany()
}

export const getParcelById = async (id: string) => {
  return await prisma.parcel.findUnique({
    where: { id: Number(id) },
  })
}

export const updateParcel = async (id: string, dto: UpdateParcelDTO) => {
  return await prisma.parcel.update({
    where: { id: Number(id) },
    data: {
      status: dto.status,
      recipient_name: dto.recipient_name,
    },
  })
}

export const deleteParcel = async (id: string) => {
  return await prisma.parcel.delete({
    where: { id: Number(id) },
  })
}

export const getParcelByTracking = async (tracking_number: string) => {
  return await prisma.parcel.findFirst({
    where: { tracking_number },
  })
}

export const getParcelsByStatus = async (status: string) => {
  return await prisma.parcel.findMany({
    where: { status },
  })
}
