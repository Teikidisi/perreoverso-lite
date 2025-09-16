var modalButton = document.querySelector(".modal-button");
var modal = document.querySelector(".modal-back");

modalButton.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
