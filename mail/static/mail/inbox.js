document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#emails').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#emails').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Content
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(data =>{
        for (let i of data) {
          const mail = document.createElement('div');
          mail.className = 'post';
          mail.setAttribute("class", `email-holder row d-flex `);
   
          mail.innerHTML = `
          <div class="p-2">${i["sender"]}</div>
          <div class="p-2">${i["subject"]}</div>
          <div class="ml-auto p-2">${i["timestamp"]}</div>
          <button class="hide">Hide</button>
        `;  
        document.querySelector('#emails').append(mail);
        }

  })
}
  document.addEventListener('click',event =>{
        const element = event.target;
        if (element.className === 'hide'){
            element.parentElement.style.animationPlayState = "running";
            element.parentElement.addEventListener('animationend', () => {
                element.parentElement.remove();
            });
        }
    })


// let counter = 1;
// const quantity = 20;
// document.addEventListener('DOMContentLoaded',load);
// window.onscroll = ()=>{
//     if(window.innerHeight + window.scrollY >= document.body.offsetHeight){
//         load();
//     }
// };

// function load(){
//     const start = counter;
//     const end = start + quantity - 1;
//     counter = end + 1;

//     fetch(`/posts?start=${start}&end=${end}`)
//     .then(response => response.json())
//     .then(data => {
//         data.YourNewsfeed.forEach(add_post);
//     })
// };

// function add_post(contents){
//     const post = document.createElement('div');
//     post.className = 'post';
//     post.innerHTML = `${contents}<button class="hide">Hide</button>`;

//     document.querySelector('#posts').append(post);
// };

// document.addEventListener('click',event =>{
//     const element = event.target;
//     if (element.className === 'hide'){
//         element.parentElement.style.animationPlayState = "running";
//         element.parentElement.addEventListener('animationend', () => {
//             element.parentElement.remove();
//         });
//     }
// })




// const JSON_PATH = '/emails/${mailbox}';
// const SORT_ASC = function(a, b) {
//   return a.timestamp - b.timestamp;
// };
// const SORT_DESC = function(a, b) {
//   return b.timestamp - a.timestamp;
// };
// class App {
//   constructor() {
//     this._onJsonReady = this._onJsonReady.bind(this);
//     this._sortAlbums = this._sortAlbums.bind(this);

//     const ascElement = document.querySelector('#asc');
//     const ascButton = new SortButton(
//       ascElement, this._sortAlbums, SORT_ASC);
//     const descElement = document.querySelector('#desc');
//     const descButton = new SortButton(
//       descElement, this._sortAlbums, SORT_DESC);
//   }

//   _sortAlbums(sortFunction) {
//     this.albumInfo.sort(sortFunction);
//     this._renderAlbums();
//   }

//   _renderAlbums() {
//     const albumContainer = document.querySelector('#album-container');
//     albumContainer.innerHTML = '';
//     for (const info of this.albumInfo) {
//       const album = new Album(albumContainer, info.url);
//     }
//   }

//   loadAlbums() {
//     fetch(JSON_PATH)
//         .then(this._onResponse)
//         .then(this._onJsonReady);
//   }

//   _onJsonReady(json) {
//     this.albumInfo = json.albums;
//     this._renderAlbums();
//   }

//   _onResponse(response) {
//     return response.json();
//   }
// }

// class SortButton {
//   constructor(containerElement, onClickCallback, sortFunction) {
//     this._onClick = this._onClick.bind(this);
//     this.onClickCallback = onClickCallback;

//     this.sortFunction = sortFunction;
//     containerElement.addEventListener('click', this._onClick);
//   }

//   _onClick() {
//     this.onClickCallback(this.sortFunction);
//   }
// }

// class Album {
//   constructor(albumContainer, imageUrl) {
//     // Same as document.createElement('img');
//     const image = new Image();
//     image.src = imageUrl;
//     albumContainer.append(image);
//   }
// }

// // script.js
// const app = new App();
// app.loadAlbums();
