import Input from "../input/input-component";
import "./filter-bar.css";

const FilterBar = (props) => {
  return (
    <div className="filter-bar">
      <Input
        type="search"
        value={props.searchTerms}
        onChange={(e) => props.setParam("searchTerms", e.target.value)}
        placeholder="Search By Name"
      />
    </div>
  );
};

export default FilterBar;
