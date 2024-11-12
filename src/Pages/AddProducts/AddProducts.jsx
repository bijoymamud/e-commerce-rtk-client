import React from 'react';
import { useForm } from 'react-hook-form';
import { useAddProductsMutation } from '../redux/features/api/productApi';

const AddProducts = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [addProduct, { isLoading, isError, isSuccess }] = useAddProductsMutation();


const onSubmit = async (data) => {
    console.log(data);

    try {
      await addProduct(data);
      reset(); 
      alert('Product added successfully!');
    } catch (error) {
      console.error('Failed to add product:', error);
    }

  };
  

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
 
        <div>
          <label className="block font-medium">Product Name</label>
          <input
            type="text"
            {...register('name', { required: 'Product name is required' })}
            className="w-full p-2 border rounded"
            placeholder="Enter product name"
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </div>

        <div>
          <label className="block font-medium">Brand</label>
          <input
            type="text"
            {...register('brand', { required: 'Product brand name is required' })}
            className="w-full p-2 border rounded"
            placeholder="Enter product brand name"
          />
          {errors.brand && <span className="text-red-500">{errors.brand.message}</span>}
        </div>

        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            {...register('price', { required: 'Price is required' })}
            className="w-full p-2 border rounded"
            placeholder="Enter price"
          />
          {errors.price && <span className="text-red-500">{errors.price.message}</span>}
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <input
            {...register('category', { required: 'Category is required' })}
            className="w-full p-2 border rounded"
            placeholder="Enter description"
          ></input>
          {errors.category && <span className="text-red-500">{errors.category.message}</span>}
        </div>

        <div>
          <label className="block font-medium">Image URL</label>
          <input
            type="text"
            {...register('img', { required: 'Image URL is required' })}
            className="w-full p-2 border rounded"
            placeholder="Enter image URL"
          />
          {errors.img && <span className="text-red-500">{errors.img.message}</span>}
        </div>
       
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Product'}
        </button>

   
        {isSuccess && <p className="text-green-500">Product added successfully!</p>}
        {isError && <p className="text-red-500">Failed to add product. Please try again.</p>}
      </form>
    </div>
  );
};

export default AddProducts;
