async function followHandler(event) {
    event.preventDefault();
    console.log(event.target);
    const id = (event.target.getAttribute('user_id'));
    // const user_id = document.querySelector('#user-id').textContent;
    console.log(id);
    const token = localStorage.getItem("token");
  
    const response = await fetch('/api/users/follow', {
        method: 'POST',
        body: JSON.stringify({
          user_id: id
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
  
  let userArray = document.querySelectorAll('#follow-btn');


  //document.querySelector('#upvote-btn').addEventListener('click', upvoteClickHandler);


  userArray.forEach(function(elem) {
    elem.addEventListener("click", followHandler)
});