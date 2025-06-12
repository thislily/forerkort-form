import React from "react";
import nonsense from "../config/nonsense.json";


/**
 * Info component displays a list of informational cards
 * each with a title, paragraph, and call-to-action button.
 * The button scrolls the page to the form section when clicked.
 */

export default function Info() {
  return (
    <div>
      {nonsense.map((item) => (
        <div className="bg-white rounded-lg shadow-lg border-delft-blue
                      mx-auto my-10  border-4 w-[95%]
                      sm:w-2xl p-10 flex flex-col items-center gap-6"
                      key={item.title}>
          <div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-700">{item.paragraph}</p>
          </div>
          <button
          className="px-6 py-2 border-burnt-sienna border-4  rounded-lg font-medium hover:bg-burnt-sienna/50 transition-colors"
            onClick={() => {
              document.getElementById("form-card").scrollIntoView({
                behavior: "smooth",
              });
            }}

          >
            {item.cta}
          </button>
        </div>
      ))}
    </div>
  );
}
