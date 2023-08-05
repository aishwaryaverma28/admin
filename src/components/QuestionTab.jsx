import React from 'react';
import SearchIcon from '../assets/image/search.svg';

const QuestionTab = () => {
  return (
    <div className='question-tab'>
      <p className='common-fonts question-tab-top'>How can we help you?</p>
      <p className='common-fonts question-tab-note'>Tell us your problem so we can get you the right help and support.</p>

      <div className="recycle-search-box">
    <span className="question-search-icon">
        <img src={SearchIcon} alt="" />
    </span>
    <input
        type="text"
        className="question-search-input recycle-fonts"
        placeholder="Search..."
    />
</div>

<p className='common-fonts question-para'>Lorem  ipsum dolor sit amet consectetur. Aenean sit pulvinar at libero pellentesque massa dictum euismod rhoncus. Quis eget dolor turpis nec integer odio lectus. Nec consectetur urna pretium sit eleifend facilisis facilisi a et. Blandit massa sollicitudin proin adipiscing enim feugiat ornare at. In ipsum orci iaculis sed convallis ac tempus turpis. 
</p>
<p className='common-fonts question-para'>Lorem  ipsum dolor sit amet consectetur. Aenean sit pulvinar at libero pellentesque massa dictum euismod rhoncus. Quis eget dolor turpis nec integer odio lectus. Nec consectetur urna pretium sit eleifend facilisis facilisi a et. Blandit massa sollicitudin proin adipiscing enim feugiat ornare at. In ipsum orci iaculis sed convallis ac tempus turpis. 
</p>


    </div>
  )
}

export default QuestionTab; 