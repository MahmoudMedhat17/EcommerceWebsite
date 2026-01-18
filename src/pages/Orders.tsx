import { useEffect } from "react";
import getOrders from "@/store/orders/thunk/getOrders";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import Headingcomponent from "@/components/eCommerce/HeadingComponent/Headingcomponent";
import { LoadingComponent } from "@/components/feedback";

const Orders = () => {

  const { loading, error, userOrders } = useAppSelector((state) => state.orders);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(getOrders());

    return () => promise.abort();
  }, [dispatch]);

  return (
    <>
      <Headingcomponent title="Orders" />
      <LoadingComponent status={loading} error={error} loadingType="orders">
        <table className="min-w-full divide-y-2 divide-gray-200">
          <thead className="ltr:text-left rtl:text-right">
            <tr className="*:font-medium *:text-gray-900">
              <th className="px-3 py-2 whitespace-nowrap">Order Number</th>
              <th className="px-3 py-2 whitespace-nowrap">Items</th>
              <th className="px-3 py-2 whitespace-nowrap">Total Price</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            <tr className="*:text-gray-900 *:first:font-medium">
              {
                userOrders.map((order) => (
                  <>
                    <td className="px-3 py-2 whitespace-nowrap">{order.userId}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{order.items.length} item(s) {"/"} <span className="underline">Product Details</span></td>
                    <td className="px-3 py-2 whitespace-nowrap">{order.subTotal}</td>
                  </>
                ))
              }
            </tr>
          </tbody>
        </table>
      </LoadingComponent>
    </>
  )
}

export default Orders;