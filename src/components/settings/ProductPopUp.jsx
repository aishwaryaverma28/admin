import React from 'react'

const ProductPopUp = ({onClose}) => {
  return (
    <div className="popup-wrapper">
        <div className="product-popup-container">
            <div className='product-popup-box'>
                <p className='common-fonts add-product-heading'>add product</p>
                <div className='product-popup-content'>
                    <form action="">
                     <div className='product-popup-fields'>
                        <label htmlFor="" className='common-fonts'>Name</label>
                        <input type="text" className='common-input' />
                     </div>
                     <div className='product-popup-fields'>
                        <label htmlFor="" className='common-fonts'>Product Code</label>
                        <input type="text" className='common-input' />
                     </div>
                     <div className='product-popup-fields'>
                        <label htmlFor="" className='common-fonts'>Description</label>
                        <input type="text" className='common-input' placeholder='add important details like features, options or measurements.' />
                     </div>
                     <div className='product-popup-fields'>
                        <label htmlFor="" className='common-fonts'>Price</label>
                        <div className='product-two-input'>
                        <input type="text" className='common-input product-popup-input'/>
                        <select name="" id="" className='common-input product-popup-select'>
                            <option value="">US Dollar</option>
                        </select>
                        </div>
                     </div>
                     <div className='product-popup-fields'>
                        <label htmlFor="" className='common-fonts'>Tax %</label>
                        <input type="text" className='common-input' />
                     </div>
                    </form>
                    <div className='product-popup-bottom'>
                        <button className='common-white-button'>Cancel</button>
                        <button className='common-save-button product-popup-save'>Save</button>
                     </div>
                </div>
            </div>

        </div>
        <div className='help-cross' onClick={onClose}>X</div>
    </div>
  )
}

export default ProductPopUp