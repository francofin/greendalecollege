async function upvoteClickHandler(event) {
    event.preventDefault();
  
    function find_id() {
    let idArray = document.querySelectorAll("#hidden-id");
    elem_list = [];
    idArray.forEach(function(elem) {
      elem_list.push(elem.textContent)
    });
    console.log(elem_list);
    for(var i =0; i<elem_list.length; i++) {
      if(elem_list[i] === document.querySelector(".hidden-id-"+elem_list[i]).textContent) {
        let body_id = elem_list[i]
        return body_id;
      }
    }
  }

  const id = find_id();
  console.log("id", id);
    const token = localStorage.getItem("token");
  
    const response = await fetch('/api/images/upvote', {
        method: 'POST',
        body: JSON.stringify({
          image_id: id
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
  
  let elementsArray = document.querySelectorAll('#upvote-btn');


  //document.querySelector('#upvote-btn').addEventListener('click', upvoteClickHandler);


  elementsArray.forEach(function(elem) {
    elem.addEventListener("click", upvoteClickHandler)
});