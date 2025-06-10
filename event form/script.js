function toggleOtherEventType() {
    var eventType = document.getElementById("eventType").value;
    var otherEventType = document.getElementById("otherEventType");
    if (eventType === "other") {
        otherEventType.style.display = "block";
    } else {
        otherEventType.style.display = "none";
    }
}
