let selectedTemplate = null;

function openDemo(template, id) {
  document.getElementById("demoModal").style.display = "block";
  document.getElementById("demoFrame").src = "templates/" + template;
  selectedTemplate = id;
}

function closeDemo() {
  document.getElementById("demoModal").style.display = "none";
}

function chooseTemplate() {
  closeDemo();
  document.getElementById("formModal").style.display = "block";
}

function closeForm() {
  document.getElementById("formModal").style.display = "none";
}

document.getElementById("userForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const role = document.getElementById("role").value;
  const about = document.getElementById("about").value;
  const project = document.getElementById("project").value;

  let templateHTML = "";
  if (selectedTemplate === 1) {
    templateHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${name}'s Portfolio</title>
        <style>
          body { font-family: Arial; text-align:center; background:#f0f8ff; }
          h1 { color:#0078ff; }
        </style>
      </head>
      <body>
        <h1>${name}</h1>
        <h3>${role}</h3>
        <p>${about}</p>
        <h4>Project: ${project}</h4>
      </body>
      </html>`;
  } else {
    templateHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${name}'s Portfolio</title>
        <style>
          body { font-family: Verdana; background:#fffbe6; padding:20px; }
          h1 { color:#ff7b00; }
        </style>
      </head>
      <body>
        <h1>${name}</h1>
        <h2>${role}</h2>
        <p>${about}</p>
        <p><strong>Project:</strong> ${project}</p>
      </body>
      </html>`;
  }

  const zip = new JSZip();
  zip.file("index.html", templateHTML);

  const cssContent = "/* Add your CSS here */";
  zip.file("style.css", cssContent);

  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, `${name.replace(" ", "_")}_Portfolio.zip`);

  closeForm();
  alert("✅ Your portfolio ZIP has been downloaded!");
});
