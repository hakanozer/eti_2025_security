import React, { useEffect, useState } from 'react'
import { allProducts } from '../services/productService'
import { Product } from '../models/IProducts'

function Dashboard() {

  const [arr, setArr] = useState<Product[]>([])
  const [data, setData] = useState('')
  useEffect(() => {
    allProducts().then(res => {
      const dt = res.data
      setArr(dt.data)
    })
  },[])

  useEffect(() => {
    if (data.length > 2) {
      console.log(data)
    }
  },[data])


  return (
    <>
      <div className='row'>
          <div className='col-sm-4 mt-3'> 
            <input onChange={(e) => setData(e.target.value)} className='form-control' placeholder='Search..' />
          </div>
      </div>
      <div className='row'>
        {arr.map((item, index) => 
          <div className="card col-sm-4">
            <img src={item.images[0]} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">{item.category}</p>
              <p>
                <div className="ratio ratio-16x9">
                  <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" title="YouTube video" allowFullScreen></iframe>
                </div>
              </p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Dashboard