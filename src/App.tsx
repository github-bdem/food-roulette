import GithubLink from "@components/GithubLink/GithubLink";
import PizzaMapContextProvider from "@components/SharedContexts/PizzaMapContextProvider";
import PizzaMap from "./components/PizzaMap/PizzaMap";

function App() {
    return (
        <>
            <GithubLink />
            <PizzaMap />
        </>
    );
}

export default App;
