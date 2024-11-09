

import React, { useState } from 'react';
import Container from '../../Layout/Container/Container';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Edit, Heart, HeartOff } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { useDeleteProductMutation, useGetProductsQuery } from '../redux/features/api/productApi';
import Swal from 'sweetalert2';

const Products = () => {
  const { data: products, isLoading, isError, error, refetch } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState([]);
  const [deletingProducts, setDeletingProducts] = useState([]);

  const toggleFavourite = (id) => {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setDeletingProducts((prev) => [...prev, id]);
        deleteProduct(id)
          .unwrap()
          .then((res) => {
            if (res && res.deletedCount > 0) {
              // Optimistically update the UI
              const updatedProducts = products.filter(product => product._id !== id);
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Item has been removed from the cart.",
                icon: "success",
              });
            } else {
              throw new Error('Failed to delete product');
            }
          })
          .catch((err) => {
            console.error('Delete error:', err);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the product. Please try again.",
              icon: "error",
            });
          })
          .finally(() => {
            setDeletingProducts((prev) => prev.filter(productId => productId !== id));
          });
      }
    });
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
      
        <div className='flex items-center justify-between'>
          <h1 className="text-2xl pb-5 font-semibold uppercase">Products:</h1>
          
          <div>
            <Link to="/addProducts" className='border-2 border-yellow-500 p-2 rounded-md font-semibold hover:bg-gray-300'>Add Products</Link>
         </div>
        </div>

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

                <div className="absolute top-3 right-3 flex flex-col space-y-2">
                  <button
                    className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 disabled:opacity-50"
                    onClick={() => handleDelete(product._id)}
                    disabled={deletingProducts.includes(product._id)}
                    title="Delete"
                    aria-label={`Delete ${product.name}`}
                  >
                    <Trash2 size={16} />
                  </button>

                  <button
                    className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600"
                    onClick={() => navigate(`/edit-product/${product._id}`)}
                    title="Edit"
                    aria-label={`Edit ${product.name}`}
                  >
                    <Edit size={16} />
                  </button>

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
                  {/* <Link className="card-actions justify-end mt-5">
                    <button className="px-3 py-1 border border-amber-600 shadow-md font-semibold rounded-md text-sm text-amber-500">
                      Add to Cart
                    </button>
                  </Link> */}
                </div>
              </div>
            ))}
        </div>
      </Container>
    </section>
  );
};

export default Products;