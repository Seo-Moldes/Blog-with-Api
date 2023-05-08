const urlUser = "http://localhost:3000/users/";
const urlPost = " http://localhost:3000/posts/";
const urlComments = "http://localhost:3000/comments/";
const bodyPage = document.querySelector("#body");


const postsBody = document.querySelector("#postsBody");
const loadCommentsBtn = document.querySelector("#loadCommentsBtn");
const saveChangesBtn = document.querySelector("#saveChangesBtn");
let elementNumber = 0;
let targetToChange = undefined;
let pickedPost = undefined;

fetch(urlPost)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element) => {
      elementNumber++;

      const postSection = document.createElement("div");
      postSection.setAttribute("class", "row");
      postSection.setAttribute("data-elementnumber", elementNumber);
      const divContainer = document.createElement("div");
      divContainer.setAttribute("class", "col-10");
      const divIcons1 = document.createElement("div");
      divIcons1.setAttribute("class", "col ");
      const divIcons2 = document.createElement("div");
      divIcons2.setAttribute("class", "col ");
      const titlePost = document.createElement("button");
      titlePost.textContent = element.title;
      titlePost.classList.add("btn");
      titlePost.classList.add("btn-outline-dark");
      titlePost.setAttribute("type", "button");
      titlePost.setAttribute("data-bs-toggle", "modal");
      titlePost.setAttribute("data-bs-target", "#modal");
      titlePost.setAttribute("data-id", element.id);
      titlePost.setAttribute("data-userId", element.userId);
      titlePost.setAttribute("id", "openPost");
      titlePost.setAttribute("data-element", elementNumber);
      titlePost.addEventListener("click", (event) => {
        deleteComents();
        loadCommentsBtn.classList.remove("disabled");
        const id = titlePost.dataset.id;
        const userId = event.target.getAttribute("data-userId");
        const modalTittle = document.querySelector("#modalLabel");
        const modalBody = document.querySelector("#modalBody");
        const user = document.querySelector("#user");
        const userName = document.querySelector("#userName");
        const userEmail = document.querySelector("#userEmail");
        loadCommentsBtn.setAttribute("data-userId", userId);
        pickedPost = event.currentTarget.getAttribute("data-element");
        console.log(pickedPost);
        fetch(`http://localhost:3000/posts?id=${id}`)
          .then((response) => response.json())
          .then((data) => {
            modalTittle.innerText = data[0].title;
            modalBody.innerText = data[0].body;
          });
        fetch(`http://localhost:3000/users/${userId}`)
          .then((response) => response.json())
          .then((users) => {
            user.innerText = users.name;
            userName.innerText = users.username;
            userEmail.innerText = users.email;
          });
      });
      const paragraph = document.createElement("p");
      const btnIcon1 = document.createElement("button");
      btnIcon1.setAttribute("class", "btn btn-small");
      btnIcon1.classList.add("btn");
      btnIcon1.classList.add("btn-dark");
      btnIcon1.setAttribute("type", "button");
      btnIcon1.setAttribute("data-bs-toggle", "modal");
      btnIcon1.setAttribute("data-bs-target", "#editorModal");
      btnIcon1.setAttribute("data-elementNumber", elementNumber);
      btnIcon1.setAttribute("data-userId", element.userId);
      btnIcon1.addEventListener("click", (event) => {
        targetToChange = event.currentTarget.getAttribute("data-elementNumber");
        console.log(targetToChange);
        const modalEditTitle = document.querySelector("#modalEditTitle");
        modalEditTitle.textContent = titlePost.textContent;
      });
      const editPostIcon1 = document.createElement("i");
      editPostIcon1.setAttribute("class", "fa-regular fa-pen-to-square");
      btnIcon1.appendChild(editPostIcon1);
      const btnIcon2 = document.createElement("button");
      btnIcon2.classList.add("btn");
      btnIcon2.classList.add("btn-danger");
      btnIcon2.setAttribute("data-elementNumber", elementNumber);
      btnIcon2.setAttribute("type", "button");
      btnIcon2.addEventListener("click", (event) => {
        const targetElement =
          event.currentTarget.getAttribute("data-elementNumber");
        const elementToDelete = document.querySelector(
          `[data-elementNumber="${targetElement}"]`
        );
        if (elementToDelete) {
          elementToDelete.remove();
          alert("Element removed correctly!");
        }
      });

      const deletePostIcon2 = document.createElement("i");
      deletePostIcon2.setAttribute("class", "fa-regular fa-circle-xmark");
      btnIcon2.appendChild(deletePostIcon2);

      paragraph.textContent = element.body;
      btnIcon1.setAttribute("class", "btn btn-success");
      btnIcon1.setAttribute("type", "button");
      btnIcon1.setAttribute("data-bs-toggle", "modal");
      btnIcon1.setAttribute("data-bs-target", "#editorModal");
      btnIcon1.setAttribute("data-elementnumber", elementNumber);

      btnIcon1.id = "btnToggle";

      
      postsBody.appendChild(postSection);
      postSection.appendChild(divContainer);
      postSection.appendChild(divIcons1);
      postSection.appendChild(divIcons2);
      divContainer.appendChild(titlePost);
      divContainer.appendChild(paragraph);

      divIcons1.appendChild(btnIcon1);
      divIcons2.appendChild(btnIcon2);
      const separator = document.createElement("hr");
      separator.classList.add("my-2");
      postSection.appendChild(separator);

      titlePost.addEventListener("click", pushBtnToggle);

      function pushBtnToggle() {
        fetch(urlUser)
          .then((res) => res.json())
          .then((data) => {
            data.forEach((e) => {
              body.classList.add("modal-open");
              body.setAttribute("style", "hidden; padding-right: 17px;");
              const userName = e.name;
              const userEmail = e.email;

              const modal = document.createElement("div");
              modal.setAttribute("class", "modal fade show");
              modal.setAttribute("id", "modal");
              modal.setAttribute("tabindex", "1");
              modal.setAttribute("aria-labelledby", "exampleModalLabel");
              modal.setAttribute("aria-hidden", "true");
              modal.style.display = "block";
              const modalDialog = document.createElement("div");
              modalDialog.setAttribute("class", "modal-dialog");
              const modalContent = document.createElement("div");
              modalContent.setAttribute("class", "modal-content");
              const modalHeader = document.createElement("div");
              modalHeader.setAttribute("class", "modal-header");
              const modalTittle = document.createElement("h5");
              modalTittle.setAttribute("class", "modal-tittle");
              modalTittle.setAttribute("id", "modalLabel");
              modalTittle.textContent = element.title;
              const modalCancel = document.createElement("button");
              modalCancel.setAttribute("type", "button");
              modalCancel.setAttribute("class", "btn-close");
              modalCancel.setAttribute("data-bs-dismiss", "modal");
              modalCancel.setAttribute("aria-label", "Close");
              const modalBody = document.createElement("div");
              modalBody.setAttribute("class", "modal-body");
              modalBody.setAttribute("id", "modalMainBody");
              const modalP = document.createElement("p");
              modalP.setAttribute("class", "lead");
              modalP.setAttribute("id", "modalBody");
              const modalP1 = document.createElement("p");
              const modalB = document.createElement("b");
              modalB.setAttribute("id", "user");
              modalB.textContent = "USER";
              const modalP2 = document.createElement("p");
              modalP2.setAttribute("id", "UserName");
              modalP2.textContent = `${userName}`;
              const modalP3 = document.createElement("p");
              modalP3.setAttribute("id", "UserEmail");
              modalP3.textContent = `${userEmail}`;
              const modalBtnLoadComments = document.createElement("button");
              modalBtnLoadComments.setAttribute("type", "button");
              modalBtnLoadComments.setAttribute("class", "btn btn-dark");
              modalBtnLoadComments.setAttribute("id", "loadCommentsBtn");
              const modalHr = document.createElement("hr");
              const modalCommentSection = document.createElement("div");
              modalCommentSection.setAttribute("class", "row");
              modalCommentSection.setAttribute("id", "commentSection");
              const modalDivRowComment = document.createElement("div");
              modalDivRowComment.setAttribute("class", "row");
              const modalCommentP1 = document.createElement("p");
              modalCommentP1.setAttribute("id", "commentsName");
              const modalCommentP2 = document.createElement("p");
              modalCommentP2.setAttribute("id", "commentsEmail");
              const modalCommentP3 = document.createElement("p");
              modalCommentP3.setAttribute("id", "comment");

              const modalFooter = document.createElement("div");
              modalFooter.setAttribute("class", "modal-footer d-md-block");
              const modalBtnClose = document.createElement("button");
              modalBtnClose.setAttribute("type", "button");
              modalBtnClose.setAttribute("class", " btn btn-secondary m-0");
              modalBtnClose.setAttribute("data-bs-dismiss", "modal");
              modalBtnClose.textContent = "Close";

              modal.appendChild(modalDialog);
              modalDialog.appendChild(modalContent);
              modalContent.appendChild(modalHeader);
              modalHeader.appendChild(modalTittle);
              modalHeader.appendChild(modalCancel);
              modalContent.appendChild(modalBody);
              modalBody.appendChild(modalP);
              modalBody.appendChild(modalP1);
              modalBody.appendChild(modalB);
              modalBody.appendChild(modalP2);
              modalBody.appendChild(modalP3);
              modalBody.appendChild(modalBtnLoadComments);
              modalBody.appendChild(modalHr);
              modalBody.appendChild(modalCommentSection);
              modalCommentSection.appendChild(modalDivRowComment);
              modalDivRowComment.appendChild(modalCommentP1);
              modalDivRowComment.appendChild(modalCommentP2);
              modalDivRowComment.appendChild(modalCommentP3);
              modalContent.appendChild(modalFooter);
              modalFooter.appendChild(modalBtnClose);
              modalCancel.addEventListener("click", returnBody);

              function returnBody() {}
              
            });
          });
      }
    });
    console.log(data);
   
  });

