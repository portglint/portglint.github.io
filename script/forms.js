// Form validation and submission handling
document.addEventListener('DOMContentLoaded', function() {
    // Get all forms
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Add submit event listener
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateForm(form)) {
                // Show loading state
                const submitButton = form.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.classList.add('loading');
                    submitButton.disabled = true;
                }
                
                // Get form data
                const formData = new FormData(form);
                const formObject = {};
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });
                
                // Send form data
                fetch(form.action, {
                    method: form.method,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify(formObject)
                })
                .then(response => response.json())
                .then(data => {
                    // Handle success
                    if (data.success) {
                        showSuccessMessage(form, data.message || 'Form submitted successfully!');
                        form.reset();
                    } else {
                        // Handle error
                        showErrorMessage(form, data.message || 'An error occurred. Please try again.');
                    }
                })
                .catch(error => {
                    // Handle network error
                    showErrorMessage(form, 'Network error. Please check your connection and try again.');
                    console.error('Form submission error:', error);
                })
                .finally(() => {
                    // Remove loading state
                    if (submitButton) {
                        submitButton.classList.remove('loading');
                        submitButton.disabled = false;
                    }
                });
            }
        });
        
        // Add input event listeners for real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                validateInput(input);
            });
            
            input.addEventListener('blur', function() {
                validateInput(input);
            });
        });
    });
});

// Validate a single input
function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Check required
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Check min length
    if (isValid && input.hasAttribute('minlength')) {
        const minLength = parseInt(input.getAttribute('minlength'));
        if (value.length < minLength) {
            isValid = false;
            errorMessage = `Minimum length is ${minLength} characters`;
        }
    }
    
    // Check max length
    if (isValid && input.hasAttribute('maxlength')) {
        const maxLength = parseInt(input.getAttribute('maxlength'));
        if (value.length > maxLength) {
            isValid = false;
            errorMessage = `Maximum length is ${maxLength} characters`;
        }
    }
    
    // Check pattern
    if (isValid && input.hasAttribute('pattern')) {
        const pattern = new RegExp(input.getAttribute('pattern'));
        if (!pattern.test(value)) {
            isValid = false;
            errorMessage = input.getAttribute('data-pattern-error') || 'Invalid format';
        }
    }
    
    // Check email
    if (isValid && input.type === 'email') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Check number
    if (isValid && input.type === 'number') {
        const num = parseFloat(value);
        if (isNaN(num)) {
            isValid = false;
            errorMessage = 'Please enter a valid number';
        } else {
            // Check min
            if (input.hasAttribute('min')) {
                const min = parseFloat(input.getAttribute('min'));
                if (num < min) {
                    isValid = false;
                    errorMessage = `Minimum value is ${min}`;
                }
            }
            
            // Check max
            if (input.hasAttribute('max')) {
                const max = parseFloat(input.getAttribute('max'));
                if (num > max) {
                    isValid = false;
                    errorMessage = `Maximum value is ${max}`;
                }
            }
        }
    }
    
    // Check password
    if (isValid && input.type === 'password') {
        // Check password strength
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumbers = /\d/.test(value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        
        if (value.length < 8) {
            isValid = false;
            errorMessage = 'Password must be at least 8 characters long';
        } else if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
            isValid = false;
            errorMessage = 'Password must contain uppercase, lowercase, number and special character';
        }
    }
    
    // Check password confirmation
    if (isValid && input.hasAttribute('data-confirm')) {
        const confirmField = document.querySelector(input.getAttribute('data-confirm'));
        if (confirmField && value !== confirmField.value) {
            isValid = false;
            errorMessage = 'Passwords do not match';
        }
    }
    
    // Update input state
    if (isValid) {
        input.classList.remove('error');
        input.classList.add('valid');
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
    } else {
        input.classList.remove('valid');
        input.classList.add('error');
        let errorElement = input.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.classList.add('error-message');
            input.parentNode.insertBefore(errorElement, input.nextSibling);
        }
        errorElement.textContent = errorMessage;
    }
    
    return isValid;
}

