import React from 'react'

/**
 * @param {() => void} onClose  – called when user clicks “Lukk”
 */

export default function Modal({ onClose }) {
return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-16 rounded-lg shadow-lg text-center border-4 border-cambridge-blue">
            <h2 className="text-2xl font-bold mb-4">Takk!</h2>
            <p className="text-lg">
                Vi har mottatt forespørselen din og vil kontakte deg snart.
            </p>
            <button
                onClick={onClose}
                className="mt-6 px-6 py-2 bg-cambridge-blue text-white rounded-lg hover:bg-cambridge-blue/70 transition-colors"
            >
                Lukk
            </button>
        </div>
    </div>
)
}
