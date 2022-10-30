import React from 'react'
import { useGlobalContext } from '../context';



const PageNavigation = () => {
    const {totalProductCount, pageNo , setPageNo} = useGlobalContext()
    const limit = 12
    let noOfPages = totalProductCount/limit
    if(!Number.isInteger(noOfPages)) noOfPages++;
    noOfPages = Math.floor(noOfPages)
    let pagesArray = []
    for(let i = 1 ; i <= noOfPages; i++) pagesArray.push(i)

    const increasePageNo = ()=>{
        let page = pageNo
        if(page === noOfPages){
            page = 1
        }
        else{
            page++;
        }
        setPageNo(page)
    }

    const decreasePageNo = ()=>{
        let page = pageNo
        if(page === 1){
            page = noOfPages
        }
        else{
            page--;
        }
        setPageNo(page)
    }

    


  return (
    <div className="page-nav-container">
      <h5>{`Page ${pageNo} of ${noOfPages}`}</h5>
      <div className="prev-next-page-container">
        <button className={pageNo === 1 ? 'boundaryPage' : 'prev-btn'} onClick={decreasePageNo}>prev</button>
        <div className="pages-array">
          {
            pagesArray.map((item,index)=>{
                return <p key={index} className={pageNo-1 === index && 'active-page'}  onClick={()=>{
                    setPageNo(item)
                }}>{item}</p>
            })
          }
        </div>
        <button className={pageNo === noOfPages ? 'boundaryPage' : 'next-btn'} onClick={increasePageNo}>next</button>
      </div>
    </div>
  );
}

export default PageNavigation
