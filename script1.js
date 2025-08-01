
               document.addEventListener('DOMContentLoaded', function () {
  const resumeForm = document.getElementById('resumeForm');
  const experienceContainer = document.getElementById('experienceContainer');
  const educationContainer = document.getElementById('educationContainer');
  const addExperienceBtn = document.getElementById('addExperience');
  const addEducationBtn = document.getElementById('addEducation');

  addExperienceBtn.addEventListener('click', function () {
    const newExp = document.createElement('div');
    newExp.className = 'item-group';
    newExp.innerHTML = `
      <div class="form-group">
        <label>Company</label>
        <input type="text" name="company" placeholder="Company Name" />
      </div>
      <div class="form-group">
        <label>Position</label>
        <input type="text" name="position" placeholder="Job Title" />
      </div>
      <div class="form-group">
        <label>Dates</label>
        <input type="text" name="jobDate" placeholder="Year - Year" />
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea name="jobDescription" placeholder="Responsibilities..."></textarea>
      </div>
      <button type="button" class="remove-btn remove-experience">Remove</button>
    `;
    experienceContainer.appendChild(newExp);
  });

  addEducationBtn.addEventListener('click', function () {
    const newEdu = document.createElement('div');
    newEdu.className = 'item-group';
    newEdu.innerHTML = `
      <div class="form-group">
        <label>Degree</label>
        <input type="text" name="degree" placeholder="Degree Name" />
      </div>
      <div class="form-group">
        <label>Institution</label>
        <input type="text" name="institution" placeholder="Institution Name" />
      </div>
      <div class="form-group">
        <label>Dates</label>
        <input type="text" name="educationDate" placeholder="Year - Year" />
      </div>
      <div class="form-group">
        <label>Details</label>
        <input type="text" name="educationDetails" placeholder="GPA, Honors..." />
      </div>
      <button type="button" class="remove-btn remove-education">Remove</button>
    `;
    educationContainer.appendChild(newEdu);
  });

  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-experience') || e.target.classList.contains('remove-education')) {
      e.target.closest('.item-group').remove();
    }
  });

  resumeForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const selectedLanguages = Array.from(document.getElementById('languages').selectedOptions).map(opt => opt.value);
    const selectedGender = document.querySelector('input[name="gender"]:checked')?.value || "";

    const data = {
      personal: {
        fullName: document.getElementById('fullName').value,
        jobTitle: document.getElementById('jobTitle').value,
        gender: selectedGender,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        website: document.getElementById('website').value,
        summary: document.getElementById('summary').value
      },
      education: [],
      experiences: [],
      skills: document.getElementById('skills').value,
      languages: selectedLanguages
    };

    document.querySelectorAll('#educationContainer .item-group').forEach(group => {
      data.education.push({
        degree: group.querySelector('[name="degree"]').value,
        institution: group.querySelector('[name="institution"]').value,
        date: group.querySelector('[name="educationDate"]').value,
        details: group.querySelector('[name="educationDetails"]').value
      });
    });

    document.querySelectorAll('#experienceContainer .item-group').forEach(group => {
      data.experiences.push({
        company: group.querySelector('[name="company"]').value,
        position: group.querySelector('[name="position"]').value,
        date: group.querySelector('[name="jobDate"]').value,
        description: group.querySelector('[name="jobDescription"]').value
      });
    });

    localStorage.setItem('resumeData', JSON.stringify(data));
    window.open('output.html', '_blank');
  });
});