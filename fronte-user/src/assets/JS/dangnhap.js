export default {
    methods: {
      checkBirthday() {
        if (this.inputBirthday === '') {
          this.errorMessage('txt-birthday', 'Nhập ngày sinh!');
        } else {
          this.successMessage('txt-birthday');
        }
      },
      checkSex() {
        if (this.inputSex === 'gt') {
          this.errorMessage('txt-sex', 'Chọn giới tính của bạn!');
        } else {
          this.successMessage('txt-sex');
        }
      },
      checkName() {
        if (this.inputName === '') {
          this.errorMessage('txt-name', 'Họ tên không thể để trống!');
        } else {
          this.successMessage('txt-name');
        }
      },
      checkAddress() {
        if (this.inputAddress === '') {
          this.errorMessage('txt-address', 'Nhập địa chỉ của bạn!');
        } else {
          this.successMessage('txt-address');
        }
  },
  
      checkMessage() {
        if (this.inputMessage === '') {
          this.errorMessage('txt-message', 'Nội dung tin nhắn không thể để trống!');
        } else if (this.inputMessage.toLowerCase().trim().length < 4) {
          this.errorMessage('txt-message', 'Nội dung tin nhắn không hợp lệ!');
        } else {
          this.successMessage('txt-message');
        }
      },
  
      validatePhone(phone) {
        return String(phone).toLowerCase().match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
      },
  
      checkPhone() {
        if (this.inputPhone === '') {
          this.errorMessage('txt-phone', 'Số điện thoại không được bỏ trống!');
        } else if (!this.validatePhone(this.inputPhone)) {
          this.errorMessage('txt-phone', 'Số điện thoại không hợp lệ!');
        } else {
          this.successMessage('txt-phone');
        }
      },
  
      validateEmail(email) {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      },
  
      checkEmail() {
        if (this.inputEmail === '') {
          this.errorMessage('txt-email', 'Email không được bỏ trống');
        } else if (!this.validateEmail(this.inputEmail)) {
          this.errorMessage('txt-email', 'Email không hợp lệ');
        } else {
          this.successMessage('txt-email');
        }
      },
     // validation.js (tiếp tục)
  
      checkFacebook() {
        if (this.inputFacebook === '') {
          this.errorMessage('txt-facebook', 'Link Facebook không thể để trống!');
        } else {
          this.successMessage('txt-facebook');
        }
      },
  
      checkWorkShift() {
        if (this.inputWorkShift === 'work') {
          this.errorMessage('txt-work', 'Chọn ca làm bạn mong muốn!');
        } else {
          this.successMessage('txt-work');
        }
      },
  
      checkEXP() {
        if (this.inputEXP === '') {
          this.errorMessage('exp', 'Nhập kinh nghiệm của bạn / vị trí bạn mong muốn');
        } else {
          this.successMessage('exp');
        }
    },

    checkStick() {
      if (this.inputStick === 'stick') {
        this.errorMessage('txt-stick', 'Chọn thời gian bạn có thể gắn bó với chúng tôi!');
      } else {
        this.successMessage('txt-stick');
      }
    },

    checkStudy() {
      if (this.inputStudy === 'study') {
        this.errorMessage('study', 'Chọn trình độ học vấn!');
      } else {
        this.successMessage('study');
      }
    },

    validPassWord(password) {
      return String(password).toLowerCase().match(/^[0-9a-zA-Z]{8,}$/);
    },

    checkPassWord() {
      if (this.inputPassWord === '') {
        this.errorMessage('txt-password', 'Mật khẩu không được bỏ trống!');
      } else if (!this.validPassWord(this.inputPassWord)) {
        this.errorMessage('txt-password', 'Mật khẩu không hợp lệ');
      } else {
        this.successMessage('txt-password');
      }
    },

    isDuplicatedUser(phoneNumber) {
      const userList = JSON.parse(localStorage.getItem('UserDB')) || [];
      const isDuplicate = userList.some(user => user.phone === phoneNumber);

      return isDuplicate;
    },
    errorMessage(pElement, message) {
      const formRow = pElement.parentElement;
      if (formRow.classList.contains('success')) {
        this.$set(formRow.classList, 'success', false);
        this.$set(formRow.classList, 'error', true);
      } else {
        this.$set(formRow.classList, 'error', true);
      }
      formRow.querySelector('.message').textContent = message;
    },
    successMessage(pElement) {
      const formRow = pElement.parentElement;
      if (formRow.classList.contains('error')) {
        this.$set(formRow.classList, 'error', false);
        this.$set(formRow.classList, 'success', true);
      } else {
        this.$set(formRow.classList, 'success', true);
      }
},
    }
}