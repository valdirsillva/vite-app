
const CustomInput = "block w-full rounded-md bg-white border-0 py-4 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#d9d9d9] placeholder:text-gray-900 focus:ring-1 focus:ring-[#04b200] text-lg md:leading-6"

const TextFieldCustom = {
    '& .MuiOutlinedInput-root': {
        '& fieldset, &.Mui-focused fieldset': {
            borderColor: '#d9d9d9', // cor padrão
        },
        '& .MuiInputBase-input': {
            color: '#fff'
        },
        '&:hover fieldset': {
            borderColor: '#04b200', // cor ao passar o mouse
        },
        '&.Mui-focused fieldset': {
            // borderColor: '#04b200', // cor ao focar
        },
        '&.Mui-focused placeholder': {
            borderColor: '#ddd', // cor ao focar
        },
    },
    '.MuiInputLabel-root': {
        '&.Mui-focused': {
            fontSize: '1.25rem',
            color: '#7e7e7e',// cor texto do label quando focado
        }
    },

    '& .MuiInputBase-input': {
        borderRadius: '4px',
        backgroundColor: '#121214'
    },

    '& .MuiFormLabel-root': {
        textTransform: 'uppercase',
        color: '#8d96a7',
    },

    '& .MuiOutlinedInput-notchedOutline':{
        border: 'none',
    },

    '& .MuiInputBase-input-MuiOutlinedInput-input': {
        width: '100%',
        height: '40px',
    }
}

const InputLabelCustom = {
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'gray', // cor da borda normal
        },
        '&:hover fieldset': {
            borderColor: '#04b200', // cor da borda no hover
        },
        '&.Mui-focused fieldset': {
            color: '#6fb618',
            borderColor: '#04b200', // cor da borda no focus
        },
    },
    '& .MuiInputLabel-root': {
        color: 'gray', // cor do label normal
        '&.Mui-focused': {
            color: '#04b200', // cor do label no focus
        },
    },
    '& .MuiFormLabel-root': {
        color: 'gray', // cor do label normal
        '&.Mui-focused': {
            fontWeight: '700',
            color: '#04b200', // cor do label no focus
        },
    },
}

export { CustomInput, TextFieldCustom, InputLabelCustom }