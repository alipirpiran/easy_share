function get_upload_bar(name) {
    return `<div class="uploaded ">
  <i class="far fa-file-pdf"></i>
  <div class="file">
  <div class="">
  <p class="text-justify">${name}</p>
          <i class="fas fa-times"></i>
      </div>
      <div class="progress">
            <div class="progress-bar bg-success progress-bar-striped progress-bar-animated"
              style="width:100%"></div>
      </div>
  </div>
</div>`;
}

function upload() {
    if (document.getElementById("input").files.length == 0) return;

    let files = document.getElementById("input").files[0];
    let formData = new FormData();

    formData.append("file", files);
    try {
        fetch("/upload", { method: "POST", body: formData });
    } catch (error) {
        console.log(error);
    }

    document.getElementsByClassName("custom-file-label")[0].innerHTML =
        "Choose file";
    document.getElementById("files").innerHTML += get_upload_bar(files.name);
    document.getElementById("input").value = null;
}

$(".custom-file-input").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});
