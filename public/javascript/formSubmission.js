    var form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("my-form-status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        status.classList.add('success');
        status.innerHTML = "Thank you for your submission. I look forward to reading your message";
        form.reset()
        // We want to have different css formatting for a success or failure of our form
        
        
        
      }).catch(error => {
        status.classList.add('error');
        status.innerHTML = "Oops! There was an issue submitting your form"
        // We want to have different css formatting for a success or failure of our form
        
        
        
      });
    }
    form.addEventListener("submit", handleSubmit)