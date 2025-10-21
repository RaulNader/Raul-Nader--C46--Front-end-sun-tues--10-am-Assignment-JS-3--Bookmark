"use strict";

var bookmarkName = document.getElementById("bookmarkName");
var bookmarkUrl = document.getElementById("bookmarkUrl");
var dataInputs = [];
var boxModal = document.querySelector(".box-modal");

//* Local Storage Check
if (localStorage.getItem("bookmarkData") !== null) {
  dataInputs = JSON.parse(localStorage.getItem("bookmarkData"));
  displayBookmark();
}

//* Add Data Function with Duplicate Check
function addData() {
  if (validateInputs(bookmarkName) && validateInputs(bookmarkUrl)) {
    var isDuplicate = dataInputs.some(
      (item) => item.name === bookmarkName.value
    );

    if (isDuplicate) {
      showboxModal();
      return; //
    }

    var data = {
      name: bookmarkName.value,
      url: bookmarkUrl.value,
    };

    dataInputs.push(data);
    displayBookmark();
    clearInput();
    localStorage.setItem("bookmarkData", JSON.stringify(dataInputs));
  } else {
    showboxModal();
  }
}

//* Add Data Function without Duplicate Check
// function addData() {
//   if (validateInputs(bookmarkName) && validateInputs(bookmarkUrl)) {
//     var data = {
//       name: bookmarkName.value,
//       url: bookmarkUrl.value,
//     };

//     dataInputs.push(data);
//     displayBookmark();
//     clearInput();
//     localStorage.setItem("bookmarkData", JSON.stringify(dataInputs));
//   } else {
//     showboxModal();
//   }
// }

//* Display Bookmark Function
function displayBookmark() {
  var content = "";
  for (var i = 0; i < dataInputs.length; i++) {
    content += `
             <tr>
              <td>${i + 1}</td>
              <td class="text-capitalize">${dataInputs[i].name}</td>
              <td>
            <button class="btn btn-visit" onclick="visitBookmark(${i})">
            <i class="fa-solid fa-eye pe-2"></i> Visit
          </button>
              </td>
              <td>
                <button class="btn btn-delete" onclick="deleteItem(${i})">
                  <i class="fa-solid fa-trash-can"></i> Delete
                </button>
              </td>
            </tr>`;
  }
  document.getElementById("tableContent").innerHTML = content;
}

//* Visit Bookmark Function
function visitBookmark(index) {
  window.open(dataInputs[index].url, "_blank");
}

//* Clear Input Function
function clearInput() {
  bookmarkName.value = null;
  bookmarkUrl.value = null;
  bookmarkName.classList.remove("is-valid");
  bookmarkUrl.classList.remove("is-valid");
}

//* Delete Bookmark Function
function deleteItem(deleteIndex) {
  dataInputs.splice(deleteIndex, 1);
  displayBookmark();
  localStorage.setItem("bookmarkData", JSON.stringify(dataInputs));
}

//! Validation Function instead of creating  2 functions for each input
function validateInputs(element) {
  var regex = {
    bookmarkName: /^[A-Za-zÀ-ÖØ-öø-ÿ\s\'-]+$/,
    bookmarkUrl:
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9-._~:/?#\[\]@!$&'()*+,;%=]*)?$/,
  };

  //? Element.id is the prop of regex object && element.value is the value of that prop

  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    return false;
  }
}

//* Box Modal Function
function showboxModal() {
  boxModal.classList.remove("d-none");
}

//* Close Modal Function
function closeModal() {
  boxModal.classList.add("d-none");
}
