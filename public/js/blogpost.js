document.querySelector("#newComment").addEventListener("submit", e => {
    e.preventDefault()
    const commentObj = {
        comment: document.querySelector("#comment").value,
        blogId: document.querySelector("#comment").getAttribute('blogId')
    }
    fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify(commentObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            location.reload()
        } else {
            alert("post failed")
        }
    })
})