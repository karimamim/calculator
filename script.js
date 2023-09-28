const statutoryCalculatorEl = document.querySelector(
	".calculator.statutory-interest"
);

if (statutoryCalculatorEl) {
	const sumGroup = document.querySelector(".form-group.sum-group");
	const resultEl = document.querySelector(".calculator .result");

	const { dueDate: dueDateEl, paymentDate: paymentDateEl } =
		statutoryCalculatorEl;

	// Set current date to date picker
	const today = new Date().toISOString().slice(0, 10);
	dueDateEl.value = today;
	paymentDateEl.value = today;
	paymentDateEl.setAttribute("min", today);

	dueDateEl.addEventListener("change", function (e) {
		paymentDateEl.setAttribute("min", e.target.value);
		paymentDateEl.value = e.target.value;
	});

	statutoryCalculatorEl.addEventListener("submit", function (e) {
		e.preventDefault();

		let sum = e.target.sum.value;
		let dueDate = e.target.dueDate.value;
		let paymentDate = e.target.paymentDate.value;

		// Check if the user provided a sum amount or not
		sumGroup.classList.remove("is-invalid");
		if (!sum) {
			sumGroup.classList.add("is-invalid");
		}

		let totalMilliseconds = new Date(paymentDate) - new Date(dueDate);
		let totalDays = totalMilliseconds / 1000 / 60 / 60 / 24;

		// Calculation formula
		let sevenPercent = ((7 / 100) * sum).toFixed(2);
		let result = (sevenPercent / 365) * totalDays;

		resultEl.innerText = result.toFixed(2);
	});
}
