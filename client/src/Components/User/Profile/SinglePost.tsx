import React from 'react'


interface post{
    createdAt:string
    description:string
    imgVideoURL:string
    like:[]
    postedUser:string
    updatedAt:string
    report:[]
}
function SinglePost({allPost}:{allPost:post}) {
    
  return (
    <div
  className="w-full h-full relative overflow-hidden"
  style={{ width: '100%', height: '100%' }}
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
  <img
    className="w-full h-full object-cover"
    src={process.env.POST_PIC_URL + allPost.imgVideoURL}
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
