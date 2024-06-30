import { Link } from "react-router-dom";

function Comic({ data }) {
    return (
        <div className="lg:w-[12.5%] mobile:w-[50%] flex-shrink-0 px-[8px] transition-all relative overflow-hidden group hover:translate-y-[-8px] duration-300 ">
            <Link className="overflow-hidden" to={`/info/${data?.slug}`}>
                <figure className="h-[260px] rounded-[8px] overflow-hidden transition-all border border-solid border-[#e2e2e2] group-hover:hover:shadow-comic group-hover:opacity-[.8]">
                    <img src={`https://otruyenapi.com/uploads/comics/${data?.thumb_url}`} alt={data?.name} />
                </figure>
                <h4 className="custom-clamp mt-[12px] transition-all duration-300 group-hover:text-[#10b981] font-[600]">{data?.name}</h4>
            </Link>
        </div>
    );
}

export default Comic;