async function upvoteClickHandler(event) {
    event.preventDefault();
    console.log(event.target);
    const id = (event.target.getAttribute('data_id'));
    // const user_id = document.querySelector('#user-id').textContent;
    console.log(id);
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