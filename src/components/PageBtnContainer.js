import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { useDispatch, useSelector } from 'react-redux'
import { changePage } from '../features/allJobs/allJobsSlice'

//Navigation page component.
const PageBtnContainer = () => {
  //Destructure num of pages and page from allJobs store.
  const { numOfPages, page } = useSelector((store) => store.allJobs);
  //Dispatch declaration
  const dispatch = useDispatch();

  //Create an array from jobs pages quantityfetched
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  })

  //Next page handle calling dispatch to run changePage passing desired page to reducer.
  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    dispatch(changePage(newPage));
  };

  //Previous page handle calling dispatch to run changePage passing desired page to reducer.
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    dispatch(changePage(newPage));
  };

  return (
    <Wrapper>
      {/*Previous button*/}
      <button type="button" className='prev-btn' onClick={prevPage}><HiChevronDoubleLeft /></button>
      {/*Pages buttons*/}
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            /*Page button. Set active class to highlight current page.*/
            <button type="button" key={pageNumber} className={pageNumber === page ? 'pageBtn active' : 'pageBtn'} onClick={() => dispatch(changePage(pageNumber))}>{pageNumber}</button>
          )
        })}
      </div>
      {/*Next button*/}
      <button type="button" className='next-btn' onClick={nextPage}><HiChevronDoubleRight /></button>
    </Wrapper>
  )
}

export default PageBtnContainer