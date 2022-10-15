import { useState } from "react";

function Download({ DASHBOARD_RESPONSE, PRODUCT_RESPONSE }) {
  const [productURL, setProductURL] = useState("");
  const [dashboardURL, setDashboardURL] = useState("");
  const DOWNLOAD_LINK_STYLE =
    "text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out mb-4";

  function setDownLoadURL(setResponseUrlFunction, responseType) {
    let responseBlob = new Blob([localStorage.getItem(responseType)]);
    let url = URL.createObjectURL(responseBlob, { type: "application/json" });
    setResponseUrlFunction(url);
  }

  function handleGenerateDownloadURL() {
    setDownLoadURL(setProductURL, PRODUCT_RESPONSE);
    setDownLoadURL(setDashboardURL, DASHBOARD_RESPONSE);
  }

  return (
    <div className="flex flex-col gap-4">
      <button
        className="py-2 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={handleGenerateDownloadURL}
      >
        Generate download links
      </button>
      {dashboardURL && (
        <a
          href={dashboardURL}
          download="dashboard.json"
          className={DOWNLOAD_LINK_STYLE}
        >
          Download dashboard json
        </a>
      )}
      {productURL && (
        <a
          href={productURL}
          download="product.json"
          className={DOWNLOAD_LINK_STYLE}
        >
          Download product json
        </a>
      )}
    </div>
  );
}

export { Download };
