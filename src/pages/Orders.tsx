import Headingcomponent from "@/components/eCommerce/HeadingComponent/Headingcomponent";
import { LoadingComponent } from "@/components/feedback";
import { ProductInfo } from "@/components/eCommerce";
import useOrders from "@/hooks/useOrders";

const Orders = () => {

  // a custom hook that contains all the logic of this component.
  const { loading, userOrders, error, showModal, orderDetails, handleModal, handleOrderDetails } = useOrders();

  return (
    <>
      <Headingcomponent title="Orders" />

      {
        // Here if showModal is set to true then show the Modal, if it's false then close the Modal.
        showModal &&
        <div onClick={handleModal} className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
          <div className="w-full max-w-5xl max-h-[60vh] overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
            <h2 id="modalTitle" className="text-xl font-bold text-gray-900 sm:text-2xl">Order Details</h2>

            {/* Here we loop over a resuable component "ProductInfo" and use it to show the Order Details and pass to it's required props. */}
            <div className="mt-4">
              {orderDetails.map((order) => (
                <ProductInfo key={order.id} title={order.title} image={order.img} price={order.price} quantity={order.quantity} direction="row" />
              ))}
            </div>
          </div>
        </div>
      }

      <LoadingComponent status={loading} error={error} loadingType="orders">
        <table className="min-w-full divide-y-2 divide-gray-200">
          <thead className="ltr:text-left rtl:text-right">
            <tr className="*:font-medium *:text-gray-900">
              <th className="px-3 py-2 whitespace-nowrap">Order Number</th>
              <th className="px-3 py-2 whitespace-nowrap">Items</th>
              <th className="px-3 py-2 whitespace-nowrap">Total Price</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 ">
            {
              userOrders.map((order) => (
                <tr className="*:text-gray-900 *:first:font-medium">
                  <td className="px-3 py-2 whitespace-nowrap">{order.userId}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{order.items.length} item(s) {"/"} <span onClick={() => handleOrderDetails(order.userId)} className="underline cursor-pointer">Product Details</span></td>
                  <td className="px-3 py-2 whitespace-nowrap">{order.subTotal} EGP</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </LoadingComponent>
    </>
  )
}

export default Orders;