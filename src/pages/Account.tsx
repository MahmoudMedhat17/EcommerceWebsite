import { useAppSelector } from "@/store/hooks";
import Headingcomponent from "@/components/eCommerce/HeadingComponent/Headingcomponent";

const Account = () => {

  // Here we get the user from the authSlice so we can use the user props to display his / her info.
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      <Headingcomponent title="Account Info." />
      <div className="flex flex-col gap-4">
        {/* Here we display the user info using the user coming from the authslice. */}
        <p>
          First Name: {user?.firstName}
        </p>
        <p>
          Last Name: {user?.lastName}
        </p>
        <p>
          Email: {user?.email}
        </p>
      </div>
    </>
  )
}

export default Account;