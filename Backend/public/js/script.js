document.addEventListener('DOMContentLoaded', function() {
  const fileInput = document.querySelector('input[type="file"]');
  const submitButton = document.querySelector('button[type="submit"]');
  const form = document.querySelector('form');

  // Disable the submit button initially
  submitButton.disabled = true;

  // Enable the submit button when a file is selected
  fileInput.addEventListener('change', function() {
      if (this.files.length > 0) {
          submitButton.disabled = false;
      } else {
          submitButton.disabled = true;
      }
  });

  // Show a loading spinner while the prediction is being made
  form.addEventListener('submit', function() {
      const loadingSpinner = document.createElement('div');
      loadingSpinner.classList.add('loading-spinner');
      form.appendChild(loadingSpinner);
  });
});