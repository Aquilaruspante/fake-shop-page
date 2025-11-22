import { useLoaderData } from "react-router";
import { getCart } from "../../cartManager";

export function loader() {
    const items = getCart();

    return items;
};

export default function Cart() {
    const data = useLoaderData();

    console.log('inside component', data);

    return (
        <ul>
            {data.map((item) => <li key={item.id}>{item.title}</li>)}
        </ul>
    )
}