function deleteComents() {
  const commentSection = document.querySelector("#commentSection");
  while (commentSection.firstChild) {
    commentSection.removeChild(commentSection.firstChild);
  }
}
function loadComments(data) {
  const commentSection = document.querySelector("#commentSection");
  data.forEach((element) => {
    const commentRow = document.createElement("div");
    commentRow.classList.add("row");

    const commentName = document.createElement("p");
    commentName.innerText = element.name;
    commentRow.appendChild(commentName);

    const commentsEmail = document.createElement("p");
    commentsEmail.innerText = element.email;
    commentRow.appendChild(commentsEmail);

    const comment = document.createElement("p");
    comment.innerText = element.body;
    commentRow.appendChild(comment);

    const separator = document.createElement("hr");
    separator.classList.add("my-1");
    commentRow.appendChild(separator);

    commentSection.appendChild(commentRow);
  });
}
function saveChanges(targetToChange) {
  const inputField = document.getElementById("changeTitle");
  const newTittle = inputField.value;
  const element = document.querySelector(`[data-element="${targetToChange}"]`);
  if (element) {
    element.innerText = newTittle;
    inputField.value = "";
  }
}
function edit(targetToChange) {
  const inputField = document.getElementById("changeTitle");
  const newTittle = inputField.value;
  fetch(`http://localhost:3000/posts/${targetToChange}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newTittle,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
  inputField.value = "";
}
// ! EVENT LISTENERS
loadCommentsBtn.addEventListener("click", () => {
  fetch(`http://localhost:3000/comments?postId=${pickedPost}`)
    .then((response) => response.json())
    .then((comments) => {
      loadComments(comments);
      loadCommentsBtn.classList.add("disabled");
    });
});
saveChangesBtn.addEventListener("click", (event) => {
  event.preventDefault();
  edit(targetToChange);
  alert("The element was modified successfully");
});
