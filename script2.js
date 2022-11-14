function fetchex() {
    const apikey = ""
    var url = "link"
    fetch(url)
        .then((response) =>response.json())
        .then(response => {
            console.log(response)
            console.log(response.main.temp) //to get temp
            var tempEl = document.createElement("h1")
            var humidEl= document.createElement("h1")
            var page = document.getElementById("ex")
            tempEl.innterHTML = "Temp =" + response.main.temp
            humidEl.innerHTML = "humid =" +response.main.humidity
            page.append(tempEl) //append =  pushing it inot the page
        })
}
fetchex()