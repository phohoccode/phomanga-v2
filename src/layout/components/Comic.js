import { Link } from "react-router-dom";

function Comic({ data }) {
    return (
        <div className="lg:w-[12.5%] mobile:w-[50%] flex-shrink-0 px-[8px] transition-all relative overflow-hidden">
            <Link to={`/info/${data?.slug}`}>
                <figure className="h-[260px] rounded-[8px] overflow-hidden transition-all">
                    <img src={`https://otruyenapi.com/uploads/comics/${data?.thumb_url}`} alt={data?.name}/>
                </figure>
                <h4 className="mt-[12px]">{data?.name}</h4>
            </Link>
        </div>
    );
}

export default Comic;