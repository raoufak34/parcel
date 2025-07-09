import { useEffect, useState, useCallback } from 'react';
import ParcelForm from './components/ParcelForm';
import { StatusOptions } from './constants/status';
import { Toaster, toast } from 'react-hot-toast';


type Parcel = {
  id?: number;
  tracking_number: string;
  status: string;
  recipient_name: string;
};

export default function App() {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [editingParcel, setEditingParcel] = useState<Parcel | null>(null);
  const [searchTracking, setSearchTracking] = useState('');
  const [searchResult, setSearchResult] = useState<Parcel | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [parcelToDelete, setParcelToDelete] = useState<Parcel | null>(null);


  const fetchParcels = useCallback(async () => {

    const res = await fetch('http://localhost:8000/api/v1/parcels');
    const data = await res.json();
    setParcels(data);
  }, []);

  useEffect(() => {
    fetchParcels();
  }, [fetchParcels]);

  const handleSubmit = async (data: Parcel) => {
    const method = data.id ? 'PUT' : 'POST';
    const url = data.id
      ? `http://localhost:8000/api/v1/parcels/${data.id}`
      : `http://localhost:8000/api/v1/parcels`;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    setEditingParcel(null);
    fetchParcels();
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    try {
    await fetch(`http://localhost:8000/api/v1/parcels/${id}`, {
      method: 'DELETE',
    });
  
    fetchParcels();
  
    toast.success('Parcel deleted!');
    } catch {
      toast.error('Failed to delete parcel');
    }
  };

  const handleSearch = async () => {
    if (!searchTracking) return;
    try {
      const res = await fetch(`http://localhost:8000/api/v1/parcels/track/${searchTracking}`);
      if (res.ok) {
        const parcel = await res.json();
        setSearchResult(parcel);
      } else {
        setSearchResult(null);
      }
    } catch {
      setSearchResult(null);
    }
  };

  const filteredParcels = parcels.filter(parcel =>
    statusFilter ? parcel.status === statusFilter : true
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold text-blue-900 mb-8 tracking-tight">📦 Parcel Tracker</h1>

      {/* 🔍 Search Section */}
      <div className="max-w-3xl mb-6 mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Enter tracking number..."
          value={searchTracking}
          onChange={(e) => setSearchTracking(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Statuses</option>
          {StatusOptions.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          🔍 Search
        </button>
      </div>

      {/* 🎯 Search Result */}
      {searchResult && (
        <div className="bg-white max-w-xl mx-auto mb-8 p-4 rounded-xl border shadow space-y-2">
          <h3 className="text-lg font-semibold text-blue-700">🎯 Tracking Result</h3>
          <p><strong>Tracking:</strong> {searchResult.tracking_number}</p>
          <p><strong>Status:</strong> {searchResult.status}</p>
          <p><strong>Recipient:</strong> {searchResult.recipient_name}</p>
        </div>
      )}

      {/* ✏️ Form */}
      <ParcelForm onSubmit={handleSubmit} initialData={editingParcel ?? undefined} />

      {/* 📋 List */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">📋 Parcel List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredParcels.map((parcel) => (
            <div
              key={parcel.id}
              className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition space-y-3"
            >
              <p><strong>Tracking:</strong> {parcel.tracking_number}</p>
              <p><strong>Status:</strong> {parcel.status}</p>
              <p><strong>Recipient:</strong> {parcel.recipient_name}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingParcel(parcel)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() =>{ setShowConfirm(true); setParcelToDelete(parcel)}}
                  className="text-red-600 hover:underline text-sm"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

        {showConfirm && parcelToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this parcel?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Tracking: <span className="font-medium">{parcelToDelete.tracking_number}</span>
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setParcelToDelete(null);
                }}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                 Cancel
              </button>
              <button
                onClick={async () => {
                  await handleDelete(parcelToDelete.id);
                  setShowConfirm(false);
                  setParcelToDelete(null);
                }}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
              >
                 Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔔 Toast Container */}
      <Toaster />
    </div>
  );
}
