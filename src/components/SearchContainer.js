import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../assets/wrappers/SearchContainer'
import { FormRow, FormRowSelect } from './'
import { clearFilters, handleChange } from '../features/allJobs/allJobsSlice';
import { useMemo, useState } from 'react';

//Search container with job filters.
const SearchContainer = () => {
    //Destructure state parameters from allJobs store.
    const { isLoading, searchStatus, searchType, sort, sortOptions } = useSelector((store) => store.allJobs);
    //Destructure state parameters from job.
    const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);
    //Dispatch decaration
    const dispatch = useDispatch();
    //localSearch state variable to store search field value
    const [localSearch, setLocalSearch] = useState('');

    //Function to send API request after 1 second search field onChange event stops.
    const debounce = () => {
        let timeoutId;
        return (e) => {
            //Capture search field value.
            setLocalSearch(e.target.value);
            //Clear prev timeout event
            clearTimeout(timeoutId);
            //Call dispatch to store new search field value after 1 second.
            timeoutId = setTimeout(() => {
                dispatch(handleChange({ name: e.target.name, value: e.target.value }));
            }, 1000);
        }
    }

    //Function to handle search filters form fields value change.
    const handleSearch = (e) => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }));
    }

    //Function yo set local search to an empty string and clear filters to default value.
    const handleSubmit = (e) => {
        e.preventDefault();
        setLocalSearch('');
        dispatch(clearFilters());
    }

    //useMemo to run debounce function if the return value is different at the stored in cache.
    const optimizedDebounce = useMemo(() => debounce(), []);

    return (
        <Wrapper>
            {/*Search filters form*/}
            <form className="form">
                <h4>Search Form</h4>
                <div className="form-center">
                    {/*Search field*/}
                    <FormRow type='text' name='search' value={localSearch} onChange={optimizedDebounce} />
                    {/*Status select field*/}
                    <FormRowSelect labelText='status' name='searchStatus' value={searchStatus} onChange={handleSearch} list={['all', ...statusOptions]} />
                    {/*Type select field*/}
                    <FormRowSelect labelText='type' name='searchType' value={searchType} onChange={handleSearch} list={['all', ...jobTypeOptions]} />
                    {/*Sort select field*/}
                    <FormRowSelect name='sort' value={sort} onChange={handleSearch} list={sortOptions} />
                    {/*Clear filters button*/}
                    <button type="button" className='btn btn-block btn-danger' disabled={isLoading} onClick={handleSubmit}>Clear Filters</button>
                </div>
            </form>
        </Wrapper>
    )
}

export default SearchContainer