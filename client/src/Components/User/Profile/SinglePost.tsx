import React, { useState } from 'react'
import { getAllComment } from '../../../api/apiConnection/postConnection'
import CommentSection from '../Comments/CommentDialog'


interface post{
    _id:string,
    createdAt:string
    description:string
    imgVideoURL:string
    like:[]
    postedUser:string
    updatedAt:string
    report:[]
}
function SinglePost({singlePost}:{singlePost:post}) {
  const [comments, setComments] = useState([])
  const [open, setOpen] = useState(false);



  const handleOpen = async () => {
    
    const response = await getAllComment(singlePost._id)

    setComments(response)
    setOpen(!open);
  }
    
  return (
    <div
  className="w-full h-full relative overflow-hidden"
  style={{ width: '100%', height: '100%' }} onClick={handleOpen}
  onMouseOver={(e) => {
    const img = e.currentTarget.querySelector('img') as HTMLImageElement | null;
    if (img) {
      img.style.transform = 'scale(1.1)';
    }
  }}
  onMouseOut={(e) => {
    const img = e.currentTarget.querySelector('img') as HTMLImageElement | null;
    if (img) {
      img.style.transform = 'scale(1)';
    }
  }}
>
<CommentSection handleOpen={handleOpen} open={open} singlePost={singlePost} comments={comments} setComments={setComments} />

  <img
    className="w-full h-full object-cover"
    src={process.env.POST_PIC_URL + singlePost.imgVideoURL}
    alt="Posted Image"
    style={{
      transition: 'transform 0.2s',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transform: 'scale(1)', // Initial scale (no zoom)
    }}
  />
  <div className="overlay absolute inset-0 w-full h-full opacity-0 bg-black hover:opacity-50 transition-opacity flex items-center justify-center">
    {/* Add content for the hover effect, like text or icons */}
  </div>
</div>


  )
}

export default SinglePost
