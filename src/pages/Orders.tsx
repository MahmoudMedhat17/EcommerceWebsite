import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import getOrders from "@/store/orders/thunk/getOrders";
import Headingcomponent from "@/components/eCommerce/HeadingComponent/Headingcomponent";


const Orders = () => {


  const dispatch = useAppDispatch();

  const { loading, orders, error } = useAppSelector((state) => state.orders);


  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch]);

  return (
    <>
      <Headingcomponent title="Orders" />

      <div className="overflow-x-auto">
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
              <td className="px-3 py-2 whitespace-nowrap">Nandor the Relentless</td>
              <td className="px-3 py-2 whitespace-nowrap">04/06/1262</td>
              <td className="px-3 py-2 whitespace-nowrap">Vampire Warrior</td>
            </tr>

            <tr className="*:text-gray-900 *:first:font-medium">
              <td className="px-3 py-2 whitespace-nowrap">Laszlo Cravensworth</td>
              <td className="px-3 py-2 whitespace-nowrap">19/10/1678</td>
              <td className="px-3 py-2 whitespace-nowrap">Vampire Gentleman</td>
            </tr>

            <tr className="*:text-gray-900 *:first:font-medium">
              <td className="px-3 py-2 whitespace-nowrap">Nadja</td>
              <td className="px-3 py-2 whitespace-nowrap">15/03/1593</td>
              <td className="px-3 py-2 whitespace-nowrap">Vampire Seductress</td>
            </tr>
          </tbody>
        </table>
      </div>

    </>
  )
}

export default Orders;