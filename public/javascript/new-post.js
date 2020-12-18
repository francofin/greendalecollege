const newFormHandler = async function(event) {
    event.preventDefault();
    const title = document.querySelector('#post-title2').value;

    const body = document.querySelector('#post-body2').value;

    const token = localStorage.getItem("token");
    await fetch(`/api/posts`, {
        method: "POST",
        body: JSON.stringify({
            title,
            body
        }),
        headers: {
            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8, application/json',
            authorization: `Bearer ${token}`
        }
    });
    document.location.replace('/profile');
};

document.querySelector('.new-post-form').addEventListener("submit", newFormHandler);