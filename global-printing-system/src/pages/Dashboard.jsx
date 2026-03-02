import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Chatbot from "../components/Chatbot";
import { orderAPI, uploadAPI } from "../services/api";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const Dashboard = () => {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState(0);
  const [copies, setCopies] = useState(1);
  const [printType, setPrintType] = useState("bw");
  const [doubleSided, setDoubleSided] = useState(false);
  const [binding, setBinding] = useState(false);
  const [paperSize, setPaperSize] = useState("A4");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [queueNumber, setQueueNumber] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (pages > 0) {
      const effectivePages = doubleSided ? Math.ceil(pages / 2) : pages;
      const pricePerPage = printType === "bw" ? 2 : 10;
      const basePrice = effectivePages * copies * pricePerPage;
      const serviceCharge = 5;
      const bindingCharge = binding ? 30 : 0;
      const calculatedTotal = basePrice + serviceCharge + bindingCharge;
      setTotal(calculatedTotal);
    }
  }, [pages, copies, printType, doubleSided, binding]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      setFile(null);
      setPages(0);
      return;
    }
    setError("");
    setFile(selectedFile);
    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      setPages(numPages);
    } catch (err) {
      setError("Failed to detect PDF pages");
      setFile(null);
      setPages(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || pages === 0) {
      setError("Please upload a valid PDF file");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const uploadRes = await uploadAPI.uploadFile(formData);
      const effectivePages = doubleSided ? Math.ceil(pages / 2) : pages;
      const orderData = {
        filePath: uploadRes.data.filePath,
        fileName: uploadRes.data.fileName,
        pages,
        effectivePages,
        copies,
        printType,
        doubleSided,
        binding,
        paperSize,
        totalPrice: total,
      };
      const orderRes = await orderAPI.createOrder(orderData);
      setQueueNumber(orderRes.data.order.queueNumber);
      setShowSuccess(true);
      setFile(null);
      setPages(0);
      setCopies(1);
      setPrintType("bw");
      setDoubleSided(false);
      setBinding(false);
      setPaperSize("A4");
      setTotal(0);
      e.target.reset();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const effectivePages = doubleSided ? Math.ceil(pages / 2) : pages;

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome, {user?.name || "User"}!</h1>
            <p className="text-gray-400">Upload your PDF and place a print order</p>
          </div>
          {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Upload PDF</h2>
              <input type="file" accept=".pdf" onChange={handleFileChange} className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-red-600 file:to-red-700 file:text-white file:cursor-pointer hover:file:from-red-700 hover:file:to-red-800" />
              {file && <p className="mt-3 text-gray-300">Selected: <span className="text-white font-medium">{file.name}</span></p>}
              {pages > 0 && <p className="mt-2 text-green-400 font-medium">Pages detected: {pages}</p>}
            </div>
            {file && pages > 0 && (
              <>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Print Options</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Copies</label>
                      <input type="number" min="1" value={copies} onChange={(e) => setCopies(parseInt(e.target.value) || 1)} className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500" />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Print Type</label>
                      <select value={printType} onChange={(e) => setPrintType(e.target.value)} className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500">
                        <option value="bw">Black and White</option>
                        <option value="color">Color</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Paper Size</label>
                      <select value={paperSize} onChange={(e) => setPaperSize(e.target.value)} className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500">
                        <option value="A4">A4</option>
                        <option value="A3">A3</option>
                        <option value="Legal">Legal</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="doubleSided" checked={doubleSided} onChange={(e) => setDoubleSided(e.target.checked)} className="w-5 h-5 text-red-600 bg-white/5 border-white/10 rounded" />
                      <label htmlFor="doubleSided" className="ml-3 text-gray-300">Double-sided</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="binding" checked={binding} onChange={(e) => setBinding(e.target.checked)} className="w-5 h-5 text-red-600 bg-white/5 border-white/10 rounded" />
                      <label htmlFor="binding" className="ml-3 text-gray-300">Binding (+30)</label>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Price Breakdown</h2>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex justify-between"><span>Pages:</span><span className="text-white">{pages}</span></div>
                    <div className="flex justify-between"><span>Effective Pages:</span><span className="text-white">{effectivePages}</span></div>
                    <div className="flex justify-between"><span>Copies:</span><span className="text-white">{copies}</span></div>
                    <div className="flex justify-between"><span>Print Type:</span><span className="text-white">{printType === "bw" ? "B&W" : "Color"}</span></div>
                    <div className="flex justify-between"><span>Service Charge:</span><span className="text-white">5</span></div>
                    {binding && <div className="flex justify-between"><span>Binding:</span><span className="text-white">30</span></div>}
                    <div className="border-t border-white/10 pt-2 mt-2"></div>
                    <div className="flex justify-between text-lg font-bold"><span className="text-white">Total:</span><span className="text-red-400">{total}</span></div>
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 transition-all disabled:opacity-50">
                  {loading ? "Placing Order..." : "Place Print Order"}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-white/10 rounded-xl p-8 max-w-md mx-4">
            <div className="text-center">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-white mb-2">Order Placed!</h3>
              <p className="text-gray-400 mb-4">Your order has been added to the queue</p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
                <p className="text-gray-300">Queue Number</p>
                <p className="text-3xl font-bold text-red-400">#{queueNumber}</p>
              </div>
              <button onClick={() => setShowSuccess(false)} className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800">Close</button>
            </div>
          </div>
        </div>
      )}
      <Chatbot />
    </div>
  );
};

export default Dashboard;
