// async function to send form input to post endpoint / route on submit event
const imageFormHandler = async function (event) {
    event.preventDefault();

    // get form values for POST to endpoint
    const title = document.querySelector('#post-title2').value;
    const file = document.querySelector('#post-image').files[0];
    console.log(file);
    const body = document.querySelector('#post-body2').value;
    const token = localStorage.getItem("token");
    // console.log(file);

    const formData = new FormData()
    formData.append('file', file);
    formData.append('text', body);
    formData.append('title', title);

    await fetch(`/api/images`, {
        method: "POST",
        body: formData,

        headers: {
            authorization: `Bearer ${token}`,
            // 'Content-Type':
            //     'multipart/form-data; boundary=----WebKitFormBoundarylKRlagDQDch6f3w6',
            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        }
    });

    document.location.replace('/profile');
};

document.querySelector("#image-post-form").addEventListener("submit", imageFormHandler);