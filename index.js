
      // Question: What does this code do?
      document.getElementById("add-btn").addEventListener("click", function(event) {
        event.preventDefault();
        var newCharacter = {
          name: document.getElementById("reserve_name").value.trim(),
          role: document.getElementById("reserve_phone").value.trim(),
          age: document.getElementById("reserve_email").value.trim(),
        };
        // Question: What does this code do??
        axios.post("/api/characters", newCharacter)
          .then(function(data) {
            console.log("add.html", data);
            alert("Adding character...");
          });
      });
