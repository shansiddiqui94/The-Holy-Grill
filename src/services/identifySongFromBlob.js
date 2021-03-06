import axios from "axios";

async function identifySongFromBlob(blob) {
  let data = {
    api_token: "041abfc5c3c035b2e8978417c7fcfa10",
    audio: blob,
    return: "apple_music,spotify,lyrics",
  };

  console.log(data.file);

  let song = new FormData();
  song.append("api_token", data.api_token);
  song.append("audio", data.audio);
  song.append("return", data.return);

  return await axios({
    method: "post",
    url: "https://api.audd.io/",
    data: song,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

export default identifySongFromBlob;
