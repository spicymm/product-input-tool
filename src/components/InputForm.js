import { useState } from "react";

function InputForm({ DASHBOARD_RESPONSE, PRODUCT_RESPONSE, STORED_PRODUCTS }) {
  const [productName, setProductName] = useState("");
  const [productFullName, setProductFullName] = useState("");
  const [productType, setProductType] = useState("NFT");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");
  const [medium, setMedium] = useState("");
  const [contract, setContract] = useState("");
  const [writeup, setWriteup] = useState("");
  const [dexscreenerContract, setDexscreenerContract] = useState(""); // choose which LP to show
  const [transactionDetailsDashboard, setTransactionDetailsDashboard] =
    useState("");

  // For NFTS
  const [priceDetailsDashboard, setPriceDetailsDashboard] = useState("");
  const [transactionActivityDashboard, setTransactionActivityDashboard] =
    useState("");

  // For Tokens
  const [tokenDetailsDashboard, setTokenDetailsDashboard] = useState("");
  const [lpDetailsDashboard, setLPDetailsDashboard] = useState("");
  const [tradingMetricsDashboard, setTradingMetricsDashboard] = useState("");

  const NFT_TAB_HEADERS = [
    "Price_Details",
    "Transaction_Details",
    "Transaction_Activity",
  ];
  const TOKEN_TAB_HEADERS = [
    "Token_Details",
    "LP_Details",
    "Transaction_Details",
    "Trading_Metrics",
  ];
  const PRODUCT_TYPES = ["NFT", "Token"];

  const INPUT_STYLE =
    "form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  function createProductInfoJson(e) {
    e.preventDefault();
    let productResponse = {
      product: {
        productName: productName,
        productFullName: productFullName,
        tabHeaders: productType === "NFT" ? NFT_TAB_HEADERS : TOKEN_TAB_HEADERS,
        productCategory: productType,
        dexscreenerContract: dexscreenerContract,
        productSocials: {
          ...(website ? { website } : {}),
          ...(twitter ? { twitter } : {}),
          ...(discord ? { discord } : {}),
          ...(medium ? { medium } : {}),
          ...(contract ? { contract } : {}),
        },
        ...(writeup ? { writeup } : {}),
      },
    };

    let dashboardResponse;
    if (productType === "NFT") {
      dashboardResponse = {
        [generateDashboardKey("_PRICE_DETAILS")]: priceDetailsDashboard,
        [generateDashboardKey("_TRANSACTION_DETAILS")]:
          transactionDetailsDashboard,
        [generateDashboardKey("_TRANSACTION_ACTIVITY")]:
          transactionActivityDashboard,
      };
    } else {
      dashboardResponse = {
        [generateDashboardKey("_TOKEN_DETAILS")]: tokenDetailsDashboard,
        [generateDashboardKey("_LP_DETAILS")]: lpDetailsDashboard,
        [generateDashboardKey("_TRANSACTION_DETAILS")]:
          transactionDetailsDashboard,
        [generateDashboardKey("_TRADING_METRICS")]: tradingMetricsDashboard,
      };
    }

    saveProductResponse(productResponse);
    saveDashboardResponse(dashboardResponse);
    trackStoredData();

    window.location.reload(); // Hacky way to reset all fields
  }

  function trackStoredData() {
    let storage = localStorage.getItem(STORED_PRODUCTS) ?? "[]";
    storage = JSON.parse(storage);
    storage.push(productFullName);
    localStorage.setItem(STORED_PRODUCTS, JSON.stringify(storage));
  }

  function saveProductResponse(productResponse) {
    let storage = localStorage.getItem(PRODUCT_RESPONSE) ?? "[]";
    storage = JSON.parse(storage);
    storage.push(productResponse);
    localStorage.setItem(PRODUCT_RESPONSE, JSON.stringify(storage));
  }

  function saveDashboardResponse(dashboardResponse) {
    // Responses saved together as 1 object
    let storage = localStorage.getItem(DASHBOARD_RESPONSE) ?? "{}";
    storage = JSON.parse(storage);
    storage = { ...storage, ...dashboardResponse };
    localStorage.setItem(DASHBOARD_RESPONSE, JSON.stringify(storage));
  }

  function generateDashboardKey(dashboardName) {
    let key = productFullName.trim();
    key = key.replaceAll(" ", "_");
    key = key + dashboardName;
    return key.toUpperCase();
  }

  return (
    <div className="flex justify-around">
      <form
        className="flex flex-col p-5 gap-2 w-3/6"
        onSubmit={createProductInfoJson}
      >
        <label>Product Type</label>
        <select
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
        >
          {PRODUCT_TYPES.map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </select>
        <label>Product Name</label>
        <input
          className={INPUT_STYLE}
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          placeholder="e.g. Boomer"
        />
        <label>Product Full Name</label>
        <input
          className={INPUT_STYLE}
          type="text"
          value={productFullName}
          onChange={(e) => setProductFullName(e.target.value)}
          required
          placeholder="e.g. Boomer Squad"
        />
        <label>Website </label>
        <input
          className={INPUT_STYLE}
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <label>Twitter</label>
        <input
          className={INPUT_STYLE}
          type="text"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
        />
        <label>Discord</label>
        <input
          className={INPUT_STYLE}
          type="text"
          value={discord}
          onChange={(e) => setDiscord(e.target.value)}
        />
        <label>Medium</label>
        <input
          className={INPUT_STYLE}
          type="text"
          value={medium}
          onChange={(e) => setMedium(e.target.value)}
        />
        <label>Contract</label>
        <input
          className={INPUT_STYLE}
          type="text"
          value={contract}
          onChange={(e) => setContract(e.target.value)}
          placeholder="0x...."
          required
        />
        {productType === "Token" && (
          <>
            <label>Dexscreener LP contract</label>
            <input
              className={INPUT_STYLE}
              type="text"
              value={dexscreenerContract}
              onChange={(e) => setDexscreenerContract(e.target.value)}
              placeholder="Contract of LP pair token to be shown on website"
            />{" "}
          </>
        )}
        {productType === "NFT" && (
          <>
            <label>Product Writeup</label>
            <textarea
              placeholder="Can take from ebisus"
              className={INPUT_STYLE}
              type="textarea"
              value={writeup}
              onChange={(e) => setWriteup(e.target.value)}
              rows={10}
              cols={50}
            />
          </>
        )}
        <h3 className="text-lg font-bold">DashBoard numbers from Metabase</h3>
        <label>Transaction Details</label>
        <input
          className={INPUT_STYLE}
          type="number"
          value={transactionDetailsDashboard}
          onChange={(e) => setTransactionDetailsDashboard(e.target.value)}
        />
        {productType === "NFT" && (
          <>
            <label>Transaction Activity</label>
            <input
              className={INPUT_STYLE}
              type="number"
              value={transactionActivityDashboard}
              onChange={(e) => setTransactionActivityDashboard(e.target.value)}
            />

            <label>Price Details</label>
            <input
              className={INPUT_STYLE}
              type="number"
              value={priceDetailsDashboard}
              onChange={(e) => setPriceDetailsDashboard(e.target.value)}
            />
          </>
        )}
        {productType === "Token" && (
          <>
            <label>Token Details</label>
            <input
              className={INPUT_STYLE}
              type="number"
              value={tokenDetailsDashboard}
              onChange={(e) => setTokenDetailsDashboard(e.target.value)}
            />
            <label>LP Details</label>
            <input
              className={INPUT_STYLE}
              type="number"
              value={lpDetailsDashboard}
              onChange={(e) => setLPDetailsDashboard(e.target.value)}
            />
            <label>Trading Metrics</label>
            <input
              type="number"
              value={tradingMetricsDashboard}
              onChange={(e) => setTradingMetricsDashboard(e.target.value)}
            />
          </>
        )}
        <button
          className="w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
          type="submit"
        >
          Add Token/NFT
        </button>
      </form>
    </div>
  );
}

export { InputForm };
