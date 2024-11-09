import React from 'react'
import Container from '../../Layout/Container/Container'
import { useForm } from 'react-hook-form'

const AddProducts = () => {

    const {register, handleSubmit,  formState: { errors }, reset} = useForm()
    

    const onSubmit = (data) => {
        console.log(data)
        reset()
      }

  return (
      <Container>
          <div>
              <h2>This is add Product page</h2>
              
              <form onSubmit={handleSubmit(onSubmit)}>
     
                  <input
                        className="input input-bordered input-info w-full max-w-xs" 
                      {...register("productName", { required: true })} />
                 {errors.productName && <span>This field is required</span>}

                  
                  <input
                      className="input input-bordered input-info w-full max-w-xs"
                      {...register("test", { required: true })} />
                  
                  {errors.test && <span>This field is required</span>}
                  


                    <input className='btn btn-primary' type="submit" />
    </form>
    </div>
    </Container>
  )
}

export default AddProducts
