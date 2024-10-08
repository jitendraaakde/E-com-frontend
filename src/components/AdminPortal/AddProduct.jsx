import { useEffect, useRef, useState } from 'react';
import { FaPlus, FaRedoAlt } from 'react-icons/fa';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { app } from '../../store/firebase';

export default function AddProduct() {
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({ imageUrls: [] });
  const fileRef = useRef();
  console.log('image', files)
  console.log('formData', formData)

  const handleImageSubmit = async () => {
    if (files.length > 0 && files.length <= 4) {
      console.log('storeimage', files)
      const promises = files.map(file => storeImage(file));
      try {
        const urls = await Promise.all(promises);
        setFormData({ ...formData, imageUrls: [...formData.imageUrls, ...urls] });
      } catch (error) {
        console.error('Error uploading images:', error);
      }
    }
  };

  const storeImage = (file) => {
    console.log('store image', file)
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = `${new Date().getTime()}_${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed', null,
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).
            then((downloadUrl) => {
              console.log('Tanishq', downloadUrl)
              resolve(downloadUrl)
            });
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formEntries = Object.fromEntries(new FormData(e.target).entries());
    formEntries.sizes = new FormData(e.target).getAll('sizes');
    await handleImageSubmit();
    formEntries.imageUrls = formData.imageUrls;

    console.log('Submitting product:', formEntries);
  };

  const handleSelectAllSizes = () => {
    document.querySelectorAll('input[name="sizes"]').forEach((checkbox) => {
      checkbox.checked = true;
    });
  };

  const handleReset = () => {
    document.querySelector('form').reset();
    setFiles([]);
    setErrorMessage("");
    setFormData({ imageUrls: [] });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 4) {
      setErrorMessage("You can upload a maximum of 4 images.");
      setFiles([]);
    } else {
      setErrorMessage("");
      setFiles(selectedFiles);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Brand</label>
            <input
              type="text"
              name="brand"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          ></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              name="price"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">MRP</label>
            <input
              type="number"
              name="mrp"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Discount Percentage</label>
            <input
              type="number"
              name="discount"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a category</option>
              <option value="shirts">Shirts</option>
              <option value="trousers">Trousers</option>
              <option value="dresses">Dresses</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Available Sizes</label>
          <div className="flex flex-wrap gap-4">
            {['S', 'M', 'L', 'XL', '2XL', '3XL'].map((size) => (
              <label key={size} className="flex items-center">
                <input
                  type="checkbox"
                  name="sizes"
                  value={size}
                  className="mr-2"
                />
                {size}
              </label>
            ))}
          </div>
          <button
            type="button"
            onClick={handleSelectAllSizes}
            className="mt-2 px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Select All
          </button>
        </div>
        <div>
          <label className="block mb-1 font-medium">Stock Quantity</label>
          <input
            type="number"
            name="stock"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Product Images (up to 4)</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ref={fileRef}
            onChange={handleFileChange}
          />
          {errorMessage && (
            <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
          )}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FaPlus className="inline mr-1" />
            Add Product
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <FaRedoAlt className="inline mr-1" />
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
