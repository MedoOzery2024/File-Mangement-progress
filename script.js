const storedFiles = [];
const copiedFiles = [];

function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    document.getElementById('digitalClock').innerHTML =
        `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm} <br> ${now.toDateString()} ${now.toLocaleTimeString()}`;
}

function storeFiles() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    const now = new Date();

    for (const file of files) {
        storedFiles.push({ file, date: now });
        displayFiles('storedFilesList', storedFiles);
    }

    fileInput.value = '';
}

function copyFiles() {
    copiedFiles.push(...storedFiles);
    displayFiles('copiedFilesList', copiedFiles);
}

function displayFiles(elementId, fileList) {
    const listElement = document.getElementById(elementId);
    listElement.innerHTML = '';

    fileList.forEach((entry, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${entry.file.name} - ${entry.date.toLocaleString()}
            <button onclick="removeFile(${index}, '${elementId}')">Delete</button>
            <a href="#" onclick="downloadFile(${index}, '${elementId}')">Download</a>
        `;
        listElement.appendChild(li);
    });
}

function removeFile(index, elementId) {
    if (elementId === 'storedFilesList') {
        storedFiles.splice(index, 1);
        displayFiles('storedFilesList', storedFiles);
    } else {
        copiedFiles.splice(index, 1);
        displayFiles('copiedFilesList', copiedFiles);
    }
}

function downloadFile(index, elementId) {
    const fileList = elementId === 'storedFilesList' ? storedFiles : copiedFiles;
    const file = fileList[index].file;

    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

setInterval(updateClock, 1000);
