import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { BLOG_GET, BLOG_EDIT } from "./utils/Constants";
const BlogUpdate = () => {
    const { id } = useParams();
    const [blogData, setBlogData] = useState([]);
    const [currentBlog, setCurrentBlog] = useState({});
    // const [formData, setFormData] = useState({      
    //     title: "",
    //     url: "",
    //     description: "",
    //     tag: "",
    //     image: "",
    //     date: "",
    //     // sections: []
    //   });

    useEffect(() => {
      getBlogInfo();
    }, []);
  
    async function getBlogInfo() {
      const response = await axios.get(BLOG_GET);
      const data = response.data.data;
      setBlogData(data);
      searchData(data);
    }
    
    function searchData(data) {
      const blog = data.find((item) => item.id == id);
    //   if (blog) {
    //     setCurrentBlog(blog);
    //     setFormData({
    //     ...formData,
    //     title: blog.title,
    //     url: blog.url,
    //     description: blog.description,
    //     tag: blog.tag,
    //     image: blog.image,
    //     date: blog.date,
    //     // sections: []
    //   })
      
    //   }
      console.log(blog);
    }
  return (
    <>
     <header className="headerEditor">
        <h2>Update Blog</h2>
      </header>
      <h3>{id}</h3>
    
    </> 
  );
};

export default BlogUpdate;
