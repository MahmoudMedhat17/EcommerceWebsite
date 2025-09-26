// A component to use multiple times instead of writing the same component in different pages.

// Here we pass to this component props instead of children to avoid multiple renders for no reason as children is dynamic so every re render in the states re render this component.
const Headingcomponent = ({title}:{title:string}) => {
    return <h2 className="mb-8 mt-4 font-semibold text-xl">{title}</h2>
};

export default Headingcomponent;