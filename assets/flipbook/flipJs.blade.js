//<script>

  // Business Logic
  let current_open_page = 1;
  let numOfPages = 24;
  let maxState = numOfPages + 1;
  let sound = true;

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
  var audio = new Audio('public/mp3/turnPage.mp3');
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


  function openBook() {
      document.querySelector('#book').style.transform = "translateX(50%)";
  }

  function closeBook(isFirstPage) {
      if(isFirstPage) {
        document.querySelector('#book').style.transform = "translateX(0%)";
      } else {
        document.querySelector('#book').style.transform = "translateX(100%)";
      }
  }

  function getImage(){
    document.querySelector('#b'+current_open_page+ ' .cover-img').setAttribute('src', 'storage/app/public/book_image/9781612119274-'+(current_open_page*2)+'.jpg')
    if(current_open_page == numOfPages) return false;
    nextState = current_open_page + 1;
    document.querySelector('#f'+nextState+ ' .cover-img').setAttribute('src', 'storage/app/public/book_image/9781612119274-'+(nextState*2)+'.jpg')
  }


  function goNext() {
      if(current_open_page < maxState) {

        selectPage = document.querySelector('#p'+current_open_page);
        selectPage.style.zIndex = current_open_page;
        selectPage.classList.add("flipped");

        if(current_open_page == 1){
            openBook();
        }
        if(current_open_page == numOfPages){
            closeBook(false);
        }
        store_next();
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
          openBook()
        }
        if(current_open_page == 2){
          closeBook(true);
        }
        store_previous();
        play_flip_sound();
        current_open_page--;
        document.querySelector('#f_page').textContent = current_open_page * 2 - 2
        // alert(current_open_page);
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
    closeBook(true);
    play_flip_sound();
    document.querySelector('#f_page').textContent = current_open_page * 2
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
  //</script>


//<script>

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


//</script>



//<script>
  // $(document).bind("contextmenu", function (e) {
  //     return false;
  // });

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
//</script>

//<script>
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
