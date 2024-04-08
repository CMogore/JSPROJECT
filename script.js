// This event listener ensures that the code inside it runs only after the HTML document has been fully loaded and parsed.
document.addEventListener('DOMContentLoaded', function() {
    // Get references to various form elements by their IDs
    const amountInput = document.getElementById('amount');
    const rateInput = document.getElementById('rate');
    const taxableInput = document.getElementById('taxable');
    const interestInput = document.getElementById('interest');
    const taxInput = document.getElementById('tax');
    const totalInput = document.getElementById('total');
    const form = document.getElementById('fundForm');
    const fund = document.getElementById('fund');

    // Function to calculate interest, tax, and total
    function calculate() {
        const amount = parseFloat(amountInput.value);
        const rate = parseFloat(rateInput.value);
        const taxableRate = parseFloat(taxableInput.value);

        const interest = (amount * rate) / 100;
        const tax = (interest * taxableRate) / 100;
        const total = amount + interest - tax;

        // Create a custom event with the calculated values
        const event = new CustomEvent('formCalculated', {
            detail: {
                interest: interest,
                tax: tax,
                total: total
            }
        });

        // Dispatch the custom event
        document.dispatchEvent(event);
    }

    // Event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        calculate(); // Calculate values

        // Store form data in local storage
        saveFormData();

        form.reset(); // Reset form after submission
    });

    //To save form data to local storage
    function saveFormData() {
        const formData = {
            amount: amountInput.value,
            rate: rateInput.value,
            taxableRate: taxableInput.value,
            fund: fund.value,
            interest: interestInput.value,
            tax: taxInput.value,
            total: totalInput.value

        };
        localStorage.setItem('fundData', JSON.stringify(formData));
    } 

    // Function to retrieve form data from local storage
    function getFormData() {
        return JSON.parse(localStorage.getItem('fundData')) || {};
    }

    // Event listener for the 'formCalculated' event
    document.addEventListener('formCalculated', function(event) {
        const interestInput = document.getElementById('interest');
        const taxInput = document.getElementById('tax');
        const totalInput = document.getElementById('total');

        // Update form fields with calculated values
        interestInput.value = event.detail.interest;
        taxInput.value = event.detail.tax;
        totalInput.value = event.detail.total;

        // Store the calculated values in dataset for later use
        interestInput.dataset.submittedValue = event.detail.interest;
        taxInput.dataset.submittedValue = event.detail.tax;
        totalInput.dataset.submittedValue = event.detail.total;
    });

    // Function to populate form fields with retrieved data
    function populateForm(){
        const formData = getFormData();
        amountInput.value = formData.amount || '';
        rateInput.value = formData.rate || '';
        taxableInput.value = formData.taxableRate || '';
        fund.value = formData.fund || '';
        interestInput.value = formData.interest || '';
        taxInput.value = formData.tax || '';
        totalInput.value = formData.total || '';
    }

    // Event listener for the 'editButton' click
    document.getElementById('editButton').addEventListener('click', function() {
        // Populate form inputs with submitted values from dataset
        populateForm();

    });
    
    // Event listeners to recalculate values when inputs change
    amountInput.addEventListener('input', calculate);
    rateInput.addEventListener('input', calculate);
    taxableInput.addEventListener('input', calculate);
});



