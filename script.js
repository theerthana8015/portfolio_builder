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

   if (selectedTemplate === 1) {
    window.location.href = "./temp1.html";
  }
  else if (selectedTemplate === 3) {
    window.location.href = "./temp3.html";
  }
  else if (selectedTemplate === 2) {
    window.location.href = "./temp2.html";
  }
  // ✅ If Template 4 selected → open temp4.html
  else if (selectedTemplate === 4) {
    // Use a relative path from index.html
    window.location.href = "./temp4.html";
  } else {
    document.getElementById("formModal").style.display = "block";
  }
}

function closeForm() {
  document.getElementById("formModal").style.display = "none";
}

// Form submit for other templates
document.getElementById("userForm")?.addEventListener("submit", async function (e) {
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
  zip.file("style.css", "/* Add your CSS here */");

  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, `${name.replace(" ", "_")}_Portfolio.zip`);

  closeForm();
  alert("✅ Your portfolio ZIP has been downloaded!");
});
