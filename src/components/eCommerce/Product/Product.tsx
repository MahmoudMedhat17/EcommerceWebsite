import type {TProducts} from "@/types/Products"; 



const Product = ({title, price, img}: TProducts) => {
  return (
    <div>
      <img src={img} />
      <h2>{title}</h2>
      <h3>{price}EGP</h3>
      <button>
        Add to cart
      </button>
    </div>
  )
}

export default Product;