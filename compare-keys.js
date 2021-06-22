let missingInFirstFile = [];
	let missingInSecondFile = [];
	let fileA, fileB;
	const firstFileSelectEl = document.getElementById('firstFileSelect');
	const secondFileSelectEl = document.getElementById('secondFileSelect');
	
	firstFileSelectEl.onchange = event => {
		fileA = null;
		clearResult();
		let reader = new FileReader();
        reader.onload = event => {
			fileA = JSON.parse(event.target.result);
		};
        reader.readAsText(event.target.files[0]);
	}
	
	secondFileSelectEl.onchange = event => {
		fileB = null;
		clearResult();
		let reader = new FileReader();
        reader.onload = event => {
			fileB = JSON.parse(event.target.result);
		};
        reader.readAsText(event.target.files[0]);
	}
	
	function removeAllOptions(listToRemove) {
		let child = listToRemove.lastElementChild; 
        while (child) {
			listToRemove.removeChild(child);
			child = listToRemove.lastElementChild;
		}
	}
	
	function clearResult() {
		removeAllOptions(document.getElementById("ResultFirstFile"));
		removeAllOptions(document.getElementById("ResultSecondFile"));
	}

	function compareFiles() {
		if (!firstFileSelectEl.value || !secondFileSelectEl.value || !fileA || !fileB) { return }	
		missingInFirstFile = [];
		missingInSecondFile = [];
		comp(fileA, fileB, missingInSecondFile);
		comp(fileB, fileA, missingInFirstFile);	
		AddFilesToResultList(missingInFirstFile, document.getElementById("ResultFirstFile"));
		AddFilesToResultList(missingInSecondFile, document.getElementById("ResultSecondFile"));
	}
	
	function AddFilesToResultList(resultList, ListEl) {
		removeAllOptions(ListEl);
		console.log(ListEl.childElementCount, resultList.length);
		resultList.forEach(r=>{
		  let li = document.createElement("li");
		  li.setAttribute("class", "list-group-item");
		  li.innerText = r;
		  ListEl.appendChild(li);
		});
	}

	function comp(first, second, list) {
	  Object.keys(first).forEach(ak => {
		if (!second || !(ak in second)) {
		  list.push(ak);
		}
		if (typeof first[ak] === "object" ) {
		  comp(first && first[ak], second && second[ak], list)
		}
	  });
	}