document.addEventListener('DOMContentLoaded', function() {
    const amountInput = document.getElementById('amount');
    const rateInput = document.getElementById('rate');
    const taxableInput = document.getElementById('taxable');
    const form = document.getElementById('fundForm');
    const fund = document.getElementById('fund');

    function calculate() {
        const amount = parseFloat(amountInput.value);
        const rate = parseFloat(rateInput.value);
        const taxableRate = parseFloat(taxableInput.value);

        const interest = (amount * rate) / 100;
        const tax = (amount * taxableRate) / 100;
        const total = amount + interest - tax;

        const event = new CustomEvent('formCalculated', {
            detail: {
                interest: interest,
                tax: tax,
                total: total
            }
        });

        document.dispatchEvent(event);
    }


    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        calculate(); // Calculate values
        console.log('Fund:', fund.value)
        console.log('Amount:', amountInput.value);
        console.log('Rate:', rateInput.value);
        console.log('Taxable Rate:', taxableInput.value);
        console.log('interest:', interest.value);
        console.log('tax:', tax.value);
        console.log('total:', total.value);

        // Store submitted values in data attributes
        amountInput.dataset.submittedValue = amountInput.value;
        rateInput.dataset.submittedValue = rateInput.value;
        taxableInput.dataset.submittedValue = taxableInput.value;
        fund.dataset.submittedValue=fund.value

        form.reset(); // Reset form after submission
    });

    document.addEventListener('formCalculated', function(event) {
        const interestInput = document.getElementById('interest');
        const taxInput = document.getElementById('tax');
        const totalInput = document.getElementById('total');

        interestInput.value = event.detail.interest;
        taxInput.value = event.detail.tax;
        totalInput.value = event.detail.total;

        // Store the submitted values in dataset for later use
        interestInput.dataset.submittedValue = event.detail.interest;
        taxInput.dataset.submittedValue = event.detail.tax;
        totalInput.dataset.submittedValue = event.detail.total;
    });

    document.getElementById('editButton').addEventListener('click', function() {
        // Populate each input with its corresponding submitted value
        amountInput.value = amountInput.dataset.submittedValue || '';
        rateInput.value = rateInput.dataset.submittedValue || '';
        taxableInput.value = taxableInput.dataset.submittedValue || '';
        fund.value = fund.dataset.submittedValue || '';
        document.getElementById('interest').value = document.getElementById('interest').dataset.submittedValue || '';
        document.getElementById('tax').value = document.getElementById('tax').dataset.submittedValue || '';
        document.getElementById('total').value = document.getElementById('total').dataset.submittedValue || '';

    });
    
    
    amountInput.addEventListener('input', calculate);
    rateInput.addEventListener('input', calculate);
    taxableInput.addEventListener('input', calculate);
});
