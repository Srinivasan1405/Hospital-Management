function showInfo(element) {
    const text = element.getAttribute("data-info");
    const img = element.getAttribute("data-img");

    document.getElementById("dept-text").innerText = text;
    document.getElementById("dept-img").src = img;

    document.getElementById("dept-info").style.display = "flex";
}
