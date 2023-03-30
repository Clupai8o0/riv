const form = document.getElementById("form-path");
const ul = document.getElementById("paths");

async function getPaths() {
	const paths = await window.ctx.getPaths();
	let final = "";

	paths.forEach(({ path, id, status }) => {
		const slashedPath = path.split("\\").join("\\\\")
		const li = `
    <li class="flex justify-between">
      <a href="#" class="link ${
				!status ? " invalid" : ""
			}" onClick="openViewer('${slashedPath}')">${path}</a>
      <button onClick="deletePath('${id}')">
        <img src="assets/delete.svg" alt="delete icon" />
      </button>
    </li>
    `;
		final += li;
	});

	ul.innerHTML =
		final.length === 0
			? `<p class="text">The paths you add will appear here</p>`
			: final;
}

function deletePath(id) {
	window.ctx.deletePath(id);
}

getPaths();

form.addEventListener("submit", (e) => {
	e.preventDefault();
	window.ctx.addPath(e.target.path.value);
});
