import React, { useState, useEffect } from 'react';
import './App.css'
const itemperpage = 10;

function PaginationExample() {
  const [items, setItems] = useState('');
  const [items1, setItems1] = useState();
  const [currentPage, setCurrentPage] = useState(1);
const [value,setvalue]=useState(false)
const [useapidata,setapidata]=useState('')

    useEffect(()=>{

      fetch("https://api.buyucoin.com/ticker/v1.0/liveData")
       .then(res=>res.json())
       .then(data=>setItems(data.data))

    
     },[])


  const totalPages = Math.ceil(items.length / itemperpage);
  const startIndex = (currentPage-1 ) * itemperpage;
  const endIndex = startIndex + itemperpage;
  const currentItems = items.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const itemsvalue=(item)=>{
console.log(item.baseCurrencyId)
setvalue(true)
setapidata(item&&item.baseCurrencyId)
fetch("https://api.buyucoin.com/ticker/v1.0/allCurrencies")
.then(res=>res.json())
.then(data=>setItems1(data.data))
  }

  return (
    <div className='App'>
    
{value?
  <>
  <button onClick={()=>setvalue(false)} className='back_button'>Back</button>
<div className='news'>
<h2>
Name
</h2>
<h2>
MinDeposit
</h2>
<h2>
MaxDeposit
</h2>
<h2>
MinWithdraw
</h2>
<h2>
MaxWithdraw
</h2>

</div>
{items1&&items1.length>0?
items1.map((item)=>
(item._id===useapidata?
<div  className='Uistyle'>



<div>
 
  {item.name}
 
  </div>
  <div className='mindeposit'>
 
  {item.minDeposit}
 
  </div>
  <div className='minwithdraw'>
 
  {item.maxDeposit}
 
  </div>

  <div className='mindeposit'>
 
 {item.minWithdraw}

 </div>

 <div className='minwithdraw'>
 
 {item.maxWithdraw}

 </div>  </div>
:null)
):null}
</>
:<>
<div className='news'>
<h2>
  Name

</h2>
<h2>
  Bid Value
</h2>
</div>
{currentItems&&currentItems.length>0?
currentItems.map((item)=>

<div onClick={()=>itemsvalue(item)} className='Uistyle'>

<button>
 
  {item.currToName}
  </button>
  <div>
  {item.bid}

</div>
  </div>

):null}
 <div className='button'>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <span className='desc'>{currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
</>}

     
    </div>
  );
}

export default PaginationExample;
