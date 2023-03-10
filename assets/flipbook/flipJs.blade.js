//<script>

  // Business Logic
  let current_open_page = 1;
  let numOfPages = 10;
  let maxState = numOfPages + 1;
  let sound = true;

  let current_open_page_mob = 1;
  let numOfPages_mob = 10;
  let maxState_mob = numOfPages;
  screen.addEventListener("orientationchange", function () {
    console.log("The orientation of the screen is: " + screen.orientation);
  });
  
  $(document).ready(async function () {
    if(window.matchMedia("(max-width: 1199.98px)").matches){   //mobile and tablets 
      $('#book-Desktop').hide();
      $('#btnDesktopDiv').hide();
      
      $('#book-mobile').show();
      $('#btnMobileDiv').show();
    }
    else if(window.matchMedia("(min-width: 1200px)").matches){    //desktop and large devices
      $('#book-Desktop').show();
      $('#btnDesktopDiv').show();

      $('#book-mobile').hide();
      $('#btnMobileDiv').hide();
    }
     
  });


  document.querySelector("#btnOkPortrait").addEventListener('click', function() {
    if(document.documentElement.requestFullscreen){
      console.log(document.querySelector("#mobile-container"));
      document.querySelector("#mobile-container").requestFullscreen();
    }
    else if(document.documentElement.webkitRequestFullScreen){
      document.querySelector("#mobile-container").webkitRequestFullScreen();
    }
    screen.orientation.lock("portrait-primary")
      .then(function() {
      })
      .catch(function(error) {
        console.log(error);
      });
  });

  // upon unlock
  document.querySelector("#btnCloseBook").addEventListener('click', function() {
      screen.orientation.unlock();
      console.log("unlocked!");
  });

  $(document).ready(function () {
    if (window.screen.height > window.screen.width) {
      $('#staticBackdrop').modal('show');
    }
  });

  function store_next(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "addbookreader?current_open_page="+current_open_page+"&book_id={{$book_id}}", true);
    xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200 ||  this.status == 500) {
          var response = this.responseText;
          console.log(response);
       }
    }
    xhttp.send(1);
	}

  function store_previous(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "addbookreader?current_open_page="+(current_open_page - 2)+"&book_id={{$book_id}}", true);
    xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200 ||  this.status == 500) {
          var response = this.responseText;
          console.log(response);
       }
    }
    xhttp.send(1);
    // document.querySelector('#markAsCompleteButton').style.display = 'none';
	}

  function play_flip_sound(){
    if(sound === true){
      var audio = new Audio('assets/flipbook/mp3/turnPage.mp3');
      audio.play();
    }
  }

  // function markAsComplete(){
  //   if(current_open_page == numOfPages){
  //     document.querySelector('#markAsCompleteButton').style.display = "inline-block";
  //   }else{
  //     document.querySelector('#markAsCompleteButton').style.display = "none";
  //   }
  // }

  function markAsRead(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "addbookreader?current_open_page=1&book_id={{$book_id}}&is_book_completed=2", true);
    xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200 ||  this.status == 500) {
          var response = this.responseText;
          console.log(response);
       }
    }
    xhttp.send(1);
    $('#exampleModal').modal('hide');
    $('#feedback-modal').modal('show');
  }
  function CloseBookShowLibrary(){
    $('#CloseBookModal').modal('hide');
    var url = document.getElementById('btnCloseBook').href;
    window.location=url;
  }
  
  function getImage(){
    document.querySelector('#b'+current_open_page+ ' .cover-img').setAttribute('src', 'storage/app/public/book_image/9781612119274-'+(current_open_page*2)+'.jpg')
    if(current_open_page == numOfPages) return false;
    nextState = current_open_page + 1;
    document.querySelector('#f'+nextState+ ' .cover-img').setAttribute('src', 'storage/app/public/book_image/9781612119274-'+(nextState*2)+'.jpg')
  }

  function goMobileNext() {
      if(current_open_page_mob < maxState_mob) {
        selectPage = document.querySelector('#pm'+current_open_page_mob);
        selectPage.style.zIndex = current_open_page_mob;
        selectPage.classList.add("flipped");
        //store_next();
        play_flip_sound();
        // markAsComplete(); // show when last page open
        // getImage();
        //document.querySelector('#f_page').textContent = current_open_page_mob > 1 ? current_open_page_mob * 2 : current_open_page_mob
        current_open_page_mob++;
    } 
    else if(current_open_page_mob == numOfPages_mob){
      closeMobileBook(false);
    }
  }
  function goMobilePrevious() {
    if(current_open_page_mob > 1) {
      goToPage = current_open_page_mob - 1;
      selectPage = document.querySelector('#pm'+goToPage);
      selectPage.style.zIndex = maxState_mob - goToPage;
      selectPage.classList.remove("flipped");
      if(current_open_page_mob == 2){
        closeMobileBook(true);
      }
      //store_previous();
      play_flip_sound();
      current_open_page_mob--;
      document.querySelector('#f_page').textContent = current_open_page_mob * 2 - 2
    }
  }
  function goMobileFirst(){
    if(current_open_page_mob > 1){
      goToPage = current_open_page_mob - 1;
      for(goToPage; goToPage >= 1; goToPage-- ){
          selectPage = document.querySelector('#pm'+goToPage);
          selectPage.style.zIndex = maxState_mob - goToPage;
          selectPage.classList.remove("flipped");
      }
      current_open_page_mob = 1
      //store_next();
      closeMobileBook(true);
      play_flip_sound();
      document.querySelector('#f_page').textContent = current_open_page_mob * 2
    }
  }

  function goNext() {
      if(current_open_page < maxState) {
        selectPage = document.querySelector('#p'+current_open_page);
        selectPage.style.zIndex = current_open_page;
        selectPage.classList.add("flipped");
        if(current_open_page == 1){
            openDesktopBook();
        }
        if(current_open_page == numOfPages){
            closeDesktopBook(false);
        }
        //store_next();
        play_flip_sound();
        // markAsComplete(); // show when last page open
        // getImage();
        document.querySelector('#f_page').textContent = current_open_page > 1 ? current_open_page * 2 : current_open_page
        current_open_page++;
      }
  }

  function goPrevious() {
      if(current_open_page > 1) {
        goToPage = current_open_page - 1;
        selectPage = document.querySelector('#p'+goToPage);
        selectPage.style.zIndex = maxState - goToPage;
        selectPage.classList.remove("flipped");
        if(current_open_page == maxState){
          openDesktopBook()
        }
        if(current_open_page == 2){
          closeDesktopBook(true);
        }
        //store_previous();
        play_flip_sound();
        current_open_page--;
        document.querySelector('#f_page').textContent = current_open_page * 2 - 2
      }
  }

  function goFirst(){
  if(current_open_page > 1){
    goToPage = current_open_page - 1;
    for(goToPage; goToPage >= 1; goToPage-- ){
        selectPage = document.querySelector('#p'+goToPage);
        selectPage.style.zIndex = maxState - goToPage;
        selectPage.classList.remove("flipped");
     }
     current_open_page = 1
      store_next();
      closeDesktopBook(true);
      play_flip_sound();
      document.querySelector('#f_page').textContent = current_open_page * 2
    }
  }

  function openDesktopBook() {
    document.querySelector('#book-Desktop').style.transform = "translateX(50%)";
  }

  function closeDesktopBook(isFirstPage) {
    if(isFirstPage) {
      document.querySelector('#book-Desktop').style.transform = "translateX(0%)";
    } else {
      document.querySelector('#book-Desktop').style.transform = "translateX(100%)";
      $('#txtAlertMessageModal').html("End of the book");
      $('#AlertMessageModal').modal('show');
    }
  }
  function closeMobileBook(isFirstPage) {
    if(isFirstPage) {
      document.querySelector('#book-mobile').style.transform = "translateX(0%)";
    } else {
      document.querySelector('#book-mobile').style.transform = "translateX(-180%)";
      $('#txtAlertMessageModal').html("End of the book");
      $('#AlertMessageModal').modal('show');
      // document.querySelector("#btnAlertClose").addEventListener('click', function(){
      //   document.querySelector("#btnCloseBook").click();
      // });
    }
  }

  function toggleSound(element){
    if(sound === true) {
      html_string =  '<i class="fa-solid fa-volume-mute"></i>' ;
      sound = false;
    }else{
      html_string =  '<i class="fa-solid fa-volume-up"></i>' ;
      sound = true;
    }
    //  alert(element.innerHTML)
    element.innerHTML = html_string
  }

  $(document).on('click', '.emoji_size', function () {
    rating = $(this).attr('rating');
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "bookreaderfeedback?book_id={{$book_id}}&rating="+rating, true);
    xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200 ||  this.status == 500) {
          var response = this.responseText;
          console.log(response);
       }
    }
    xhttp.send(1);
    $('.ratingdiv'+rating).html('<i class="fa fa-check fa-8x text-success"" aria-hidden="true"></i>');
    window.location.href = 'Home';

  })

  function lock (orientation) {
    let de = document.documentElement;
    if (de.requestFullscreen) { de.requestFullscreen(); }
    else if (de.mozRequestFullScreen) { de.mozRequestFullScreen(); }
    else if (de.webkitRequestFullscreen) { de.webkitRequestFullscreen(); }
    else if (de.msRequestFullscreen) { de.msRequestFullscreen(); }
  
    screen.orientation.lock(orientation);
    alert("portrait locked");
    console.log("locked");
  }
  
  function unlock () {
    // (B1) UNLOCK FIRST
    screen.orientation.unlock();
  
    // (B2) THEN EXIT FULL SCREEN
    if (document.exitFullscreen) { document.exitFullscreen(); }
    else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
    else if (document.mozCancelFullScreen) { document.mozCancelFullScreen(); }
    else if (document.msExitFullscreen) { document.msExitFullscreen(); }
    console.log("unlocked");
  }

  document.addEventListener("keyup", function (e) {
      var keyCode = e.keyCode ? e.keyCode : e.which;
      if (keyCode == 44) {
          stopPrntScr();
      }
  });
  function stopPrntScr() {
      var inpFld = document.createElement("input");
      inpFld.setAttribute("value", ".");
      inpFld.setAttribute("width", "0");
      inpFld.style.height = "0px";
      inpFld.style.width = "0px";
      inpFld.style.border = "0px";
      document.body.appendChild(inpFld);
      inpFld.select();
      document.execCommand("copy");
      inpFld.remove(inpFld);
  }

  function AccessClipboardData() {
      try {
          window.clipboardData.setData('text', "Access   Restricted");
      } catch (err) {
      }
  }
  setInterval("AccessClipboardData()", 300);

  document.addEventListener('keydown', function(e) {
      switch (e.keyCode) {
          case 37:
              // alert('left');
              goPrevious();
              break;
          case 38:
            //  alert('up');
              break;
          case 39:
            goNext();
              // alert('right');
              break;
          case 40:
              // alert('down');
              break;
      }
  });




//</script>
