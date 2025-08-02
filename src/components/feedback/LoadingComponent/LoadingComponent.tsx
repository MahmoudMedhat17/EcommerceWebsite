
interface IloadingComponent {
  status: 'Idle' | 'Pending' | 'Succeeded' | 'Failed';
  error: null | string;
  children: React.ReactNode;
};


const LoadingComponent = ({ status, error, children }: IloadingComponent) => {

  // Here we check if the Status of the data is Pending or Idle then show for the user the Loading...
  if (status === "Pending" || status === "Idle") {
    return <div className="text-2xl font-semibold text-center">Loading...</div>
  }


  // Here we check if the Status of the data is Failed to call then show for the user the Error.
  if (status === "Failed") {
    return <div className="text-2xl font-semibold text-center">{error}</div>
  }

  // Here we check if the Status of the data is Succeeded then show for the user the data.
  if (status === "Succeeded") {
    // Here we return the children under this component "The data called from the API".
    return <>{children}</>
  }

};

export default LoadingComponent;