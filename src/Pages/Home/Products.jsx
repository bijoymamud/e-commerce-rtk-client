import React from 'react'
import Container from '../../Layout/Container/Container'
import { useGetProductsQuery } from '../redux/features/api/productApi'
import { DollarSign, DollarSignIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const Products = () => {

    const { data: products, isLoading, isError, error } = useGetProductsQuery()
    
    if (isLoading) {
        return <span className="loading loading-bars loading-lg flex items-center justify-center mt-8 mx-auto"></span>

    }

  return (
    <section className='py-8 md:py-20'>
      <Container>
              <h1 className='text-2xl pb-5 font-semibold uppercase '>Products:</h1>
              
              {/* showing products */}
              
              <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
                  
                  {
                      products && 
                      products.map((product) =><div key={product._id} className="card bg-base-100 shadow-xl">
                      <figure>
                              <img
                                  className='w-[200px] h-[200px]'
                                  src={ product.img} />
                      </figure>
                      <div className=" p-5">
                        <h2 className="card-title">
                          {product.name}
                          
                        </h2>
                              <p>Brand: <span className='font-semibold'>{ product.brand}</span></p>
                              <p>Price: <span className='font-semibold'>${ product.price}</span>
                              </p>
                        <Link className="card-actions justify-end mt-5">
                          <button className=" px-3  py-1 border border-amber-600 shadow-md font-semibold rounded-md text-sm text-amber-500">Add Cart</button>
                         
                        </Link>
                      </div>
                    </div>)
                  }
                  
              </div>

          </Container>
    </section>
  )
}

export default Products
