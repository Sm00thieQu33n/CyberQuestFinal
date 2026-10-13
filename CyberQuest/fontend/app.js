
// Finds all elements that can be selected
const selectableItems = document.querySelectorAll(".selectable");
const submitButton = document.getElementById("submitButton");

const selectionMode = document.body.dataset.selection || "multiple";

// Let users select answers. Foreach goes through every selectable element
// AddEventListener "listens" for click
// If mode is single, remove selected class and replace with clicked element
// Otherwise if the class wasn't single, add class if not present or remove if already present
selectableItems.forEach(function(item) {
    item.addEventListener("click", function() {
        if (selectionMode === "single") {
            selectableItems.forEach(function(otherItem) {
                otherItem.classList.remove("selected");
            });

            item.classList.add("selected");
        } else {
            item.classList.toggle("selected");
        }
    });
});

// Score the scenario and open its feedback page
if (submitButton) {
    submitButton.addEventListener("click", function() {
        const scenario = document.body.dataset.scenario;

        // Converts the elements into array, keep only elements that meet a condition, check if element is selected
        const selectedItems = Array.from(selectableItems).filter(
            item => item.classList.contains("selected")
        );

        // Looks for elements with HTML "data-answer = correct". Tells cose an element is a correct warnign sign
        const correctItems = Array.from(selectableItems).filter(
            item => item.dataset.answer === "correct"
        );

        // Counts correct and incorrect answers sellected
        const correctSelected = selectedItems.filter(
            item => item.dataset.answer === "correct"
        ).length;

        const incorrectSelected = selectedItems.filter(
            item => item.dataset.answer !== "correct"
        ).length;

        const totalCorrect = correctItems.length;

        // Math for scoring
        let percentage = 0;

        if (totalCorrect > 0) {
            percentage = Math.round(
                Math.max(0, correctSelected - incorrectSelected)
                / totalCorrect * 100
            );
        }

        // Save the scenario scores
        localStorage.setItem(scenario + "Score", correctSelected);
        localStorage.setItem(scenario + "Percent", percentage);

        // Save completed scenarios
        const completed = JSON.parse(
            localStorage.getItem("completedScenarios") || "[]"
        );

        if (!completed.includes(scenario)) {
            completed.push(scenario);
        }
    
        // Save array as JSON and move to local storage 
        localStorage.setItem(
            "completedScenarios",
            JSON.stringify(completed)
        );

        // Navigate to feedback page
        const feedbackPages = {
            "1": "../../feedback/phishing/phishfeedback1.html",
            "2": "../../feedback/phishing/phishfeedback2.html",
            "badlink1": "../../feedback/links/badlinkfeedback1.html",
            "badlink2": "../../feedback/links/badlinkfeedback2.html",
            "password1": "../../feedback/password/passwordfeedback1.html",
            "password2": "../../feedback/password/passwordfeedback2.html",
            "physical1": "../../feedback/physical/physicalfeedback1.html",
            "physical2": "../../feedback/physical/physicalfeedback2.html"
        };

        // CHecks mapping. If matching page exists the browser goes there
        if (feedbackPages[scenario]) {
            window.location.href = feedbackPages[scenario];
        } else {
            alert("Feedback page not found for this scenario.");
        }
    });
}

// LOGIN CODE. This is separate from scenario scoring

//Checks for "loginForm ID" in Html
const loginForm = document.getElementById("loginForm");

if (loginForm) { //Makes sure form exist since app.js is used for many pages
    loginForm.addEventListener("submit", function(event) {// Run function if form is submitted
        event.preventDefault();// Prevent from reloading page

        // Read user submited credentials 
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        console.log("Login form submitted");
        console.log("Username entered:", username);

        //Check to ensure credentials are correct 
        if (username === "Brennan" && password === "cyberquest") {
            console.log("Login successful. Redirecting to dashboard.");

            window.location.href = "./dashboard.html";
        } else {
            console.log("Login failed.");
            alert("Incorrect username or password. Please try again.");
        }
    });
}

