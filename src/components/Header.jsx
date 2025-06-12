import React from "react";

export default function Header() {
  return (
    <header className="bg-sunset shadow-md h-18">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
      <img src="assets/car.png" alt="car" className="object-contain h-12"/>
        <nav className="flex space-x-4 navbar text-lg font-semibold">
          {/* Navigation links */} 
          <a href="#" className=" hover:text-gray-500 hover:underline">Hjem</a>
          <a href="#" className=" hover:text-gray-500 hover:underline">Om oss</a>
          <a href="#" className=" hover:text-gray-500 hover:underline">Kontakt</a>
        </nav> 

      </div>
    </header>
  );
}
