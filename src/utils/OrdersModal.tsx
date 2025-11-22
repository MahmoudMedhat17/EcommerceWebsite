

// Here we want handleModal, handlePlaceOrder, subTotal as props coming from the cart component to use them here in this component.
interface IOrdersModal{
    handleModal: () => void;
    handlePlaceOrder: () => void;
    subTotal: number;
    orderLoading: string;
};




const OrdersModal = ({handleModal, handlePlaceOrder, subTotal, orderLoading}:IOrdersModal) => {
    return (
        <div className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h2 id="modalTitle" className="text-xl font-bold text-gray-900 sm:text-2xl">Placing Order</h2>

                <div className="mt-4">
                    <p className="text-pretty text-gray-700">
                        Are you sure you want to place an order with subtotal of <strong>{ subTotal } EGP</strong> ?
                    </p>
                </div>

                <footer className="mt-6 flex justify-end gap-2">
                    <button type="button" onClick={handleModal} className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200">
                        Cancel
                    </button>

                    <button type="button" onClick={handlePlaceOrder} className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                        {
                            orderLoading === "Pending" ?
                                (
                                    "Loading..."
                                )
                                :
                                (
                                    "Done"
                                )
                        }
                    </button>
                </footer>
            </div>
        </div>
    )
}

export default OrdersModal;