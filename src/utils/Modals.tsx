
interface IModals{
  setShowModal: (value:boolean) => void;
}


const Modals = ({setShowModal}:IModals) => {


  // Here we get the setShowModal as props from Product component so we can control the open and close functionality of the Modal.
  const handleOnClose = () => {
    setShowModal(false);
  };

  
  
  return (
    <div onClick={handleOnClose} className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 id="modalTitle" className="text-xl font-bold text-gray-900 sm:text-2xl">Login Required!</h2>

        <div className="mt-4">
          <p className="text-pretty text-gray-700">
            You need to login first to add any product to your wishlist.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Modals;