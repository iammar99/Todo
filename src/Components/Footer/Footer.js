import React from 'react'


let year = new Date()
year = year.getFullYear()
export default function Footer() {
  return (
    <>
    <footer className=''>
    <div className="container">
        <div className="row">
          <div className="col">
            <p className="text-white my-0 py-2 text-center">
              Copyright © {year} | All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}
