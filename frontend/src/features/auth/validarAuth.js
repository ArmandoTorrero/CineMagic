export function validarForm(array_inputs, array_spans, array_regex, buttonSubmit) {
    // Por defecto, el botón está deshabilitado
    buttonSubmit.disabled = true;
    buttonSubmit.classList.add("disabled");    

    // Función para comprobar el estado de todos los inputs
    function checkFormValidity() {
        const allValid = array_inputs.every((input, i) => array_regex[i].test(input.value));
        buttonSubmit.disabled = !allValid;
        allValid ? buttonSubmit.classList.remove("disabled") : buttonSubmit.classList.add("disabled")
    }

    array_inputs.forEach((input, index) => {
        input.addEventListener("input", () => {
            if (array_regex[index].test(input.value)) {
                array_spans[index].classList.remove("visible");
                array_spans[index].classList.add("noVisible");
            } else {
                array_spans[index].classList.remove("noVisible");
                array_spans[index].classList.add("visible");
            }
            checkFormValidity();
        });
    });
}