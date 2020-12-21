let idArray = document.querySelectorAll("#hidden-id");
    const elem_list = [];
    idArray.forEach(async function(elem) {
      elem_list.push(elem.textContent);
      console.log(elem);
      console.log(elem.textContent);
    
  });

function upvoteClickHandler(event) {
    event.preventDefault();
    
    const token = localStorage.getItem("token");
    for(var i = 0; i<elem_list.length; i++ ) {
      if(elem_list[i]=== parseInt(document.querySelector("#hidden-id-"+elem_list[i]).textContent))
    const id_for_body = elem_list[i]
    const response = await fetch('/api/images/upvote', {
        method: 'POST',
        body: JSON.stringify({
          image_id: id_for_body
        }),
        headers: {
            authorization: `Bearer ${token}`,
            'Content-type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
        console.log("response", response);
      }
    }
    
    
    // const user_id = document.querySelector('#user-id').textContent;
    // console.log(id);
    
  }
  
  let elementsArray = document.querySelectorAll('#upvote-btn');


  //document.querySelector('#upvote-btn').addEventListener('click', upvoteClickHandler);


  elementsArray.forEach(function(elem) {
    elem.addEventListener("click", upvoteClickHandler)
});