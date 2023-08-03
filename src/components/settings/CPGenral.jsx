import React from 'react';
import '../styles/CPGenral.css';

const CPGenral = () => {
  return (
    
    <section className='cp-genral'>
        <form action="">
         <div className='cp-lead'>
            <label htmlFor="">company name</label>
            <input type="text" className='common-input common-fonts cp-input' />
         </div>

         <div className='cp-lead'>
            <label htmlFor="">fiscal year</label>
            <select name="" id="" className='common-input common-fonts cp-input'>
                <option value="">january - december </option>
            </select>
         </div>

         <div>
           <p className='common-fonts cp-info'>Company Information</p>

           <div className='cp-form-down'>
           <div className='cp-lead'>
            <label htmlFor="">company name</label>
            <input type="text" className='common-input common-fonts cp-input' />
         </div>
         <div className='cp-lead'>
            <label htmlFor="">city</label>
            <input type="text" className='common-input common-fonts cp-input' />
         </div>
         <div className='cp-lead'>
            <label htmlFor="">company domain</label>
            <input type="text" className='common-input common-fonts cp-input' />
         </div>
         <div className='cp-lead'>
            <label htmlFor="">country</label>
            <input type="text" className='common-input common-fonts cp-input' />
         </div>
         <div className='cp-lead'>
            <label htmlFor="">Industry</label>
            <select name="" id="" className='common-input common-fonts cp-input'>
                <option value=""> </option>
            </select>
         </div>
         <div className='cp-lead'>
            <label htmlFor="">state</label>
            <input type="text" className='common-input common-fonts cp-input' />
         </div>
         <div className='cp-lead'>
            <label htmlFor="">company address</label>
            <input type="text" className='common-input common-fonts cp-input' />
         </div>
         <div className='cp-lead'>
            <label htmlFor="">zip</label>
            <input type="text" className='common-input common-fonts cp-input' />
         </div>
         

           </div>

         </div>


         <div className='cp-bottom'>
            <button className='common-white-button'>Cancel</button>
            <button className='common-save-button cp-save'>Save</button>
         </div>


        </form>

    </section>
  )
}

export default CPGenral