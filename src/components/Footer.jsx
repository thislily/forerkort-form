import React from "react";

export default function Footer() {
  return (
    <div className="bg-sunset mt-24 flex items-center justify-center">
      <footer className="bg-sunset py-8 mx-auto max-w-7xl px-4">
        <p>
          <a
            href="https://www.lilywatson.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-500 transition-colors font-bold"
          >
            Lily Watson
          </a>
          <span className="mx-2">|</span>
          <a
            href="https://github.com/thislily"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-500 transition-colors font-bold"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
