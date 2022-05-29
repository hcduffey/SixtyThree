document.querySelector("#reviewButton").addEventListener('click', (e) => {
    document.querySelector("#review-modal").classList.toggle("modal-hide");
    document.querySelector("#review-modal").classList.toggle("modal-display");
});

document.querySelector(".cancelButton").addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector("#review-modal").classList.toggle("modal-hide");
    document.querySelector("#review-modal").classList.toggle("modal-display");
});