interface IProductInfo {
  title: string | undefined;
  image: string | undefined;
  price: number | undefined;
  quantity?: number | undefined;
  direction: "row" | "column";
  children?: React.ReactNode;
};

const ProductInfo = ({ title, image, price, quantity, direction = "row", children }: IProductInfo) => {
  return (
    <div className={`relative flex ${direction === "column" ? `flex flex-col space-y-2 w-fit relative` : `flex flex-row justify-between border-b-2 border-gray-300 my-4`}`}>
      <div className={`${direction === "row" ? `flex gap-4 mb-4` : ``}`}>
        <img src={image} className={` ${direction === "column" ? `h-36 mx-auto` : `w-32 h-36`}`} />
        {
          direction === "column" ?
            (
              <>
                <h2 className="font-semibold">
                  {title}
                </h2>
                <p className="font-medium">
                  {price} EGP
                </p>
                <p className="font-medium">quantity: {quantity}</p>
              </>
            )
            :
            (
              <div className="flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="font-medium">{price} EGP</p>
                  <p className="font-medium">quantity: {quantity}</p>
                </div>
              </div>
            )
        }
      </div>
      {children}
    </div>
  )
}

export default ProductInfo;