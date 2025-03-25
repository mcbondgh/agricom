import Swal from 'sweetalert2/dist/sweetalert2.all'

export const ErrorAlert = (title, message,) => {
    Swal.fire({
        title: title,
        text: message,
        icon: 'error',
        confirmButtonText: 'Okay',
        confirmButtonColor: "#009933",
    })
}

export const SuccessAlert = (message,) => {
    Swal.fire({
        icon: 'success',
        position: "top-end",
        text: message,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
    });
}

export const AlertWithResponse = (title,message,successFunction) => {
    Swal.fire({
        icon: "question",
        title: title,
        text: message,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        confirmButtonColor: "#00802b",
        cancelButtonText: 'Cancel',
        cancelButtonColor: '#b30000',
    }).then(result =>{
        if (result.isConfirmed) {
            // 
            successFunction();
        }
    })
}