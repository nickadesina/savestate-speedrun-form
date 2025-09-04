// Configuration
const PASSWORD = 'speedrun2025';
const STORAGE_KEY = 'speedrunFormData';
const SESSION_KEY = 'speedrunAuthenticated';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    setupEventListeners();
    initializeWordCounters();
    loadSavedData();
});

// Password Protection
function checkAuthentication() {
    const authenticated = sessionStorage.getItem(SESSION_KEY);
    if (authenticated === 'true') {
        showMainContent();
    } else {
        document.getElementById('passwordModal').style.display = 'flex';
    }
}

function checkPassword() {
    const input = document.getElementById('passwordInput').value;
    const errorDiv = document.getElementById('passwordError');
    
    if (input === PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        showMainContent();
    } else {
        errorDiv.textContent = 'Incorrect password. Please try again.';
        errorDiv.style.display = 'block';
        document.getElementById('passwordInput').value = '';
    }
}

function showMainContent() {
    document.getElementById('passwordModal').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
}

function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    location.reload();
}

// Event Listeners Setup
function setupEventListeners() {
    // Password input enter key
    document.getElementById('passwordInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });

    // Auto-save on all form inputs
    const form = document.getElementById('applicationForm');
    if (form) {
        // Text inputs, selects, and textareas
        form.querySelectorAll('input, select, textarea').forEach(element => {
            element.addEventListener('change', autoSave);
            if (element.type === 'text' || element.type === 'email' || element.type === 'tel' || 
                element.type === 'url' || element.tagName === 'TEXTAREA') {
                element.addEventListener('input', debounce(autoSave, 500));
            }
        });

        // Radio buttons
        form.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', autoSave);
        });

        // Form submission
        form.addEventListener('submit', handleSubmit);
    }
}

// Auto-save Function
function autoSave() {
    const formData = collectFormData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    showSaveIndicator();
}

function saveForm() {
    autoSave();
}

function showSaveIndicator() {
    const indicator = document.getElementById('saveIndicator');
    indicator.classList.add('show');
    setTimeout(() => {
        indicator.classList.remove('show');
    }, 2000);
}

// Collect Form Data
function collectFormData() {
    const form = document.getElementById('applicationForm');
    const data = {
        timestamp: new Date().toISOString(),
        fields: {},
        cofounders: []
    };

    // Collect all regular form fields
    form.querySelectorAll('input, select, textarea').forEach(element => {
        if (element.name && !element.name.startsWith('cofounder')) {
            if (element.type === 'radio') {
                if (element.checked) {
                    data.fields[element.name] = element.value;
                }
            } else if (element.type === 'checkbox') {
                data.fields[element.name] = element.checked;
            } else if (element.type !== 'file') {
                data.fields[element.name] = element.value;
            }
        }
    });

    // Collect cofounder data
    const cofounderCards = document.querySelectorAll('.cofounder-card');
    cofounderCards.forEach((card, index) => {
        const cofounderData = {};
        card.querySelectorAll('input').forEach(input => {
            const fieldName = input.name.replace(`cofounder${index}_`, '');
            cofounderData[fieldName] = input.value;
        });
        data.cofounders.push(cofounderData);
    });

    return data;
}

// Load Saved Data
function loadSavedData() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            
            // Load regular fields
            Object.keys(data.fields).forEach(fieldName => {
                const element = document.querySelector(`[name="${fieldName}"]`);
                if (element) {
                    if (element.type === 'radio') {
                        const radio = document.querySelector(`[name="${fieldName}"][value="${data.fields[fieldName]}"]`);
                        if (radio) radio.checked = true;
                    } else if (element.type === 'checkbox') {
                        element.checked = data.fields[fieldName];
                    } else {
                        element.value = data.fields[fieldName];
                    }
                }
            });

            // Load cofounders
            if (data.cofounders && data.cofounders.length > 0) {
                data.cofounders.forEach((cofounderData, index) => {
                    addCofounder(cofounderData);
                });
            }

            // Update word counters
            updateAllWordCounters();
        } catch (e) {
            console.error('Error loading saved data:', e);
        }
    }
}

// Co-founder Management
let cofounderCount = 0;

