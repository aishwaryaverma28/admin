import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const SubMenu = (item) => {
    const [open,  setOpen] = useState(false)
    
    if(item.subNav){
  return (
    <div className={open?'sidebar-item open' : 'sidebar-item'}>
        <div className='sidebar-title' onClick={() => setOpen(!open)}>
            <span>
                {item.title}
            </span>
            <i className="fa-sharp fa-solid fa-angle-down toggle-btn"></i>
        </div>
        <div className='sidebar-content'>
        { item.subNav.map((child, index) => <SubMenu key={index} {...child} />) }
        </div>
    </div>
  )
    }

    else{
        return (
            <div className='sidebar-item'>
            <Link to={item.path || "#"} className='sidebar-title plain'>
                {item.title}
            </Link>
            </div>
          )     
    }
 }
 export default SubMenu;

//  import React, {useState} from 'react'
//  import { Link } from 'react-router-dom'
// const SubMenu = (item) => {
//     const [isIndex, setIsIndex] = useState(0);

//     function handleClick(index) {
//         if (index === isIndex) {
//             setIsIndex(0);
//         } else {
//             setIsIndex(index);
//         }

//     }

//   if (item.subNav) {
//     return (
//       <div className={`sidebar-item ${(isIndex === item.id) ? 'open' : ''}`}>
//         <div className='sidebar-title' onClick={() => handleClick(item.id)}>
//           <span>{item.title}</span>
//           <i className="fa-sharp fa-solid fa-angle-down toggle-btn"></i>
//         </div>
//         {(isIndex === item.id) && (
//         <div className='sidebar-content'>
//           {item.subNav.map((child, index) => (
//             <SubMenu key={index} {...child} />
//           ))}
//         </div>
//          )} 
//       </div>
//     );
//   } else {
//     return (
//       <div className='sidebar-item'>
//         <Link to={item.path || "#"} className='sidebar-title plain'>
//           {item.title}
//         </Link>
//       </div>
//     );
//   }
// };
// export default SubMenu;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const SubMenu = (item) => {
//   const [open, setOpen] = useState(false);

//   const handleToggle = () => {
//     setOpen(!open);
//   };

//   const handleCloseSubmenu = () => {
//     setOpen(false);
//   };

//   if (item.subNav) {
//     return (
//       <div
//         className={open ? 'sidebar-item open' : 'sidebar-item'}
//         onMouseEnter={handleToggle}
//         onMouseLeave={handleCloseSubmenu}
//       >
//         <div className='sidebar-title' onClick={handleToggle}>
//           <span>{item.title}</span>
//           <i className="fa-sharp fa-solid fa-angle-down toggle-btn"></i>
//         </div>
//         {open && (
//           <div className='sidebar-content'>
//             {item.subNav.map((child, index) => (
//               <SubMenu key={index} {...child} />
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   } else {
//     return (
//       <div className='sidebar-item'>
//         <Link
//           to={item.path || '#'}
//           className='sidebar-title plain'
//           onClick={handleCloseSubmenu}
//         >
//           {item.title}
//         </Link>
//       </div>
//     );
//   }
// };

// export default SubMenu;



