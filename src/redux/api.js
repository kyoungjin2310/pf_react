import axios from "axios";

export const fetchFlickr = async (opt) => {
  const key = "f214f4f8200fa66223b5d3c4cc803bbd";
  const method_search = "flickr.photos.search";
  const method_user = "flickr.photosets.getPhotos";
  const photoset_id = "72177720299755526";
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

export const fetchYoutube = async () => {
  const key = "AIzaSyC3omc-8Wk_cZwj-pkpAlVSxJizrP0IL9k";
  const playlist = "PLTncuNK6QrZME9vBo7RMvsNoxAPUG8LUw";
  const num = 8;
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

  return await axios.get(url);
};

export const fetchMember = async () => {
  const url = `${process.env.PUBLIC_URL}/DB/members.json`;

  return await axios.get(url);
};

export const fetchNews = async () => {
  const url = `${process.env.PUBLIC_URL}/DB/news.json`;

  return await axios.get(url);
};

export const fetchLocalGet = async () => {
  const url = localStorage.getItem;

  return await axios.get(url);
};

export const fetchLocalSet = async (payload) => {
  const url = localStorage.setItem;
  const result = localStorage.setItem(
    "post",
    JSON.stringify(await axios.post(url, payload))
  );
  return result;
};
