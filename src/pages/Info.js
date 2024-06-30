import useFetch from "../hooks/UseFetch";
import { useParams } from "react-router-dom";

function Info() {
    const params = useParams()
    const [data] = useFetch(`https://otruyenapi.com/v1/api/truyen-tranh/${params.slug}`)

    return (
        <div>Info</div>
        
     );
}

export default Info;