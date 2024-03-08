const fetchData = async () => {
	try {
		const res = await fetch("https://api.spacexdata.com/v5/launches");
		const data = await res.json();

		displayLaunches(data);
	} catch (error) {
		console.log(error);
	}
};

const displayLaunches = (launches) => {
	const launchesContainer = document.getElementById("launches-container");

	launches.map((launch) => {
		const launchElement = document.createElement("div");
		launchElement.classList.add("launch-item");

		// *** image
		const image = document.createElement("img");
		image.id = "image";
		image.src = launch?.links?.patch?.small;
		image.alt = `${launch?.name} Image`;
		// *** lazy loading
		image.loading = "lazy";
		launchElement.appendChild(image);

		const launchElement2 = document.createElement("div");

		// *** heading
		const heading = document.createElement("h1");
		heading.textContent = `${launch?.flight_number}: ${launch?.name} (${new Date(launch?.date_utc).toLocaleDateString()})`;
		launchElement2.appendChild(heading);

		// *** details
		const details = document.createElement("p");
		details.classList.add("launch-details");
		details.textContent = `Details: ${launch?.details}`;
		launchElement2.appendChild(details);

		launchElement.append(launchElement2);

		launchesContainer.appendChild(launchElement);
	});
};

fetchData();
