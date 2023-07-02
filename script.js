// const BASE_URL = "https://www.googleapis.com/youtube/v3";
// const API_KEY = "AIzaSyD2TpjSJShlbx6JXWuY-WGe97WrKHdMFW0";
// AIzaSyB74MZKTt9nJ - A93_0eg_iZy4JUXL_yJdA;
const videoCardContainer = document.querySelector(".video-section");
let api_key = "AIzaSyB74MZKTt9nJ-A93_0eg_iZy4JUXL_yJdA";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";
fetch(
  video_http +
    new URLSearchParams({
      key: api_key,
      part: "snippet",
      chart: "mostPopular",
      maxResults: 50,
      regionCode: "IN",
    })
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    data.items.forEach((item) => {
      getChannelIcon(item);
    });
  })
  .catch((err) => console.log(err));
const getChannelIcon = (video_data) => {
  fetch(
    channel_http +
      new URLSearchParams({
        key: api_key,
        part: "snippet",
        id: video_data.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      video_data.channelThumbnail =
        data.items[0].snippet.thumbnails.default.url;
      makeVideoCard(video_data);
    });
};
videoCardContainer.innerHTML = "";
const makeVideoCard = (data) => {
  videoCardContainer.innerHTML += `
    <div class="video-image" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <div class="video-image">
            <img src="${data.snippet.thumbnails.high.url}" alt="thumbnail" />
        </div>
        <div class="video-description">
            <div class="channel-avatar">
            <img
                src="${data.channelThumbnail}"
                alt="channel avatar"
            />
            </div>
            <div class="video-title">
            ${data.snippet.title}
            </div>
        </div>
        <div class="channel-description">
            <p class="channel-name">${data.snippet.channelTitle}</p>
        </div>
    </div>`;
};
// search bar
const searchInput = document.querySelector(".search");
const searchBtn = document.querySelector(".search-btn");
let searchLink = "https://www.youtube.com/results?search_query=";
searchBtn.addEventListener("click", () => {
  if (searchInput.value.length) {
    location.href = searchLink + searchInput.value;
  }
});

let channelAvatar = document.querySelector(".channel-avatar");

channelAvatar.addEventListener("click", function () {
  window.location.href = "channelDetails.html";
});