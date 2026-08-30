const editor = document.getElementById("editor");

editor.value = localStorage.getItem("editorText") || "";

editor.addEventListener("input", () => {
  localStorage.setItem("editorText", editor.value);
});
