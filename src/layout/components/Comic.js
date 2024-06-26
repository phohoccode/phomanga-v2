import { Link } from "react-router-dom";

function Comic({ data }) {
    return (
        <div className="w-[12.5%] flex-shrink-0 px-[8px] transition-all relative overflow-hidden">
            <Link to={`/info/${data?.slug}`}>
                <figure className="h-[260px] rounded-[8px] overflow-hidden transition-all">
                    <img src={`https://otruyenapi.com/uploads/comics/${data?.thumb_url}`} alt={data?.name}/>
                </figure>
            </Link>
        </div>
    );
}

export default Comic;