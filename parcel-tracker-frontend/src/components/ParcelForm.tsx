import React, { useEffect, useState } from 'react'
import { ParcelStatus, StatusOptions } from '../constants/status' // 🔁 import enum

type Parcel = {
  id?: number
  tracking_number: string
  status: string
  recipient_name: string
}

interface Props {
  onSubmit: (data: Parcel) => void
  initialData?: Parcel
}

export default function ParcelForm({ onSubmit, initialData }: Props) {
  const [formData, setFormData] = useState<Parcel>({
    tracking_number: '',
    status: ParcelStatus.PENDING, // default value
    recipient_name: '',
  })

  useEffect(() => {
    if (initialData) setFormData(initialData)
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      tracking_number: '',
      status: ParcelStatus.PENDING,
      recipient_name: ''
    })
  }

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">
        {formData.id ? '✏️ Edit Parcel' : '📬 Add a New Parcel'}
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Tracking Number</label>
          <input
            name="tracking_number"
            value={formData.tracking_number}
            onChange={handleChange}
            required
            className="mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
          >
            {StatusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col sm:col-span-2">
          <label className="text-sm font-medium text-gray-700">Recipient Name</label>
          <input
            name="recipient_name"
            value={formData.recipient_name}
            onChange={handleChange}
            required
            className="mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2 flex justify-end mt-2">
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-full text-sm font-semibold shadow"
          >
            {formData.id ? 'Update Parcel' : 'Add Parcel'}
          </button>
        </div>
      </form>
    </div>
  )
}
