const api_key = "AIzaSyAg7wgMMExG7Wi1lF4-VAqR9GkV6uNSZYE";
const pid = "PLqsTrDmjWMv6aPOL3m5oDTY6ot24lqxqe";
const base_url = "https://www.googleapis.com/youtube/v3/playlistItems";
const num = 3;
const req_url = `${base_url}?part=snippet&playlistId=${pid}&key=${api_key}&maxResults=${num}`;
const frame = document.querySelector(".frame");

fetch(req_url)
  .then((data) => {
    return data.json();
  })
  .then((json) => {
    const youtubeData = json.items;

    let tags = "";

    youtubeData.forEach((data, index) => {
      console.log(data);

      let tit = "";
      let desc = "";

      if (data.snippet.title.length > 35) {
        tit = data.snippet.title.substring(0, 35) + "...";
      } else {
        tit = data.snippet.title;
      }

      data.snippet.description.length > 120
        ? (desc = data.snippet.description.substring(0, 120) + "...")
        : (desc = data.snippet.description);

      tags += `
        <article>
          <h2>${tit}</h2>
          <figure class='pic' data-vid=${data.snippet.resourceId.videoId}>
            <img src=${data.snippet.thumbnails.high.url} />
          </figure>
          <p>${desc}</p>
          <span>${data.snippet.publishedAt
          .split("T")[0]
          .split("-")
          .join(".")}</span>
        </article>      
      `;
    });

    frame.innerHTML = tags;

    const popup = document.querySelector(".popup");
    const popupCon = popup.querySelector(".con");
    const pics = document.querySelectorAll(".pic");
    const closePop = document.querySelector(".closePop");

    pics.forEach((data, index) => {
      data.addEventListener("click", (e) => {
        e.preventDefault();

        console.dir(data);
        const vidId = data.getAttribute("data-vid");
        console.log(vidId);

        popup.style.display = "block";
        popupCon.innerHTML = `<iframe src="http://www.youtube.com/embed/${vidId}"></iframe>`;
      });
    });

    closePop.addEventListener("click", (e) => {
      e.preventDefault();
      popup.style.display = "none";
    });
  });