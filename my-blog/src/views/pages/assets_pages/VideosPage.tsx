import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Copyright from '../../components/Copyright';
import Spacer from '../../components/Spacer';

interface Video {
  id: number;
  url: string;
  video_files: { link: string }[];
}

const Videos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://api.pexels.com/videos/search?query=anime&per_page=10&page=1', {
      headers: {
        Authorization: '81ydxLwOBXkX9mBGzj0C7r9MTWocrW2Fjj4hxQAxofvpoINpmOh4WbV8' // Replace with your Pexels API key
      }
    })
      .then(response => {
        setVideos(response.data.videos);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the videos!", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <Spacer size='pb-20' />
      <div className="flex-grow container mx-auto p-4">
        <Spacer size='pb-20' />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-lg shadow-lg p-4">
              <video className="w-full h-auto rounded-lg" controls>
                <source src={video.video_files[0].link} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      </div>
      <Spacer size='pt-20' />
      <Copyright />
    </div>
  );
};

export default Videos;
