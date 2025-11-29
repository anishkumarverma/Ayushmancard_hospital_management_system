document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('backButton');
    const saveDescriptionButton = document.getElementById('saveDescriptionButton');
    const patientId = new URLSearchParams(window.location.search).get('patientId');

    // Load patient data (this can be replaced with actual data fetching logic)
    const patientData = {
        name: "Rajesh Kumar",
        id: "PAT001",
        contact: "+91 9876543210",
        admissionStatus: "Admitted under Ayushman Bharat",
        reports: [
            { name: "Blood Test", link: "#" },
            { name: "X-Ray", link: "#" }
        ]
    };

    // Populate patient details
    document.getElementById('patientName').textContent = patientData.name;
    document.getElementById('patientId').textContent = patientData.id;
    document.getElementById('patientContact').textContent = patientData.contact;
    document.getElementById('admissionStatus').textContent = patientData.admissionStatus;

    // Populate health reports
    const reportList = document.getElementById('reportList');
    patientData.reports.forEach(report => {
        const li = document.createElement('li');
        li.innerHTML = `${report.name} - <a href="${report.link}">View</a>`;
        reportList.appendChild(li);
    });

    // Back button functionality
    backButton.addEventListener('click', () => {
        window.location.href = 'hospital-dashboard.html'; // Redirect to the patient list
    });

    // Save description functionality
    saveDescriptionButton.addEventListener('click', () => {
        const description = document.getElementById('description').value;
        alert(`Description saved: ${description}`); // Replace with actual save logic
    });
}); 