async function getLocation() {
    const pincode = document.getElementById("pincode").value;
    const statusDiv = document.getElementById("status");

    document.getElementById("city").value = "";
    document.getElementById("district").value = "";
    document.getElementById("country").value = "";
    statusDiv.textContent = "🔍 Fetching location...";

    if (pincode.length !== 6 || isNaN(pincode)) {
        statusDiv.textContent = "❌ Please enter a valid 6-digit pincode.";
        return;
    }

    try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();

        if (data[0].Status === "Success") {
            const info = data[0].PostOffice[0];
            document.getElementById("city").value = info.Division;
            document.getElementById("district").value = info.District;
            document.getElementById("country").value = info.Country;
            statusDiv.textContent = "✅ Location found.";
        } else {
            statusDiv.textContent = "❌ Invalid pincode.";
        }
    } catch (error) {
        console.error(error);
        statusDiv.textContent = "⚠️ Error fetching data.";
    }
}
