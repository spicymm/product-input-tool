import { useEffect, useState } from "react";

function DataHandler({ STORED_PRODUCTS }) {
  const [storedProducts, setStoredProducts] = useState([]);
  function populateStoredProducts() {
    let storage = localStorage.getItem(STORED_PRODUCTS) ?? "[]";
    storage = JSON.parse(storage);
    setStoredProducts(storage);
  }

  function deleteLocalStorage() {
    if (window.confirm("Are you sure you want to clear all data")) {
      localStorage.clear();
      window.location.reload();
    }
  }

  useEffect(() => {
    populateStoredProducts();
  }, []);

  return (
    <div className="py-4 my-4 border-2 border-slate-200 rounded-md">
      <h3 className="text-lg font-bold px-2 ">Currently entered products</h3>
      <ul className="w-96 text-gray-900 flex flex-col px-6">
        {storedProducts.map((storedProduct) => (
          <li className="px-2 py-2 list-disc w-full" key={storedProduct}>
            {storedProduct}
          </li>
        ))}
      </ul>
      <button
        onClick={deleteLocalStorage}
        className="py-2 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Clear data
      </button>
    </div>
  );
}

export { DataHandler };