// Validate entire form
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Show success message
function showSuccessMessage(form, message) {
    // Remove existing messages
    const existingMessages = form.parentNode.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.classList.add('form-message', 'success-message');
    successMessage.textContent = message;
    
    // Add message to DOM
    form.parentNode.insertBefore(successMessage, form.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Show error message
function showErrorMessage(form, message) {
    // Remove existing messages
    const existingMessages = form.parentNode.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create error message
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('form-message', 'error-message');
    errorMessage.textContent = message;
    
    // Add message to DOM
    form.parentNode.insertBefore(errorMessage, form.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        errorMessage.remove();
    }, 5000);
}

// File upload handling
document.querySelectorAll('input[type="file"]').forEach(input => {
    input.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            // Check file size
            const maxSize = parseInt(this.getAttribute('data-max-size')) || 5 * 1024 * 1024; // 5MB default
            if (file.size > maxSize) {
                showErrorMessage(this.closest('form'), `File size must be less than ${maxSize / 1024 / 1024}MB`);
                this.value = '';
                return;
            }
            
            // Check file type
            const allowedTypes = this.getAttribute('data-allowed-types')?.split(',') || [];
            if (allowedTypes.length > 0) {
                const fileType = file.type;
                if (!allowedTypes.includes(fileType)) {
                    showErrorMessage(this.closest('form'), `File type must be one of: ${allowedTypes.join(', ')}`);
                    this.value = '';
                    return;
                }
            }
            
            // Show file name
            const fileNameElement = this.nextElementSibling;
            if (fileNameElement && fileNameElement.classList.contains('file-name')) {
                fileNameElement.textContent = file.name;
            }
        }
    });
});

// Custom select handling
document.querySelectorAll('.custom-select').forEach(select => {
    const selectElement = select.querySelector('select');
    const selectedOption = select.querySelector('.selected-option');
    const optionsList = select.querySelector('.options-list');
    
    if (selectElement && selectedOption && optionsList) {
        // Update selected option text
        selectElement.addEventListener('change', function() {
            const option = this.options[this.selectedIndex];
            selectedOption.textContent = option.textContent;
        });
        
        // Toggle options list
        selectedOption.addEventListener('click', function() {
            optionsList.classList.toggle('active');
        });
        
        // Close options list when clicking outside
        document.addEventListener('click', function(e) {
            if (!select.contains(e.target)) {
                optionsList.classList.remove('active');
            }
        });
        
        // Handle option selection
        optionsList.querySelectorAll('li').forEach(option => {
            option.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                selectElement.value = value;
                selectElement.dispatchEvent(new Event('change'));
                optionsList.classList.remove('active');
            });
        });
    }
});

// Custom checkbox handling
document.querySelectorAll('.custom-checkbox').forEach(checkbox => {
    const checkboxElement = checkbox.querySelector('input[type="checkbox"]');
    const checkboxLabel = checkbox.querySelector('.checkbox-label');
    
    if (checkboxElement && checkboxLabel) {
        checkboxLabel.addEventListener('click', function() {
            checkboxElement.checked = !checkboxElement.checked;
            checkboxElement.dispatchEvent(new Event('change'));
        });
        
        checkboxElement.addEventListener('change', function() {
            checkbox.classList.toggle('checked', this.checked);
        });
    }
});

// Custom radio handling
document.querySelectorAll('.custom-radio').forEach(radio => {
    const radioElement = radio.querySelector('input[type="radio"]');
    const radioLabel = radio.querySelector('.radio-label');
    
    if (radioElement && radioLabel) {
        radioLabel.addEventListener('click', function() {
            radioElement.checked = true;
            radioElement.dispatchEvent(new Event('change'));
        });
        
        radioElement.addEventListener('change', function() {
            if (this.checked) {
                // Uncheck other radios in the same group
                const name = this.getAttribute('name');
                document.querySelectorAll(`input[name="${name}"]`).forEach(input => {
                    if (input !== this) {
                        input.closest('.custom-radio').classList.remove('checked');
                    }
                });
                radio.classList.add('checked');
            }
        });
    }
}); 