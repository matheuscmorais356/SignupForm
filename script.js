const fields = document.querySelectorAll('[required]')

function ValidateField(field) {
    // Verificar se exitem erros
    function verifyErrors() {
        let foundError = false

        for(let error in field.validity) {

            if(field.validity[error] && !field.validity.valid) {
                foundError = error
            }
        }

        return foundError
    }

    function customMessage(typeError) {
        const messages = {
            text: {
                valueMissing: `${field.id} Name cannot be empaty`
            },
            email: {
                valueMissing: `${field.id} cannot be empaty`,
                typeMismatch: 'Looks like this is not an email '
            },
            password: {
                valueMissing: `${field.id} cannot be empaty`,
                patternMismatch: 'The password must contain at least one character, a lowercase letter and an uppercase letter and a number, special characters are not allowed'
            }
        }

        return messages[field.type][typeError]
    }

    function setCustomMessage(message) {
        const spanError = field.parentNode.parentNode.querySelector('span.message_error')
        
        if(message) {
            spanError.style.display = 'block'
            spanError.innerHTML = message
        } else {
            spanError.style.display = 'block'
            spanError.innerHTML = ''
        }
    }

    return () => {

        const error = verifyErrors()
        console.log(field.validity)
        if(error) {
            const message = customMessage(error)

            field.style.color = 'var(--Red)'
            field.parentNode.querySelector('img').style.display = 'block'
            field.parentNode.classList.add('border_error')

            setCustomMessage(message)

        } else {
            field.style.color = ''
            field.parentNode.querySelector('img').style.display = 'none'
            field.parentNode.classList.remove('border_error')
            setCustomMessage('')
        }
    }
}

function customValidation(event) {
    
    const field = event.target  

    const validation = ValidateField(field)
    
    validation()

}

for(let field of fields) {
    field.addEventListener('invalid', event => {
        // Eliminar o buubble
        event.preventDefault()

        customValidation(event) 
    })
    field.addEventListener('blur', customValidation)
}



document.querySelector('form').addEventListener('submit', event => {
    console.log('enviar formulario')

    event.preventDefault()
})