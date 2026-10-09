import { useId } from "react";
import { TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { BrandSelect } from "../ui/BrandSelect";
import { eventFilters, type EventFilterState } from "../../lib/events";
export function EventFilter({ filters, years, hasSocial, onChange, resultsId }: {filters:EventFilterState;resultsId:string;years:string[];hasSocial:boolean;onChange:(state:EventFilterState)=>void}) {
 const id=useId();
 return <div className="event-filter">
   <TabsList className="event-filter-tabs" aria-label="Filter events">{[...eventFilters,...(hasSocial?[{value:"social",label:"Social"}]:[])].map(({value,label})=><TabsTrigger key={value} value={value} aria-controls={resultsId} className="event-filter-pill">{label}</TabsTrigger>)}</TabsList>
  <div className="event-search-row"><div><label htmlFor={`${id}-search`}>Search events</label><Input id={`${id}-search`} type="search" className="event-search" placeholder="Search by topic, title or tag" value={filters.query} onChange={event=>onChange({...filters,query:event.target.value})}/></div>
   <div><label htmlFor={`${id}-year`}>Year</label><BrandSelect id={`${id}-year`} className="event-year" value={filters.year} onValueChange={year=>onChange({...filters,year})} options={[{value:"all",label:"All years"},...years.map(year=>({value:year,label:year}))]}/></div>
  </div>
 </div>;
}
