import { useLoaderData } from "react-router";

export default function Cart() {
    const data = useLoaderData();

    console.log('inside component', data);

    return (
        <ul>
            {data.map((item) => <li key={item.id}>{item.title}</li>)}
        </ul>
    )
}