import React from 'react';
import { useParams } from 'react-router';

const CompanyUpdate = () => {
    const {id} = useParams();
    console.log(id)
  return (
    <div>
      <p>Company update</p>
    </div>
  )
}

export default CompanyUpdate
