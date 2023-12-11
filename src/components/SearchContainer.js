import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../assets/wrappers/SearchContainer'
import { FormRow, FormRowSelect } from './'
import { clearFilters, handleChange } from '../features/allJobs/allJobsSlice';
import { useMemo, useState } from 'react';

const SearchContainer = () => {
    const { isLoading, search, searchStatus, searchType, sort, sortOptions } = useSelector((store) => store.allJobs);
    const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);
    const dispatch = useDispatch();
    const [localSearch, setLocalSearch] = useState('');

    const debounce = () => {
        let timeoutId;
        return (e) => {
            setLocalSearch(e.target.value);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                dispatch(handleChange({ name: e.target.name, value: e.target.value }));
            }, 1000);
        }
    }

    const handleSearch = (e) => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(clearFilters());
    }

    const optimizedDebounce = useMemo(() => debounce(), []);

    return (
        <Wrapper>
            <form className="form">
                <h4>Search Form</h4>
                <div className="form-center">
                    <FormRow type='text' name='search' value={localSearch} onChange={optimizedDebounce} />
                    <FormRowSelect labelText='status' name='searchStatus' value={searchStatus} onChange={handleSearch} list={['all', ...statusOptions]} />
                    <FormRowSelect labelText='type' name='searchType' value={searchType} onChange={handleSearch} list={['all', ...jobTypeOptions]} />
                    <FormRowSelect name='sort' value={sort} onChange={handleSearch} list={sortOptions} />
                    <button type="button" className='btn btn-block btn-danger' disabled={isLoading} onClick={handleSubmit}>Clear Filters</button>
                </div>
            </form>
        </Wrapper>
    )
}

export default SearchContainer