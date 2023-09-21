import React from 'react';
import { useParams } from 'react-router';

const PeopleUpdate = () => {
    const {id} = useParams();
    console.log(id)
  return (
    <div>
      people Update
    </div>
  )
}

export default PeopleUpdate
