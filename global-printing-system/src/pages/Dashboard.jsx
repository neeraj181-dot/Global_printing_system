import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { uploadAPI, orderAPI } from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Form state
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Print options
  const [printOptions, setPrintOptions] = useState({
    totalPages: 1,
    printType: 'bw',
    copies: 1,
    doubleSided: false,
    binding: false,
    urgent: false,
  });

  // Handle file selection
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setError('Only PDF, DOC, DOCX, JPG, and PNG files are allowed');
      return;
    }

    // Validate file size (20MB)
    if (file.size > 20 * 1024 * 1024) {
      setError('File size must be less than 20MB');
      return;
    }

    setError('');
    setSelectedFile(file);
  };

  // Calculate price
  const calculatePrice = () => {
    if (!selectedFile || printOptions.totalPages < 1 || printOptions.copies < 1) return 0;
    
    let basePrice = printOptions.printType === 'color' ? 5 : 2;
    basePrice = basePrice * printOptions.totalPages * printOptions.copies;

    // Apply double-sided discount
    if (printOptions.doubleSided) {
      basePrice = basePrice * 0.9;
    }

    // Add binding cost
    if (printOptions.binding) {
      basePrice += 30;
    }

    // Add urgent cost
    if (printOptions.urgent) {
      basePrice += 20;
    }

    // Calculate GST (18%)
    const gst = basePrice * 0.18;
    const finalAmount = Math.round(basePrice + gst);

    return finalAmount;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }

    if (printOptions.copies < 1) {
      setError('Number of copies must be at least 1');
      return;
    }

    if (printOptions.totalPages < 1) {
      setError('Number of pages must be at least 1');
      return;
    }

    try {
      setSubmitting(true);

      // Step 1: Upload file
      setUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);

      const uploadResponse = await uploadAPI.uploadFile(formData);
      setUploading(false);

      // Step 2: Create order
      const orderData = {
        filePath: uploadResponse.data.filePath,
        fileName: uploadResponse.data.fileName,
        totalPages: printOptions.totalPages,
        printType: printOptions.printType,
        copies: printOptions.copies,
        doubleSided: printOptions.doubleSided,
        binding: printOptions.binding,
        urgent: printOptions.urgent,
      };

      const orderResponse = await orderAPI.createOrder(orderData);

      // Success
      setSuccess('Order created successfully! Redirecting to payment...');
      
      // Reset form
      setTimeout(() => {
        setSelectedFile(null);
        setPrintOptions({
          totalPages: 1,
          printType: 'bw',
          copies: 1,
          doubleSided: false,
          binding: false,
          urgent: false,
        });
        
        // Redirect to orders page
        navigate('/orders');
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create order. Please try again.');
    } finally {
      setSubmitting(false);
      setUploading(false);
    }
  };

  const totalPrice = calculatePrice();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{user?.name}</span>! 👋
            </h1>
            <p className="text-gray-400 text-lg">
              Upload your documents and configure your printing preferences
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-500/10 border-2 border-red-500 text-red-400 px-6 py-4 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 bg-green-500/10 border-2 border-green-500 text-green-400 px-6 py-4 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <span className="font-medium">{success}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8 hover:shadow-blue-500/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl">📄</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Upload Document</h2>
                </div>
                
                <div className="space-y-6">
                  {/* File Upload */}
                  <div className="border-3 border-dashed border-blue-500/30 rounded-2xl p-10 text-center hover:border-blue-500 hover:bg-blue-500/5 transition-all duration-300 cursor-pointer group">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      disabled={submitting}
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="text-7xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {selectedFile ? '📎' : '☁️'}
                      </div>
                      <p className="text-lg font-semibold text-white mb-2">
                        {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-sm text-gray-400">PDF, DOC, DOCX, JPG, PNG up to 20MB</p>
                    </label>
                  </div>

                  {/* File Info */}
                  {selectedFile && (
                    <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 rounded-2xl p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-3xl">📄</span>
                          </div>
                          <div>
                            <p className="text-base font-semibold text-white">{selectedFile.name}</p>
                            <p className="text-sm text-gray-400">
                              {(selectedFile.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedFile(null)}
                          className="text-red-400 hover:text-red-300 text-sm font-semibold bg-red-500/10 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-all"
                          disabled={submitting}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Total Pages Input */}
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-gray-300">
                      Total Pages
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={printOptions.totalPages}
                      onChange={(e) => setPrintOptions({ ...printOptions, totalPages: parseInt(e.target.value) || 1 })}
                      className="w-full px-5 py-3 border-2 border-white/10 rounded-xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 bg-white/5 text-white transition-all duration-200 outline-none placeholder-gray-500"
                      disabled={submitting}
                    />
                  </div>
                </div>
              </div>

              {/* Printing Options */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8 hover:shadow-purple-500/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl">⚙️</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Printing Options</h2>
                </div>
                
                <div className="space-y-5">
                  {/* Number of Copies */}
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-gray-300">
                      Number of Copies
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={printOptions.copies}
                      onChange={(e) => setPrintOptions({ ...printOptions, copies: parseInt(e.target.value) || 1 })}
                      className="w-full px-5 py-3 border-2 border-white/10 rounded-xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 bg-white/5 text-white transition-all duration-200 outline-none"
                      disabled={submitting}
                    />
                  </div>

                  {/* Print Type */}
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-gray-300">
                      Print Type
                    </label>
                    <select
                      value={printOptions.printType}
                      onChange={(e) => setPrintOptions({ ...printOptions, printType: e.target.value })}
                      className="w-full px-5 py-3 border-2 border-white/10 rounded-xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 bg-white/5 text-white transition-all duration-200 outline-none"
                      disabled={submitting}
                    >
                      <option value="bw" className="bg-slate-800">Black & White (₹2/page)</option>
                      <option value="color" className="bg-slate-800">Color (₹5/page)</option>
                    </select>
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={printOptions.doubleSided}
                        onChange={(e) => setPrintOptions({ ...printOptions, doubleSided: e.target.checked })}
                        className="w-5 h-5 rounded border-2 border-white/20 bg-white/5 checked:bg-blue-500 focus:ring-2 focus:ring-blue-500/50"
                        disabled={submitting}
                      />
                      <span className="text-gray-300 group-hover:text-white transition-colors">
                        Double-sided (10% discount)
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={printOptions.binding}
                        onChange={(e) => setPrintOptions({ ...printOptions, binding: e.target.checked })}
                        className="w-5 h-5 rounded border-2 border-white/20 bg-white/5 checked:bg-blue-500 focus:ring-2 focus:ring-blue-500/50"
                        disabled={submitting}
                      />
                      <span className="text-gray-300 group-hover:text-white transition-colors">
                        Binding (+₹30)
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={printOptions.urgent}
                        onChange={(e) => setPrintOptions({ ...printOptions, urgent: e.target.checked })}
                        className="w-5 h-5 rounded border-2 border-white/20 bg-white/5 checked:bg-blue-500 focus:ring-2 focus:ring-blue-500/50"
                        disabled={submitting}
                      />
                      <span className="text-gray-300 group-hover:text-white transition-colors">
                        Urgent (+₹20)
                      </span>
                    </label>
                  </div>

                  {/* Price Summary */}
                  <div className="pt-6 border-t-2 border-white/10">
                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-6 mb-5 border-2 border-green-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-gray-300">Total Price</span>
                        <span className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                          ₹{totalPrice}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 text-right">Including 18% GST</p>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={!selectedFile || submitting || printOptions.copies < 1 || printOptions.totalPages < 1}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                    >
                      {submitting ? (
                        <span className="flex items-center justify-center gap-3">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          {uploading ? 'Uploading...' : 'Creating Order...'}
                        </span>
                      ) : (
                        '🚀 Submit Print Order'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
