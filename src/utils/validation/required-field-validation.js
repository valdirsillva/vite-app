import { toast } from 'react-toastify'

export class RequiredFieldValidation {
    static validate(formValues, fields) {
        for (let field of fields) {
            if (formValues.hasOwnProperty(field)) {
                const value = formValues[field]
                if (!value || value.trim() === '') { 
                    toast.warning(`O campo ${field} não foi preenchido.`)
                    return false
                }
            }
        }
        return true
    }
}