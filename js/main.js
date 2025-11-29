document.addEventListener('DOMContentLoaded', () => {
    const hospitalLoginBtn = document.querySelector('.hospital-login');
    const patientLoginBtn = document.querySelector('.patient-login');
    const hospitalForm = document.querySelector('.hospital-form');
    const patientForm = document.querySelector('.patient-form');
    const mainContent = document.querySelector('.hero');
    const featuresSection = document.querySelector('.features');

    // Hide both forms initially
    hospitalForm.classList.add('hidden');
    patientForm.classList.add('hidden');

    // Toggle hospital staff login
    hospitalLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (hospitalForm.classList.contains('hidden')) {
            hospitalForm.classList.remove('hidden');
            patientForm.classList.add('hidden');
            mainContent.style.display = 'none';
            featuresSection.style.display = 'none';
        } else {
            hospitalForm.classList.add('hidden');
            mainContent.style.display = 'block';
            featuresSection.style.display = 'grid';
        }
    });

    // Toggle patient login
    patientLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (patientForm.classList.contains('hidden')) {
            patientForm.classList.remove('hidden');
            hospitalForm.classList.add('hidden');
            mainContent.style.display = 'none';
            featuresSection.style.display = 'none';
        } else {
            patientForm.classList.add('hidden');
            mainContent.style.display = 'block';
            featuresSection.style.display = 'grid';
        }
    });

    // Handle hospital staff login
    document.getElementById('hospitalLoginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const staffId = document.getElementById('staffId').value;
        const password = document.getElementById('staffPassword').value;
        
        // Check credentials
        if (staffId === "Anishkumar Verma" && password === "24june2004@Anish") {
            // Store login status in sessionStorage
            sessionStorage.setItem('staffLoggedIn', 'true');
            sessionStorage.setItem('staffName', staffId);
            
            // Redirect to dashboard
            window.location.href = 'hospital-dashboard.html';
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });

    // Handle patient login
    document.getElementById('patientLoginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const patientId = document.getElementById('patientId').value;
        const password = document.getElementById('patientPassword').value;
        
        // Add your patient authentication logic here
        console.log('Patient login:', { patientId, password });
    });
}); 