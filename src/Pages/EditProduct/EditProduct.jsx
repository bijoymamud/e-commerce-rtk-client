import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../redux/features/api/productApi";

const EditProduct = () => {
    const { id } = useParams();
    const { data: product, isLoading, isError } = useGetSingleProductQuery(id);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Product not found or an error occurred.</p>;

    return (
        <div>
            <h2>This is the edit products page</h2>
            <p>{product ? product.name : 'No product data'}</p>
        </div>
    );
};

export default EditProduct;