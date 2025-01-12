import { useState, useRef } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { MdShare } from 'react-icons/md';
import { useAuth } from '../../context/useAuth';

const ShowVideos = () => {
  const [videoData, setVideoData] = useState([
    {
      videoUrl: './assets/one.mp4',
      title: 'Road Adventure',
      likes: 0,
      dislikes: 0,
      likedBy: [],
      dislikedBy: [],
    },
    {
      videoUrl: './assets/two.mp4',
      title: 'Action',
      likes: 0,
      dislikes: 0,
      likedBy: [],
      dislikedBy: [],
    },
    {
      videoUrl: './assets/three.mp4',
      title: 'Ride',
      likes: 0,
      dislikes: 0,
      likedBy: [],
      dislikedBy: [],
    },
    {
      videoUrl: './assets/four.mp4',
      title: 'Fly',
      likes: 0,
      dislikes: 0,
      likedBy: [],
      dislikedBy: [],
    },
  ]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const videRef = useRef(null);
  const { user } = useAuth();

  const handleNavigate = (direction) => {
    const newIndex =
      direction === 'next'
        ? (currentVideoIndex + 1) % videoData.length
        : (currentVideoIndex - 1 + videoData.length) % videoData.length;
    setCurrentVideoIndex(newIndex);
  };

  const handleLikeDislike = (type) => {
    if (!user) {
      alert('Please login to like/dislike a video');
      return;
    }

    const updatedVideo = { ...videoData[currentVideoIndex] };
    if (type === 'like' && !updatedVideo.likedBy.includes(user.username)) {
      updatedVideo.likes += 1;
      updatedVideo.likedBy.push(user.username);
      if (updatedVideo.dislikedBy.includes(user.username)) {
        updatedVideo.dislikes -= 1;
        updatedVideo.dislikedBy = updatedVideo.dislikedBy.filter((u) => u !== user.username);
      }
    } else if (type === 'dislike' && !updatedVideo.dislikedBy.includes(user.username)) {
      updatedVideo.dislikes += 1;
      updatedVideo.dislikedBy.push(user.username);
      if (updatedVideo.likedBy.includes(user.username)) {
        updatedVideo.likes -= 1;
        updatedVideo.likedBy = updatedVideo.likedBy.filter((u) => u !== user.username);
      }
    }

    setVideoData((prev) =>
      prev.map((video, index) => (index === currentVideoIndex ? updatedVideo : video))
    );
  };

  const handleShare = () => {
    const videoUrl = videoData[currentVideoIndex].videoUrl;
    navigator.clipboard.writeText(videoUrl).then(() => {
      alert('Video URL copied to clipboard!');
    });
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    setComments((prev) => [...prev, { username: user?.username || 'Guest', text: newComment }]);
    setNewComment('');
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col items-center py-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Video Explorer</h1>

      <div className="w-full max-w-4xl">
        <div className="relative">
          <video
            className="w-full rounded-xl shadow-md transition-transform duration-500 hover:scale-105"
            src={videoData[currentVideoIndex]?.videoUrl}
            ref={videRef}
            controls
          />
          <button
            onClick={() => handleNavigate('prev')}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 bg-gray-800 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition"
          >
            <FaAngleLeft size={24} />
          </button>
          <button
            onClick={() => handleNavigate('next')}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 bg-gray-800 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition"
          >
            <FaAngleRight size={24} />
          </button>
        </div>

        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900">{videoData[currentVideoIndex]?.title}</h2>
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => handleLikeDislike('like')}
              className="flex items-center gap-2 p-2 rounded-md text-green-600 border border-green-300 hover:bg-green-50"
            >
              <AiOutlineLike size={20} /> {videoData[currentVideoIndex]?.likes}
            </button>
            <button
              onClick={() => handleLikeDislike('dislike')}
              className="flex items-center gap-2 p-2 rounded-md text-red-600 border border-red-300 hover:bg-red-50"
            >
              <AiOutlineDislike size={20} /> {videoData[currentVideoIndex]?.dislikes}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 p-2 rounded-md text-blue-600 border border-blue-300 hover:bg-blue-50"
            >
              <MdShare size={20} /> Share
            </button>
          </div>
        </div>

        <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Comments</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {comments.map((comment, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded-lg">
                <p className="font-semibold text-black">{comment.username}</p>
                <p className="text-black">{comment.text}</p>
              </div>
            ))}
          </div>
          <div className="flex mt-4">
          <input
  type="text"
  placeholder="Write a comment..."
  value={newComment}
  onChange={(e) => setNewComment(e.target.value)}
  className="flex-grow p-2 border border-gray-300 rounded-lg text-black placeholder-black"
/>

            <button
              onClick={handleCommentSubmit}
              className="ml-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowVideos;
