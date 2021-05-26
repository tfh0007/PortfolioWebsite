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
        status.innerHTML = "Thank, you for your submission. I look forward to reading your response";
        form.reset()
      }).catch(error => {
        status.innerHTML = "Oops! There was an issue submitting your form"
      });
    }
    form.addEventListener("submit", handleSubmit)