function addCofounder(savedData = null) {
    const container = document.getElementById('cofoundersContainer');
    const cofounderNumber = ++cofounderCount;
    
    const cofounderHTML = `
        <div class="founder-card cofounder-card" data-cofounder="${cofounderNumber}">
            <h3>Co-Founder ${cofounderNumber}</h3>
            <button type="button" class="remove-cofounder-btn" onclick="removeCofounder(${cofounderNumber})">Remove</button>
            <div class="founder-grid">
                <div class="form-group">
                    <label for="cofounder${cofounderNumber}_firstName">First Name *</label>
                    <input type="text" id="cofounder${cofounderNumber}_firstName" name="cofounder${cofounderNumber}_firstName" required>
                </div>
                <div class="form-group">
                    <label for="cofounder${cofounderNumber}_lastName">Last Name *</label>
                    <input type="text" id="cofounder${cofounderNumber}_lastName" name="cofounder${cofounderNumber}_lastName" required>
                </div>
                <div class="form-group">
                    <label for="cofounder${cofounderNumber}_email">Email *</label>
                    <input type="email" id="cofounder${cofounderNumber}_email" name="cofounder${cofounderNumber}_email" required>
                </div>
                <div class="form-group">
                    <label for="cofounder${cofounderNumber}_phone">Phone Number</label>
                    <input type="tel" id="cofounder${cofounderNumber}_phone" name="cofounder${cofounderNumber}_phone">
                </div>
                <div class="form-group">
                    <label for="cofounder${cofounderNumber}_linkedIn">LinkedIn URL *</label>
                    <input type="url" id="cofounder${cofounderNumber}_linkedIn" name="cofounder${cofounderNumber}_linkedIn" required>
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', cofounderHTML);
    
    // Add event listeners to new fields
    const newCard = container.lastElementChild;
    newCard.querySelectorAll('input').forEach(element => {
        element.addEventListener('change', autoSave);
        if (element.type === 'text' || element.type === 'email' || element.type === 'tel' || element.type === 'url') {
            element.addEventListener('input', debounce(autoSave, 500));
        }
    });
    
    // Load saved data if provided
    if (savedData) {
        Object.keys(savedData).forEach(key => {
            const input = newCard.querySelector(`[name="cofounder${cofounderNumber}_${key}"]`);
            if (input) {
                input.value = savedData[key];
            }
        });
    }
    
    autoSave();
}

function removeCofounder(number) {
    const card = document.querySelector(`[data-cofounder="${number}"]`);
    if (card && confirm('Are you sure you want to remove this co-founder?')) {
        card.remove();
        renumberCofounders();
        autoSave();
    }
}

function renumberCofounders() {
    const cards = document.querySelectorAll('.cofounder-card');
    cofounderCount = 0;
    
    cards.forEach((card, index) => {
        const newNumber = ++cofounderCount;
        card.setAttribute('data-cofounder', newNumber);
        card.querySelector('h3').textContent = `Co-Founder ${newNumber}`;
        
        // Update remove button
        const removeBtn = card.querySelector('.remove-cofounder-btn');
        removeBtn.setAttribute('onclick', `removeCofounder(${newNumber})`);
        
        // Update all input names and IDs
        card.querySelectorAll('input').forEach(input => {
            const oldName = input.name;
            const fieldName = oldName.substring(oldName.indexOf('_') + 1);
            input.name = `cofounder${newNumber}_${fieldName}`;
            input.id = `cofounder${newNumber}_${fieldName}`;
            
            // Update label
            const label = card.querySelector(`label[for="${oldName.replace('name', 'id')}"]`);
            if (label) {
                label.setAttribute('for', input.id);
            }
        });
    });
}

// Word Counter
function initializeWordCounters() {
    document.querySelectorAll('.word-counter').forEach(counter => {
        const fieldId = counter.dataset.field;
        const limit = parseInt(counter.dataset.limit);
        const field = document.getElementById(fieldId);
        
        if (field) {
            field.addEventListener('input', () => updateWordCounter(fieldId, limit));
            updateWordCounter(fieldId, limit);
        }
    });
}

function updateWordCounter(fieldId, limit) {
    const field = document.getElementById(fieldId);
    const counter = document.querySelector(`.word-counter[data-field="${fieldId}"]`);
    
    if (field && counter) {
        const text = field.value.trim();
        const words = text ? text.split(/\s+/).length : 0;
        
        counter.textContent = `${words}/${limit} words`;
        
        // Update styling based on word count
        counter.classList.remove('warning', 'error');
        if (words > limit) {
            counter.classList.add('error');
        } else if (words > limit * 0.8) {
            counter.classList.add('warning');
        }
    }
}

function updateAllWordCounters() {
    document.querySelectorAll('.word-counter').forEach(counter => {
        const fieldId = counter.dataset.field;
        const limit = parseInt(counter.dataset.limit);
        updateWordCounter(fieldId, limit);
    });
}

// Form Submission
function handleSubmit(e) {
    e.preventDefault();
    
    // Validate required fields
    const form = e.target;
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Collect and save data
    const formData = collectFormData();
    
    // Here you would normally send the data to a server
    // For now, we'll just save it and show a confirmation
    localStorage.setItem(STORAGE_KEY + '_submitted', JSON.stringify({
        ...formData,
        submittedAt: new Date().toISOString()
    }));
    
    alert('Application submitted successfully! Your data has been saved.');
    
    // Optionally clear the form
    if (confirm('Would you like to clear the form for a new application?')) {
        form.reset();
        document.getElementById('cofoundersContainer').innerHTML = '';
        cofounderCount = 0;
        localStorage.removeItem(STORAGE_KEY);
        updateAllWordCounters();
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}