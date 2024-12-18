async function fetchFiles() {
    return new Promise(async (res, rej) => {
        try {
            // Make a GET request to the /getFiles endpoint
            const response = await fetch('./getFiles');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse the JSON response
            const data = await response.json();
            res(data)

        } catch (error) {
            console.error('Error fetching files:', error);
            const fileList = document.getElementById('fileList');
            fileList.innerHTML = '<li>Error fetching files. Please try again later.</li>';
        }
    })
}


fetchFiles().then(filesPaths => {
    filesPaths.files.forEach(path => {
        const dotIndex = path.lastIndexOf('.');
        const onlyName = dotIndex !== -1 ? path.slice(0, dotIndex) : path;

        const div = document.createElement("div")
        div.innerHTML = ` 
                <span class="material-symbols-rounded">
                    play_circle
                    </span>
                <div class="name">${onlyName}</div>
        `
        div.classList.add("movie")
        document.querySelectorAll(".listing")[0].append(div)
        div.addEventListener("click", ()=>{
            openPlayerFor(path)
        })
    });
})

function openPlayerFor(path){
    document.querySelectorAll(".player")[0].style.left = "0px"
    document.querySelectorAll(".player video")[0].src = "./files/"+path;
    const dotIndex = path.lastIndexOf('.');
    const onlyName = dotIndex !== -1 ? path.slice(0, dotIndex) : path;
    document.querySelectorAll(".player .fn")[0].innerHTML = "Playing "+ onlyName;
}

document.querySelectorAll(".player .back")[0].addEventListener("click", ()=>{
    document.querySelectorAll(".player")[0].style.left = "-100%"
    document.querySelectorAll(".player video")[0].src = "";
    document.querySelectorAll(".player .fn")[0].innerHTML = "";
})