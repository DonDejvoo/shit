import { useEffect, useState } from 'react'


function App() {
  const [inputUrl, setInputUrl] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [icon, setIcon] = useState(true);

  useEffect(() => {
    const input = document.querySelector("input");
    console.log(input);
    if(input){
      document.querySelector('input').addEventListener("focus", () => {
        document.querySelector(".hold").style.opacity = 1;
      });
    
      document.querySelector('input').addEventListener("blur", () => {
        document.querySelector(".hold").style.opacity = 0.3;
      });
    } 
  }, [videoData]);

  const handleClick = () => {
    document.querySelector('input').classList.toggle("hide");

  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/src/assets/info.json');
        console.log(response)
        const data = await response.json();
        setInputUrl(data.videoInfo.url)
        setVideoData(data.videoInfo);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleHide = () => {
    setIcon(!icon);
    document.querySelector('.chip').classList.toggle('shrink');
    document.querySelector('.data').classList.toggle("hide");
    document.querySelector('.bg').classList.toggle("expand");
  }

  const getId = (youtubeUrl) => {
    const hold = document.querySelector('.hold');
    if(hold) {
      hold.style.opacity = 1;
      setTimeout(() => {
        hold.style.opacity = 0.3;
      }, 2000);
    }
    return youtubeUrl;
  }


  return (
      <div className='container'>
        {!videoData && <h1>Loading...</h1>}
        {videoData && <div className="inner">
          <h1 style={{
            margin: 0,
            padding: 0
          }} className='heading'>{videoData.heading}</h1>
          <button className='setlink' onClick={handleClick}>Youtube Link</button>
          <div className="hold">
            <input 
              type='search' 
              id='srcInput'
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder='Youtube URL'
              className='hide'
            />
          </div>
          <div className="flex">
            <div className="chip">
              <div className="data">
                <div className="title">{videoData.title}</div>
                <div className="presenters">Presented by: <span className='highlight1'>{videoData.presenters}</span></div>
                <div className="description"><span className='highlight2'>{videoData.description}</span></div>
                <div className="date">Date: <span className='date-h'>{videoData.date}</span></div>
                <div className="duration">Duration: {videoData.duration}</div>
              </div>
              <button onClick={handleHide} className='hide-info'>
                {icon ? (
                  <i className="fa-solid fa-angles-left"></i>
                ) : (
                  <i className="fa-solid fa-angles-right"></i>
                )}
              </button>
            </div>
            <div className="bg">
              <iframe 
                width="703" 
                height="396" 
                src={
                  getId(inputUrl)
                } 
                title="Calvin Harris - Outside ft. Ellie Goulding (slowed + reverb)" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen            
                ></iframe>
            </div>
          </div>
        </div>}
        <footer>
          &copy; 2023 DonDejvo All rights reserved.
        </footer>
      </div>
  )
}

export default App
