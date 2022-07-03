import axios from "axios";
//flickr
export const fetchFlickr = async (opt) => {
  const key = process.env.REACT_APP_FLICKR_KEY;
  const method_search = "flickr.photos.search";
  const method_user = "flickr.photosets.getPhotos";
  const photoset_id = process.env.REACT_APP_FLICKR_PHOTOSET_ID;
  let url = "";
  let result = "";
  if (opt.type === "search") {
    url = `https://www.flickr.com/services/rest/?method=${method_search}&api_key=${key}&user_id=${opt.user}&tags=${opt.tags}&format=json&nojsoncallback=1`;
    await axios.get(url).then((json) => {
      result = json.data.photos.photo;
    });
  }
  if (opt.type === "user") {
    url = `https://www.flickr.com/services/rest/?method=${method_user}&photoset_id=${photoset_id}&api_key=${key}&per_page=${opt.count}&nojsoncallback=1&format=json&user_id=${opt.user}`;
    await axios.get(url).then((json) => {
      result = json.data.photoset.photo;
    });
  }

  return result;
};

//youtube
export const fetchYoutube = async () => {
  const key = process.env.REACT_APP_YOUTUBE_KEY;
  const playlist = process.env.REACT_APP_YOUTUBE_PLAYLIST;
  const num = 8;
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

  return await axios.get(url);
};

//member
export const fetchMember = async () => {
  const url = `${process.env.PUBLIC_URL}/DB/members.json`;

  return await axios.get(url);
};
