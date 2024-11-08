import React, { useState } from 'react';
import Container from '../../Layout/Container/Container';
import { useGetProductsQuery, useDeleteProductMutation } from '../redux/features/api/productApi';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Edit, Heart, HeartOff } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

const Products = () => {
  const { data: products, isLoading, isError, error } = useGetProductsQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState([]);

  // Toggle favourite status
  const toggleFavourite = (id) => {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  // Handle delete product
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success('Product deleted successfully');
    } catch (err) {
      toast.error('Failed to delete product');
      console.error('Failed to delete the product:', err);
    }
  };

  if (isLoading) {
    return <span className="loading loading-bars loading-lg flex items-center justify-center mt-8 mx-auto"></span>;
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center">
        Failed to load products: {error?.message || 'Unknown error'}
      </p>
    );
  }

  return (
    <section className="py-8 md:py-20">
      <Toaster position="top-right" />
      <Container>
        <h1 className="text-2xl pb-5 font-semibold uppercase">Products:</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {products &&
            products.map((product) => (
              <div key={product._id} className="card bg-base-100 shadow-xl relative">
                <figure>
                  <img
                    className="w-[200px] h-[200px] object-cover"
                    src={product.img}
                    alt={product.name}
                  />
                </figure>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2">
                  {/* Delete Button */}
                  <button
                    className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 disabled:opacity-50"
                    onClick={() => handleDelete(product._id)}
                    disabled={isDeleting}
                    title="Delete"
                    aria-label={`Delete ${product.name}`}
                  >
                    <Trash2 size={16} />
                  </button>

                  {/* Edit Button */}
                  <button
                    className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600"
                    onClick={() => navigate(`/edit-product/${product._id}`)}
                    title="Edit"
                    aria-label={`Edit ${product.name}`}
                  >
                    <Edit size={16} />
                  </button>

                  {/* Favourite Button */}
                  <button
                    className={`p-1 rounded-full ${
                      favourites.includes(product._id) ? 'bg-yellow-400' : 'bg-gray-300'
                    }`}
                    onClick={() => toggleFavourite(product._id)}
                    title="Favourite"
                    aria-label={`${favourites.includes(product._id) ? 'Remove from' : 'Add to'} favorites`}
                  >
                    {favourites.includes(product._id) ? <Heart size={16} /> : <HeartOff size={16} />}
                  </button>
                </div>

                <div className="p-5">
                  <h2 className="card-title">{product.name}</h2>
                  <p>Brand: <span className="font-semibold">{product.brand}</span></p>
                  <p>Price: <span className="font-semibold">${product.price}</span></p>
                  <Link className="card-actions justify-end mt-5">
                    <button className="px-3 py-1 border border-amber-600 shadow-md font-semibold rounded-md text-sm text-amber-500">
                      Add to Cart
                    </button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </Container>
    </section>
  );
};

export default Products;