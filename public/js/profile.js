document.querySelector("#newBlog").addEventListener("submit", e => {
    e.preventDefault()
    const blogObj = {
        title: document.querySelector("#title").value,
        body: document.querySelector("#body").value,
    }
    fetch("/api/blogs", {
        method: "POST",
        body: JSON.stringify(blogObj),
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

const buttons = document.querySelectorAll(".deleteBtn")
for (const button of buttons) {
    button.addEventListener('click', e => {
        fetch(`/api/blogs/${e.target.value}`, {
            method: "DELETE"
        }).then(res => {
            if (res.ok) {
                location.reload()
            } else {
                alert("delete failed")
            }
        })
    })
}