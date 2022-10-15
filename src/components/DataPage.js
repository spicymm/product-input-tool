import { DataHandler } from "./DataHandler";
import { Download } from "./Download";

function DataPage({ STORED_PRODUCTS, DASHBOARD_RESPONSE, PRODUCT_RESPONSE }) {
  return (
    <div className="flex flex-col items-center">
      <DataHandler STORED_PRODUCTS={STORED_PRODUCTS} />
      <Download
        DASHBOARD_RESPONSE={DASHBOARD_RESPONSE}
        PRODUCT_RESPONSE={PRODUCT_RESPONSE}
      />
    </div>
  );
}

export { DataPage };
