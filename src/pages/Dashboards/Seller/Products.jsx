import { useEffect, useMemo, useState } from "react";
// import * as XLSX from "xlsx";
import ProductsHeader from "../../../components/products/ProductsHeader";
import ProductStats from "../../../components/products/ProductStats";
import ProductFilters from "../../../components/products/ProductFilters";
import ProductGrid from "../../../components/products/ProductGrid";
import ProductDrawer from "../../../components/products/ProductDrawer";
import ProductModal from "../../../components/products/ProductModal";
import DeleteProductModal from "../../../components/products/DeleteProductModal";
import { motion } from "framer-motion";
import { products } from "../../../data/productsData.js";
// import { getProduct } from "../../api/customerApi";

export default function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [view, setView] = useState("grid");

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [modalMode, setModalMode] = useState("add");

  const [productList, setProductList] = useState(products);
  // =========================
  // Subscription (Temporary)
  // Replace with backend later
  // =========================

  const isPlusUser = false;

  // =========================
  // Free Tier Limits
  // =========================

  const FREE_PRODUCT_LIMIT = 10;
  // =========================
  // Free Category Limit
  // =========================

  const FREE_CATEGORY_LIMIT = 3;

  const [categoryError, setCategoryError] = useState("");

  const hasReachedProductLimit =
    !isPlusUser && productList.length >= FREE_PRODUCT_LIMIT;

  // =========================
  // Upgrade Modal
  // =========================

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  // =========================
  // Dynamic Stats
  // =========================

  const productStats = useMemo(
    () => ({
      totalProducts: productList.length,
      activeProducts: productList.filter((p) => p.available === true).length,
      outOfStock: productList.filter((p) => p.available === false).length,
      categories: new Set(productList.map((p) => p.category)).size,
    }),
    [productList],
  );

  // =========================
  // View
  // =========================

  const handleView = (product) => {
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  // =========================
  // Add
  // =========================

  const handleAdd = () => {
    // Free Tier Product Limit
    if (hasReachedProductLimit) {
      setShowUpgradeModal(true);
      return;
    }

    setSelectedProduct(null);
    setModalMode("add");
    setModalOpen(true);
  };
  // =========================
  // Edit
  // =========================

  const handleEdit = (product) => {
    setSelectedProduct({ ...product });
    setModalMode("edit");
    setModalOpen(true);
  };

  // =========================
  // Save Product
  // =========================

  const handleSaveProduct = (productData) => {
    const formattedProduct = {
      id: modalMode === "add" ? Date.now() : productData.id,

      sku: productData.sku || `SKU-${Date.now().toString().slice(-5)}`,

      name: productData.name,

      description: productData.description || "",

      category: productData.category,

      price: Number(productData.price),

      stock: Number(productData.stock),

      available: productData.available,

      featured: productData.featured,

      combo: productData.combo,

      delivery: productData.delivery,

      image: productData.image || "https://placehold.co/600x600?text=Food",
    };

    if (modalMode === "add") {
      setProductList((prev) => [formattedProduct, ...prev]);
    } else {
      setProductList((prev) =>
        prev.map((item) =>
          item.id === formattedProduct.id ? formattedProduct : item,
        ),
      );
    }

    setModalOpen(false);
    setSelectedProduct(null);
  };
  // =========================
  // Delete
  // =========================

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    setProductList((prev) =>
      prev.filter((item) => item.id !== selectedProduct.id),
    );

    setDeleteOpen(false);
    setSelectedProduct(null);
  };

  // =========================
  // Filters
  // =========================

  const filteredProducts = useMemo(() => {
    return productList.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      const matchesStatus =
        status === "All" ||
        (status === "Available" && product.available === true) ||
        (status === "Out of Stock" && product.available === false);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [productList, search, category, status]);

  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImport = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);

        const workbook = XLSX.read(data, {
          type: "array",
        });

        const sheetName = workbook.SheetNames[0];

        const worksheet = workbook.Sheets[sheetName];

        const importedProducts = XLSX.utils.sheet_to_json(worksheet);

        if (!importedProducts.length) {
          alert("No products found in Excel file.");
          return;
        }

        const formattedProducts = importedProducts.map((item) => ({
          id: Number(item.ID),
          sku: item.SKU || "",
          name: item.Name || "",
          description: item.Description || "",
          category: item.Category || "",
          price: Number(item.Price) || 0,
          stock: Number(item.Stock) || 0,
          available: String(item.Available).toLowerCase() === "true",
          featured: String(item.Featured).toLowerCase() === "true",
          combo: String(item.Combo).toLowerCase() === "true",
          delivery: String(item.Delivery).toLowerCase() === "true",
          image: item.Image || "",
        }));

        setProductList((prevProducts) => {
          const existingIds = new Set(prevProducts.map((p) => p.id));

          const newProducts = formattedProducts.filter(
            (p) => !existingIds.has(p.id),
          );

          return [...prevProducts, ...newProducts];
        });

        alert(`${formattedProducts.length} products imported successfully.`);
      } catch (error) {
        console.error(error);
        alert("Invalid Excel file.");
      }

      event.target.value = "";
    };

    reader.readAsArrayBuffer(file);
  };

  const handleExport = () => {
    const exportData = productList.map((product) => ({
      ID: product.id,
      SKU: product.sku,
      Name: product.name,
      Description: product.description,
      Category: product.category,
      Price: product.price,
      Stock: product.stock,
      Available: product.available,
      Featured: product.featured,
      Combo: product.combo,
      Delivery: product.delivery,
      Image: product.image,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    XLSX.writeFile(workbook, "products.xlsx");
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6">
      <div className="space-y-8">
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          hidden
          onChange={handleImport}
        />

        <ProductsHeader
          onAdd={handleAdd}
          onImport={handleImportClick}
          onExport={handleExport}
        />

        <ProductStats stats={productStats} />

        <ProductFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          status={status}
          setStatus={setStatus}
          view={view}
          setView={setView}
        />

        <ProductGrid
          products={filteredProducts}
          view={view}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <ProductDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          product={selectedProduct}
        />

        <ProductModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          mode={modalMode}
          product={selectedProduct}
          onSave={handleSaveProduct}
        />

        <DeleteProductModal
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          onDelete={confirmDelete}
          product={selectedProduct}
        />
        {showUpgradeModal && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.8 7.1 18.2l.9-5.5-4-3.9L9.5 8 12 3z"
                  />
                </svg>
              </div>

              <h2 className="mt-6 text-center text-2xl font-bold text-slate-800">
                Product Limit Reached
              </h2>

              <p className="mt-3 text-center text-slate-500">
                You've used all <strong>10 product slots</strong>.
              </p>

              <p className="mt-1 text-center text-slate-500">
                Upgrade to <strong>BizBite Plus</strong> for unlimited products.
              </p>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="flex-1 rounded-xl border border-slate-300 px-5 py-3 font-medium hover:bg-slate-50">
                  Maybe Later
                </button>

                <button
                  onClick={() => {
                    setShowUpgradeModal(false);

                    // TODO: Navigate to Upgrade page
                  }}
                  className="flex-1 rounded-xl bg-[#16522d] px-5 py-3 font-semibold text-white hover:bg-[#124324]">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
