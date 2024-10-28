import { useEffect, useRef, useState } from 'react';
import { FaPlus, FaRedoAlt } from 'react-icons/fa';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { app } from '../../store/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ImCross } from "react-icons/im";

export default function AddProduct() {
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({ imageUrls: [], categories: [] });
  const [imageUrls, setImageUrls] = useState([]);
  const fileRef = useRef();
  const [availableCategories, setAvailableCategories] = useState([]);
  const newCategory = useRef();
  const [msg, setMsg] = useState('')

  const handleAddProduct = async (formEntries) => {
    try {
      const response = await fetch('/api/admin/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formEntries),
      });

      const data = await response.json();
      setMsg(data.msg)
      if (!response.ok) {
        throw new Error(data.message || `Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Add failed:', error.message);
    }
  };

  const handleImageSubmit = async () => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (files.length > 0 && files.length <= 4) {
          const promises = files.map(file => storeImage(file));
          try {
            const urls = await Promise.all(promises);
            setImageUrls(urls);
            setFormData({ ...formData, imageUrls: [...formData.imageUrls, ...urls] });
          } catch (error) {
            console.error('Error uploading images:', error);
          }
        } else {
          setErrorMessage("Please select up to 4 images.");
        }
      } else {
        setErrorMessage("You must be logged in to upload images.");
        console.error("User is not authenticated");
      }
    });
  };

  const storeImage = (file) => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject('File is not an image');
        return;
      }
      const storage = getStorage(app);
      const fileName = `${new Date().getTime()}_${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed', null,
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formEntries = Object.fromEntries(new FormData(e.target).entries());
    formEntries.sizes = new FormData(e.target).getAll('sizes');
    formEntries.imageUrls = formData.imageUrls;
    formEntries.categories = formData.categories;
    handleAddProduct(formEntries);
  };

  const handleSelectAllSizes = () => {
    document.querySelectorAll('input[name="sizes"]').forEach((checkbox) => {
      checkbox.checked = true;
    });
  };

  const handleCategorySelect = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory && !formData.categories.includes(selectedCategory)) {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, selectedCategory],
      }));
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter(category => category !== categoryToRemove),
    }));
  };

  const handleReset = () => {
    document.querySelector('form').reset();
    setFiles([]);
    setErrorMessage("");
    setFormData({ imageUrls: [], categories: [] });
    setImageUrls([]);
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
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/get-category', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      let catArray = [];
      for (let category of data.categories) {
        catArray.push(category.name)
      }
      setAvailableCategories(catArray)
      if (!response.ok) {
        throw new Error(data.message || `Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('category fetch failed:', error.message);
    }
  }
  const addNewCategory = async (categoryName) => {
    newCategory.current.value = ''
    try {
      const response = await fetch('/api/admin/add-category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: categoryName })
      });

      const data = await response.json();
      if (data) {
        fetchCategories()
      }
    } catch (error) {
      console.error('Category add failed:', error.message);
    }
  };
  useEffect(() => {
    fetchCategories()
  }, [])
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
            <label className="block mb-1 font-medium">Discount Percentage</label>
            <input
              type="number"
              name="discountPercentage"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className='flex justify-between items-center gap-3'>
          <div className='w-[60%]'>
            <label className="block mb-1 font-medium">Categories</label>
            <select
              onChange={handleCategorySelect}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option  >
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="mt-2 text-gray-700">
              <ul className='flex gap-6'>
                {formData.categories.map((category) => (
                  <li key={category} className="flex justify-between items-center">
                    {category}
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(category)}
                      className="ml-2 text-xs"
                    >
                      <ImCross />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='w-[40%]'>
            <label className=" mb-1 font-medium">Add new Category</label>
            <div className='flex gap-2'>
              <input ref={newCategory}
                type="text"
                name="newAddCategory"
                className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="p-2 bg-blue-400 text-white rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => addNewCategory(newCategory.current.value)}
              >
                Add
              </button>
            </div>
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
        <label className="block mb-1 font-medium">Product Images (up to 4)</label>
        <div className='flex gap-2'>
          <input
            type="file"
            accept="image/*"
            multiple
            className="w-[50%] p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ref={fileRef}
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={handleImageSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Upload Images
          </button>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className='flex gap-3'>
          {imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Uploaded ${index}`} className="rounded-md w-[10%]" />
          ))}
        </div>
        <p>{msg}</p>
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
