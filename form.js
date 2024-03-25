/* document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    fetch('/send-email', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
});
 */

const url ='';
const myForm = document.getElementById('contactForm');
const myName = document.getElementById('name');
const myEmail = document.getElementById('email');
const myMessage = document.getElementById('message');

myForm.addEventListener('submit', submitter());

function submitter(e) {
    console.log('submitted');
    e.preventDefault();
    let message = '';

    if (myName.value.length < 5) {
        message += '<br>Name needs to be 5+ characters';
    }
    if (myEmail.value.length < 5) {
        message += '<br>Email needs to be 5+ characters';
    }
}