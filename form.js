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

myForm.addEventListener('submit', submitter());

function submitter(e) {
    console.log('submitted');
    e.preventDefault();

}