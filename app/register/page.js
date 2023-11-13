import { cookies } from "next/dist/client/components/headers"

export default function Register() {

    let cookie = cookies().get('visited');
    return (
        <div>{cookie}</div>
    )
}