export function AlbumFilter({filters,album,onChange,resultsId='gallery-results'}:{filters:{value:string;label:string}[];album:string;onChange:(value:string)=>void;resultsId?:string}){
 return <div className="album-filter" role="group" aria-label="Filter gallery albums">{filters.map(filter=><button key={filter.value} type="button" className="album-pill" aria-pressed={album===filter.value} aria-controls={resultsId} onClick={()=>onChange(filter.value)}>{filter.label}</button>)}</div>;
}
