// Add Worker to Firestore
async function addWorker() {
    const name = document.getElementById("workerName").value;
    const role = document.getElementById("workerRole").value;

    if (!name || !role) {
        alert("Fill all fields");
        return;
    }

    await addDoc(collection(db, "workers"), {
        name: name,
        role: role,
        created: new Date()
    });

    alert("Worker Saved to Cloud ✅");
    loadWorkers();
}

// Load Workers from Firestore
async function loadWorkers() {
    const workerList = document.getElementById("workerList");
    workerList.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "workers"));
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        workerList.innerHTML += `
            <div class="card">
                <h3>${data.name}</h3>
                <p>${data.role}</p>
            </div>
        `;
    });
}

window.addWorker = addWorker;
window.onload = loadWorkers;