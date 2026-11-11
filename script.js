
document.addEventListener("DOMContentLoaded", function () {

    // -------------------------------
    // HOSTEL DATA
    // -------------------------------

    const towerNames = {
        Boys: ["A1", "A2", "A3", "A4", "A5", "A6"],
        Girls: ["B1", "B2", "B3", "B4", "B5", "B6"]
    };

    // Demo floor counts. Update these when your actual
    // tower layouts are finalized.
    const floorCounts = {
        A1: 11, A2: 10, A3: 1, A4: 1, A5: 1, A6: 1,
        B1: 11, B2: 10, B3: 1, B4: 1, B5: 1, B6: 1
    };

    // Sample occupancy data for demonstration
    const sampleRooms = [
        { capacity: 2, occupied: 1, washroom: "Common" },
        { capacity: 2, occupied: 2, washroom: "Attached" },
        { capacity: 2, occupied: 0, washroom: "Attached" }
    ];

    let selectedHostel = "Boys";
    let selectedTower = "A1";
    let selectedFloor = 1;

    // -------------------------------
    // HTML ELEMENTS
    // -------------------------------

    const towerChoices = document.getElementById("towerChoices");
    const floorChoices = document.getElementById("floorChoices");
    const roomGrid = document.getElementById("roomGrid");
    const roomMessage = document.getElementById("roomMessage");
    const roomCount = document.getElementById("roomCount");

    // Stop if this page does not contain the room section
    if (!towerChoices || !floorChoices || !roomGrid) {
        return;
    }

    // -------------------------------
    // HOSTEL SELECTION
    // -------------------------------

    document.querySelectorAll("[data-hostel]").forEach(button => {
        button.addEventListener("click", function () {

            selectedHostel = this.dataset.hostel;

            document.querySelectorAll("[data-hostel]").forEach(btn => {
                btn.classList.remove("active");
            });

            this.classList.add("active");

            selectedTower = towerNames[selectedHostel][0];
            selectedFloor = 1;

            showTowers();
        });
    });

    // -------------------------------
    // SHOW TOWERS
    // -------------------------------

    function showTowers() {

        towerChoices.innerHTML = "";

        towerNames[selectedHostel].forEach(tower => {

            const button = document.createElement("button");
            button.className = "choice-btn";
            button.textContent = "Tower " + tower;

            if (tower === selectedTower) {
                button.classList.add("active");
            }

            button.addEventListener("click", function () {
                selectedTower = tower;
                selectedFloor = 1;
                showTowers();
            });

            towerChoices.appendChild(button);
        });

        showFloors();
    }

    // -------------------------------
    // SHOW FLOORS
    // -------------------------------

    function showFloors() {

        floorChoices.innerHTML = "";

        const totalFloors = floorCounts[selectedTower] || 1;

        for (let floor = 1; floor <= totalFloors; floor++) {

            const button = document.createElement("button");
            button.className = "choice-btn";
            button.textContent = "Floor " + floor;

            if (floor === selectedFloor) {
                button.classList.add("active");
            }

            button.addEventListener("click", function () {
                selectedFloor = floor;
                showFloors();
            });

            floorChoices.appendChild(button);
        }

        showRooms();
    }

    // -------------------------------
    // SHOW ROOM CARDS
    // -------------------------------

    function showRooms() {

        roomGrid.innerHTML = "";

        sampleRooms.forEach((room, index) => {

            const percentage =
                Math.round((room.occupied / room.capacity) * 100);

            const isFull = room.occupied >= room.capacity;

            const card = document.createElement("div");
            card.className = "room-card";

            card.innerHTML = `
                <div class="room-top">
                    <h3>Room ${selectedFloor}${index + 1}</h3>
                    <span class="room-status ${isFull ? "full" : "available"}">
                        ${isFull ? "FULL" : "AVAILABLE"}
                    </span>
                </div>

                <p><strong>Tower:</strong> ${selectedTower}</p>
                <p><strong>Floor:</strong> ${selectedFloor}</p>
                <p><strong>Washroom:</strong> ${room.washroom}</p>

                <div class="occupancy-info">
                    <span>Beds Occupied</span>
                    <strong>${room.occupied}/${room.capacity}</strong>
                </div>

                <div class="occupancy-track">
                    <div class="occupancy-fill ${isFull ? "full" : ""}"
                         style="width: ${percentage}%">
                    </div>
                </div>

                <p class="occupancy-percent">
                    ${percentage}% Occupied
                </p>
            `;

            roomGrid.appendChild(card);
        });

        if (roomCount) {
            roomCount.textContent = sampleRooms.length + " Rooms";
        }

        if (roomMessage) {
            roomMessage.textContent =
                `${selectedHostel} Hostel | Tower ${selectedTower} | Floor ${selectedFloor}`;
        }
    }

    // -------------------------------
    // INITIALIZE PAGE
    // -------------------------------

    const firstHostelButton =
        document.querySelector('[data-hostel="Boys"]');

    if (firstHostelButton) {
        firstHostelButton.classList.add("active");
    }

    showTowers();

});
