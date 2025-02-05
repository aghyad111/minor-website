document.addEventListener("DOMContentLoaded", function () {
    fetch("https://fdnd-api.example.com/data") // Vervang met de juiste API URL
        .then(response => response.json())
        .then(data => {
            const apiOutput = document.getElementById("api-output");
            apiOutput.innerHTML = `<p>Naam: ${data.name}</p>
                                   <p>Opleiding: ${data.study}</p>`;
        })
        .catch(error => {
            document.getElementById("api-output").innerHTML = "Kan API-data niet laden.";
            console.error("API-fout:", error);
        });
});
